import Toolbar from 'components/common/Toolbar';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

enum MessageType {
    JOIN = 'JOIN',
    TALK = 'TALK',
    LEAVE = 'LEAVE'
  }
  
interface ChatMessage {
    messageType: MessageType;
    chatRoomId: number;
    message: string;
    senderId: string;
  }

interface ChatRoomProps {
  roomId: number; // roomId를 userId 사용해야함
  userName: string;
  userId: number;
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageBubble = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  align-self: ${props => props.isMine ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isMine ? `${theme.colors.primary}` : '#E9ECEF'};
  color: ${props => props.isMine ? '#ffffff' : '#000000'};
`;

const InputContainer = styled.form`
  display: flex;
  padding: 20px;
  gap: 10px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
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
  text-align: center;
  color: #666666;
  margin: 10px 0;
`;

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, userName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // WebSocket 연결
    const ws = new WebSocket('wss://twomuchcar.shop/ws/conn');
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      // 입장 메시지 전송
      const joinMessage: ChatMessage = {
        messageType: MessageType.JOIN,
        chatRoomId: roomId,
        message: '',
        senderId: userName
      };
      ws.send(JSON.stringify(joinMessage));
    };

    ws.onmessage = (event) => {
      const message: ChatMessage = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        const leaveMessage: ChatMessage = {
          messageType: MessageType.LEAVE,
          chatRoomId: roomId,
          message: '',
          senderId: userName
        };
        ws.send(JSON.stringify(leaveMessage));
      }
      ws.close();
    };
  }, [roomId, userName]);

  //채팅 스크롤 관리 useEffect 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !wsConnected) return;

    const chatMessage: ChatMessage = {
      messageType: MessageType.TALK,
      chatRoomId: roomId,
      message: inputMessage.trim(),
      senderId: userName
    };

    wsRef.current?.send(JSON.stringify(chatMessage));
    // Optimistic update
    setMessages(prev => [...prev, chatMessage]);
    setInputMessage('');
  };

  const renderMessage = (message: ChatMessage) => {
    switch (message.messageType) {
      case MessageType.JOIN:
        return (
          <SystemMessage>
            {message.senderId}님이 입장하셨습니다.
          </SystemMessage>
        );
      case MessageType.LEAVE:
        return (
          <SystemMessage>
            {message.senderId}님이 퇴장하셨습니다.
          </SystemMessage>
        );
      case MessageType.TALK:
        return (
          <MessageBubble isMine={message.senderId === userName}>
            {message.message}
          </MessageBubble>
        );
    }
  };

  return (
    <>
    <Toolbar title='상담사와 채팅하기' rightButtons={['close']}/>
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
            <div key={index}>
            {renderMessage(message)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          // disabled={!wsConnected}
          />
        <SendButton type="submit" disabled={!wsConnected || !inputMessage.trim()}>
          전송
        </SendButton>
      </InputContainer>
    </ChatContainer>
    </>
  );
};

export default ChatRoom;