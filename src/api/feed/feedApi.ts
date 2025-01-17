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

interface FeedLikeResponse {
  success: boolean;
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

export const feedLike = async (feedId: number): Promise<void> => {
  try {
    await client.post<FeedLikeResponse>('/feedLike/click', {
      feedId: feedId,
    });
  } catch (error) {
    console.error('Failed to like feed:', error);
    throw error;
  }
};

export const feedUnlike = async (feedId: number): Promise<void> => {
  try {
    await client.delete<FeedLikeResponse>('/feedLike/unclick', {
      data: { feedId: feedId },
    });
  } catch (error) {
    console.error('Failed to unlike feed:', error);
    throw error;
  }
};
