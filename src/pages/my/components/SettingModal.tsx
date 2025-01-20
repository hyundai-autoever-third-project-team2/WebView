import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import CloseIcon from '../../../assets/icon_close.svg';
import { updateUserProfileImage, updateUserNickName } from 'api/user/userApi';
import { fetchUploadImage } from 'api/registerCar/registerCarApi';

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

const SettingModal: React.FC<SettingModalProps> = ({ onClose, user, onUpdateSuccess }) => {
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null); // S3에서 받은 새 이미지 URL
  const [isNicknameSaving, setIsNicknameSaving] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageClick = () => {
    if (typeof Android !== 'undefined' && Android?.openGallery) {
      // 안드로이드 환경
      Android.openGallery();
    } else {
      // 웹 환경
      fileInputRef.current?.click();
    }
  };

  // S3에서 받은 이미지 URL 처리
  const handleImageUpload = (imageUrl: string) => {
    setIsImageUploading(false);
    setError(null);
    setNewProfileImage(imageUrl); // 새 이미지 URL 저장
  };

  // 프로필 저장 (이미지 + 닉네임)
  const handleSave = async () => {
    if (!nickname.trim()) return;
    
    setIsNicknameSaving(true);
    setError(null);
  
    try {
      // 새 이미지가 있다면 프로필 이미지 업데이트
      if (newProfileImage) {
        await updateUserProfileImage(newProfileImage);
        setProfileImage(newProfileImage); // 성공 시 프로필 이미지 상태 업데이트
      }
      
      // 닉네임 업데이트
      await updateUserNickName(nickname.trim());
      
      onUpdateSuccess?.();
      onClose();
    } catch (err: any) {
      // 에러 메시지를 더 자세히 표시
      const errorMessage = err.response?.data?.message || err.message || '프로필 변경에 실패했습니다.';
      setError(errorMessage);
      console.error('Profile update error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
    } finally {
      setIsNicknameSaving(false);
    }
};

  useEffect(() => {
    // 안드로이드에서 호출할 콜백 함수
    const receiveImage = (imageUrl: string) => {
      handleImageUpload(imageUrl);
    };

    window.receiveImageFromGallery = receiveImage;

    return () => {
      window.receiveImageFromGallery = undefined;
    };
  }, []);

  const secureImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  };

  //웹용
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsImageUploading(true);
      
      // FormData 생성
      const formData = new FormData();
      formData.append('image', file);

      // API 호출하여 S3에 업로드
      const response = await fetchUploadImage(formData);

      // 업로드 성공시 이미지 URL 처리
      handleImageUpload(response.data);
    } catch (err) {
      console.error('File upload error:', err);
      setError('이미지 업로드에 실패했습니다.');
    } finally {
      setIsImageUploading(false);
      // 같은 파일을 다시 선택할 수 있도록 input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage 
              src={secureImageUrl(newProfileImage || user?.profileImage) || ''} 
              alt="Profile" 
            />
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
          onClick={handleSave}
          disabled={!nickname.trim() || isNicknameSaving}
        >
          {isNicknameSaving ? '저장 중...' : '저장하기'}
        </SaveButton>
      </ModalContainer>
    </>
  );
};

export default SettingModal;