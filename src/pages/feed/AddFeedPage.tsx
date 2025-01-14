import Button from 'components/common/Button';
import { ImageUploadButton } from 'components/common/ImageUploadButton';
import Toolbar from 'components/common/Toolbar';
import { Camera, PenLine, Tag as TagIcon, X } from 'lucide-react';
import { TextArea } from 'pages/registerCar/RegisterCarPage.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LAYOUT } from 'styles/constants';
import AddImageBackground from 'assets/add_image_background.png';

const AddFeedPageContainer = styled.div`
  display: flex;
  margin-top: ${LAYOUT.APP_BAR_HEIGHT};
  padding: 20px 20px 0 20px;
  flex-direction: column;
`;

const AddImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral800};

  svg {
    margin-left: 0px;
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AddContentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
`;

const AddTagSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
`;

const TagInputContainer = styled.div`
  position: relative;
`;

const TagInput = styled.input`
  width: auto;
  padding: 8px 35px 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: solid ${({ theme }) => theme.colors.primary};
  border-width: 1px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-width: 2px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral400};
  }
`;

const AddTagButton = styled.button`
  position: absolute;
  right: 58%;
  top: 15px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  pointer-events: auto;
  z-index: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 10px;
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral800};

  button {
    background: none;
    border: none;
    padding: 0;
    margin-left: 6px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.neutral500};
    display: flex;
    align-items: center;

    &:hover {
      color: ${({ theme }) => theme.colors.neutral700};
    }
  }
`;

function AddFeedPage() {
  const [content, setContent] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTagInput(newValue);
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleUploadButtonClick = () => {
    // TODO: Implement upload functionality
  };

  return (
    <>
      <Toolbar
        showBackButton
        title="내 차 자랑하기"
        onBackClick={() => {
          navigate('/feed');
        }}
      />
      <AddFeedPageContainer>
        <AddImageSection>
          <TitleWrapper>
            <Camera size={24} />
            차량 사진
          </TitleWrapper>
          <ImageUploadButton
            width={200}
            height={200}
            backgroundImage={AddImageBackground}
            handleUploadImage={() => {}}
          />
        </AddImageSection>

        <AddContentSection>
          <TitleWrapper>
            <PenLine size={24} />
            본문
          </TitleWrapper>
          <TextArea placeholder="내 차를 소개해보세요." value={content} onChange={handleContentChange} required />
        </AddContentSection>

        <AddTagSection>
          <TitleWrapper>
            <TagIcon size={24} />
            태그
          </TitleWrapper>
          <TagInputContainer>
            <TagInput
              maxLength={10}
              type="text"
              placeholder="태그"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
            />
            <AddTagButton onClick={addTag}>+</AddTagButton>
          </TagInputContainer>
          <TagsContainer>
            {tags.map((tag, index) => (
              <TagItem key={index}>
                {tag}
                <button onClick={() => removeTag(index)}>
                  <X size={14} />
                </button>
              </TagItem>
            ))}
          </TagsContainer>
        </AddTagSection>

        <Button fixed onClick={handleUploadButtonClick}>
          등록
        </Button>
      </AddFeedPageContainer>
    </>
  );
}

export default AddFeedPage;
