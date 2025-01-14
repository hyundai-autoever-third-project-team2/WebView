export interface Story {
  id: number;
  createdAt: string;
  content: string;
  tags: string[];
  imageUrl: string;
  isLiked: boolean;
}

export interface UserStories {
  userId: number;
  nickname: string;
  profile: string;
  stories: Story[];
}
