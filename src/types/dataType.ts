

export interface Suggestion {
  post_id: string;
  created_at: string;
  title: string;
  content: string;
  product: string;
  user_id: string;
  selected: boolean;
  likes: number;
  img_url: string;
  users: User
}

export interface NatureStory{
  post_id: string,
  created_at: string,
  category: string,
  url: string,
  tag: string,
}

export interface User {
  user_id: string,
  created_at: string,
  point: number,
  address: string,
  profile_img: string,
  nickname: string,
  email: string
}