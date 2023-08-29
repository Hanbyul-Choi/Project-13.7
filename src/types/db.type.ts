export interface Suggestion {
  post_id: string;
  created_at: string;
  title: string;
  content: string;
  product: string;
  user_id: string;
  selected: boolean;
  likes: Likes;
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

export interface Likes {
  post_id: string;
  created_at: string;
  users: string[];
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
  product: string;
  user_id: string;
  selected: boolean;
  img_url: string | null;
}
