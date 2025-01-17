import { UserStories } from 'types/Feed';
import { client } from '../../utils/axiosInstance';

export interface WriteFeedRequest {
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
    const formData = new FormData();
    formData.append('contents', data.contents);
    formData.append('image', data.imageUrl);
    data.hashtagList.forEach((tag) => {
      formData.append('hashtagList', tag);
    });

    await client.post('/feed/write', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Failed to write feed:', error);
  }
};

export const deleteFeed = async (data: DeleteFeedRequest): Promise<boolean> => {
  try {
    await client.put('/feed/delete', data);
    return true;
  } catch (error) {
    console.error('Failed to delete feed:', error);
    return false;
  }
};
