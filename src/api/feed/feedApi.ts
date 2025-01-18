import { UserStories } from 'types/Feed';
import { client } from '../../utils/axiosInstance';

export interface WriteFeedRequest {
  userId: number;
  contents: string;
  imageUrl: string;
  hashtagList: string[];
}

export interface DeleteFeedRequest {
  feedId: number;
}

export const getFeedList = async (): Promise<UserStories[] | undefined> => {
  try {
    const { data } = await client.get<UserStories[]>('/feed/list');
    return data;
  } catch (error) {
    console.error('Failed to fetch feed list:', error);
    return undefined;
  }
};

export const postFeed = async (data: WriteFeedRequest): Promise<void> => {
  try {
    const requestData = {
      userId: data.userId,
      contents: data.contents,
      imageUrl: data.imageUrl,
      hashtagList: data.hashtagList,
    };

    await client.post('/feed/write', requestData);
  } catch (error) {
    console.error('Failed to write feed:', error);
  }
};

export const deleteFeed = async (feedId: number): Promise<void> => {
  try {
    await client.put('/feed/delete', {
      feedId: feedId,
    });
  } catch (error) {
    console.error('Failed to delete feed:', error);
    throw error;
  }
};

export const feedLike = async (feedId: number) => {
  try {
    const formData = new FormData();
    formData.append('feedId', feedId.toString());

    const response = await client.post('/feedLike/click', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('Failed to like feed:', error);
    throw error;
  }
};

export const feedUnlike = async (feedId: number) => {
  try {
    const formData = new FormData();
    formData.append('feedId', feedId.toString());

    const response = await client.delete('/feedLike/unclick', {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('Failed to unlike feed:', error);
    throw error;
  }
};
