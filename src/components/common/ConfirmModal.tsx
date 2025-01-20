import styled from 'styled-components';
import { theme } from 'styles/theme';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9988;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 320px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
`;

const ModalDescription = styled.p`
  font-size: 14px;
  color: ${theme.colors.neutral700};
  margin-bottom: 20px;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ModalButton = styled.button<{ $isConfirm?: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ $isConfirm }) => 
    $isConfirm ? theme.colors.primary : theme.colors.neutral300};
  background-color: ${({ $isConfirm }) => 
    $isConfirm ? theme.colors.primary : 'white'};
  color: ${({ $isConfirm }) => 
    $isConfirm ? 'white' : theme.colors.neutral700};

  &:hover {
    background-color: ${({ $isConfirm }) => 
      $isConfirm ? theme.colors.primary : theme.colors.neutral50};
  }
`;

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export interface ModalConfigType {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
  }) => {
    if (!isOpen) return null;
  
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
          <ModalButtonContainer>
            <ModalButton onClick={onClose}>취소</ModalButton>
            <ModalButton $isConfirm onClick={onConfirm}>확인</ModalButton>
          </ModalButtonContainer>
        </ModalContent>
      </ModalOverlay>
    );
  };
  
export default ConfirmModal;