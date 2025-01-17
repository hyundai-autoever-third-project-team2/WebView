import * as S from './AddFeedPage.style';
import Button from 'components/common/Button';
import { ImageUploadButton } from 'components/common/ImageUploadButton';
import Toolbar from 'components/common/Toolbar';
import { Camera, PenLine, Tag as TagIcon, X } from 'lucide-react';
import { TextArea } from 'pages/registerCar/RegisterCarPage.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddImageBackground from 'assets/add_image_background.png';
import { postFeed } from 'api/feed/feedApi';

function AddFeedPage() {
  const [content, setContent] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleUploadImage = (uploadedImageUrl: string) => {
    console.log('Uploaded image URL:', uploadedImageUrl);
    setImageUrl(uploadedImageUrl);
  };

  const handleUploadButtonClick = async () => {
    try {
      // if (!imageUrl) {
      //   console.error('이미지를 업로드해주세요.');
      //   return;
      // }
      if (!content.trim()) {
        console.error('내용을 입력해주세요.');
        return;
      }

      setIsLoading(true);

      const feedData = {
        contents: content,
        imageUrl: imageUrl,
        hashtagList: tags,
      };

      console.log('피드 데이터:', feedData);
      const response = await postFeed(feedData);
      console.log('피드 등록 결과:', response);
      navigate('/feed');
    } catch (error) {
      console.error('피드 등록 중 오류가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
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

      <S.AddFeedPageContainer>
        <S.AddImageSection>
          <S.TitleWrapper>
            <Camera size={24} />
            차량 사진
          </S.TitleWrapper>
          <ImageUploadButton
            index={0}
            width={200}
            height={200}
            backgroundImage={AddImageBackground}
            handleUploadImage={handleUploadImage}
          />
        </S.AddImageSection>

        <S.AddContentSection>
          <S.TitleWrapper>
            <PenLine size={24} />
            본문
          </S.TitleWrapper>
          <TextArea placeholder="내 차를 소개해보세요." value={content} onChange={handleContentChange} required />
        </S.AddContentSection>

        <S.AddTagSection>
          <S.TitleWrapper>
            <TagIcon size={24} />
            태그
          </S.TitleWrapper>
          <S.TagInputContainer>
            <S.TagInput
              maxLength={10}
              type="text"
              placeholder="태그를 추가해주세요"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
            />
            <S.AddTagButton onClick={addTag}>+</S.AddTagButton>
          </S.TagInputContainer>
          <S.TagsContainer>
            {tags.map((tag, index) => (
              <S.TagItem key={index}>
                {tag}
                <button onClick={() => removeTag(index)}>
                  <X size={14} />
                </button>
              </S.TagItem>
            ))}
          </S.TagsContainer>
        </S.AddTagSection>

        <Button onClick={handleUploadButtonClick} disabled={isLoading}>
          {isLoading ? '등록 중...' : '등록'}
        </Button>
      </S.AddFeedPageContainer>
    </>
  );
}

export default AddFeedPage;
