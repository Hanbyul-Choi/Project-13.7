export interface Suggestion {
  post_id: string;
  created_at: string;
  title: string;
  content: string;
  product: string;
  user_id: string;
  selected: boolean;
  liked_count: number;
  liked_users: string[];
  img_url: string;
  users: User;
}
export interface User {
  user_id: string;
  created_at: string;
  point: number;
  address: string;
  profile_img: string;
  nickname: string;
  email: string;
}

export interface NatureStory {
  post_id: string;
  content: string;
  created_at: string;
  category: string;
  img_url: string;
  title: string;
  video_url: string;
  tag: string;
}

export interface IdeaComments {
  id: string;
  created_at: string;
  post_id: string;
  comment: string;
  user_id: string;
  users: User;
}

export interface IdeaPost {
  title: string;
  content: string;
  product: string | null;
  user_id: string;
  selected: boolean;
  img_url: string | null;
}
export interface IdeaQueryType {
  pageParams: [];
  pages: PageType[];
}

interface PageType {
  result: Suggestion[];
  total_pages: number;
  page: number;
}





export interface CertifyType {
  post_id: number,
  created_at: string,
  challenge_id: string,
  insta_url: string,
  user_id: string,
  img_url: string,
  tags: string,
  mainChallenge: {title: string}
  users: User;
}

export interface CertifyPostType {
  insta_url: string,
  user_id: string,
  img_url: string,
  tags: string,
  challenge_id: string,
}
