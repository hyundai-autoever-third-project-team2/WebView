import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import CloseIcon from '../../../assets/icon_close.svg';
import { updateUserProfileImage, updateUserNickName } from 'api/user/userApi';

interface User {
  nickname: string;
  profileImage: string;
}

interface SettingModalProps {
  onClose: () => void;
  user: User;
  onUpdateSuccess?: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  padding-bottom: 30px;
  max-height: 60%;
  overflow-y: auto;
  z-index: 10001;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ImageEditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 40px;
  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

// Z

const UploadStatus = styled.div`
  color: ${theme.colors.primary};
  font-size: 14px;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
`;

const SettingModal: React.FC<SettingModalProps> = ({ onClose, user,onUpdateSuccess }) => {
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [isNicknameSaving, setIsNicknameSaving] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageClick = () => {
    // 안드로이드 네이티브 갤러리 호출
    if (typeof Android !== 'undefined' && Android?.openGallery()) {
      Android.openGallery();
    } else {
        log('갤러리 호출 실패..');
    }

  };

 // 이미지 업로드 핸들러
const handleImageUpload = async (imageData: string) => {
    setIsImageUploading(true);
    setError(null);
    
    try {
      // API 호출
      await updateUserProfileImage( imageData );
      setProfileImage(imageData); 
      onUpdateSuccess?.();  
    } catch (err) {
      setError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      console.error('Image upload error:', err);
    } finally {
      setIsImageUploading(false);
    }
  };
  
  // 닉네임 업데이트 핸들러
  const handleNicknameUpdate = async () => {
    if (!nickname.trim()) return;
    
    setIsNicknameSaving(true);
    setError(null);
  
    try {
      await updateUserNickName(nickname.trim());
      onUpdateSuccess?.();  // 성공 콜백 호출
      onClose();
    } catch (err) {
      setError('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
      console.error('Nickname update error:', err);
    } finally {
      setIsNicknameSaving(false);
    }
  };

  useEffect(() => {
    const receiveImage = (imageData: string) => {
      handleImageUpload(imageData);  // 이미지 선택 즉시 업로드
    };

    window.receiveImageFromGallery = receiveImage;

    return () => {
      window.receiveImageFromGallery = undefined;
    };
  }, []);

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>프로필 설정</Title>
          <CloseButton onClick={onClose}>
            <img src={CloseIcon} alt="Close" />
          </CloseButton>
        </ModalHeader>

        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage src={profileImage} alt="Profile" />
            <ImageEditButton 
              onClick={handleImageClick}
              disabled={isImageUploading}
            >
              {isImageUploading ? '...' : '+'}
            </ImageEditButton>
          </ProfileImageContainer>
          {isImageUploading && (
            <UploadStatus>이미지 업로드 중...</UploadStatus>
          )}
        </ProfileSection>

        <InputContainer>
          <Label>닉네임</Label>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            disabled={isNicknameSaving}
          />
        </InputContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SaveButton
          onClick={handleNicknameUpdate}
          disabled={!nickname.trim() || isNicknameSaving}
        >
          {isNicknameSaving ? '저장 중...' : '저장하기'}
        </SaveButton>
      </ModalContainer>
    </>
  );
};

export default SettingModal;