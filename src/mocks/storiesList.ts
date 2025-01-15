import { UserStories } from 'types/story';

export const stories: UserStories[] = [
  {
    userId: 5,
    nickname: '전우정',
    profile: 'https://picsum.photos/40',
    stories: [
      {
        id: 15,
        content: "it's a feed writing test",
        imageUrl: 'https://autoeverbucket.s3.ap-northeast-2.amazonaws.com/11.png_20250114171656',
        isLiked: false,
        createdAt: '2025-01-14T17:16:56.496005',
        tags: ['tag1', 'tag2', 'tag3'],
      },
      {
        id: 14,
        content: 'test contents222',
        imageUrl: 'https://autoeverbucket.s3.ap-northeast-2.amazonaws.com/cccc.png_20250114112101',
        isLiked: false,
        createdAt: '2025-01-14T11:21:02.085198',
        tags: ['hash123', 'hash234', 'hash345'],
      },
    ],
  },
  {
    userId: 8,
    nickname: '송지웅',
    profile: 'https://picsum.photos/41',
    stories: [
      {
        id: 20,
        content: "user8's fourth feed\n",
        imageUrl: 'https://autoeverbucket.s3.ap-northeast-2.amazonaws.com/cccc.png_20250114172304',
        isLiked: true,
        createdAt: '2025-01-14T17:23:04.326834',
        tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      },
      {
        id: 19,
        content: "user8's thrid feed\n",
        imageUrl: 'https://autoeverbucket.s3.ap-northeast-2.amazonaws.com/cccc.png_20250114172259',
        isLiked: true,
        createdAt: '2025-01-14T17:22:59.38926',
        tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      },
      {
        id: 18,
        content: "user8's second feed\n",
        imageUrl: 'https://autoeverbucket.s3.ap-northeast-2.amazonaws.com/cccc.png_20250114172248',
        isLiked: false,
        createdAt: '2025-01-14T17:22:48.319563',
        tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      },
      {
        id: 16,
        content: "it's a feed writing test",
        imageUrl: 'https://autoeverbucket.s3.ap-northeast-2.amazonaws.com/cccc.png_20250114172203',
        isLiked: true,
        createdAt: '2025-01-14T17:22:03.921024',
        tags: ['tag1', 'tag2'],
      },
    ],
  },
  {
    userId: 9,
    nickname: '김홍빈',
    profile: 'https://picsum.photos/42',
    stories: [
      {
        id: 17,
        content: "user9's first feed\n",
        imageUrl: 'https://autoeverbucket.s3.ap-northeast-2.amazonaws.com/cccc.png_20250114172235',
        isLiked: false,
        createdAt: '2025-01-14T17:22:35.596008',
        tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      },
    ],
  },
];

export default stories;
