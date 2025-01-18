import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styled from 'styled-components';
import Toolbar from 'components/common/Toolbar';
import { theme } from 'styles/theme';
import { useUser } from 'hooks/useUser';

enum MessageType {
  JOIN = 'JOIN',
  TALK = 'TALK',
  LEAVE = 'LEAVE'
}

interface ChatMessage {
  sender: string;
  content: string;
  roomId: number;
  messageType: MessageType;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f5f5f5;
`;



const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  padding-top: 70px;
  flex-direction: column;
  gap: 1rem;
`;

const MessageWrapper = styled.div<{ $isOwn: boolean }>`
  display: flex;
  justify-content: ${props => props.$isOwn ? 'flex-end' : 'flex-start'};
`;

const MessageContent = styled.div<{ $isOwn: boolean; $isJoin?: boolean }>`
    ${props => !props.$isJoin && `
      max-width: 70%;
  `}
  
  ${props => props.$isJoin && `
    width: 100%;
    text-align: center;
    color: #e2e2e2;
    font-size: 0.875rem;
  `}
`;

const MessageBubble = styled.div<{ $isOwn: boolean }>`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${props => props.$isOwn ? `${theme.colors.primary}` : '#e2e2e2'};
  color: ${props => props.$isOwn ? 'white' : 'inherit'};
`;

const Avatar = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

const SenderName = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const InputContainer = styled.form`
  display: flex;
  padding: 20px;
  gap: 10px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
  position: relative;
  z-index: 2;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  color: white;
  cursor: pointer;
  
  &:disabled {
    background-color: #cccccc;
    cursor: default;
  }
`;

const SystemMessage = styled.div`
  max-width: 100%;
  text-align: center;
  color: #666666;
  
`;

const ChatComponent: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const clientRef = useRef<Client | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: user } = useUser();
  const roomId = user?.userId;
  const userName = user?.nickname;

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      const height = messagesContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!roomId || !userName) return;

    let isActive = true;
    const client = new Client({
      webSocketFactory: () => new SockJS('https://twomuchcar.shop/ws'),
      onConnect: () => {
        if (!isActive) return;
        
        console.log('WebSocket Connected');
        setConnected(true);
        
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          if (!isActive) return;
          
          console.log('Received message:', message.body);
          try {
            const receivedMessage = JSON.parse(message.body);
            // 내가 보낸 메시지는 이미 로컬 상태에 있으므로 건너뛰기
            if (receivedMessage.sender === userName) {
              return;
            }
            setMessages(prev => [...prev, receivedMessage]);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });

        // Send JOIN message
        const joinMessage = {
          sender: userName,
          content: 'JOIN',
          roomId: roomId,
          messageType: 'JOIN'
        };
        
        client.publish({
          destination: '/pub/chat/enter',
          body: JSON.stringify(joinMessage)
        });
      },
      onDisconnect: () => {
        if (!isActive) return;
        console.log('WebSocket Disconnected');
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
      }
    });

    clientRef.current = client;
    client.activate();

    return () => {
      isActive = false;
      if (client.connected) {
        try {
          const leaveMessage = {
            sender: userName,
            content: 'LEAVE',
            roomId: roomId,
            messageType: MessageType.LEAVE
          };
          
          client.publish({
            destination: '/pub/chat/leave',
            body: JSON.stringify(leaveMessage)
          });
        } catch (error) {
          console.error('Error sending leave message:', error);
        }
      }
      client.deactivate();
      clientRef.current = null;
    };
  }, [roomId, userName]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !clientRef.current?.connected || !userName || !roomId) return;

    const chatMessage = {
      sender: userName,
      content: message.trim(),
      roomId: roomId,
      messageType: MessageType.TALK
    };

    try {
      clientRef.current.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(chatMessage)
      });

      // 메시지를 보낸 후 즉시 로컬 상태에 추가
      setMessages(prev => [...prev, chatMessage]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!user) return null;

  return (
    <>
      <Toolbar title='상담사와 채팅하기' rightButtons={['close']} />
      <ChatContainer>
        <MessagesContainer ref={messagesContainerRef}>
          {messages.map((msg, index) => (
            <MessageWrapper key={index} $isOwn={msg.sender === userName}>
              <MessageContent $isOwn={msg.sender === userName} $isJoin={msg.content === 'JOIN'}>
                {msg.content === 'JOIN' ? (
                  <SystemMessage>{msg.sender}님이 입장하셨습니다.</SystemMessage>
                ) : msg.content === 'LEAVE' ? (
                  <SystemMessage>{msg.sender}님이 퇴장하셨습니다.</SystemMessage>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {msg.sender !== userName && (
                      <Avatar color={msg.sender === userName ? theme.colors.primary : '#999'}>
                        {msg.sender[0]}
                      </Avatar>
                    )}
                    <div>
                      {msg.sender !== userName && (
                        <SenderName>{msg.sender}</SenderName>
                      )}
                      <MessageBubble $isOwn={msg.sender === userName}>
                        {msg.content}
                      </MessageBubble>
                    </div>
                  </div>
                )}
              </MessageContent>
            </MessageWrapper>
          ))}
        </MessagesContainer>
        <InputContainer onSubmit={sendMessage}>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={!connected}
          />
          <SendButton type="submit" disabled={!connected || !message.trim()}>
            전송
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </>
  );
};

export default ChatComponent;