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

export interface NatureStory{
  post_id: string;
  content: string;
  created_at: string;
  category: string;
  img_url: string;
  title: string,
  video_url: string 
  tag: string;
}





