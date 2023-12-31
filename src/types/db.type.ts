export interface Suggestion {
  post_id: string;
  created_at: string;
  title: string;
  content: string;
  product: string;
  user_id: string | null;
  selected: boolean | null;
  liked_count: number;
  liked_users: string[];
  img_url: string;
  users: User | null;
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
export interface User {
  user_id: string;
  created_at?: string;
  point: number;
  address: string | null;
  profile_img: string | null;
  nickname: string | null;
  email: string;
  rank: number;
  name?: string | null;
}
export interface DonationHistory {
  donation_id: string;
  created_at: string;
  point: number;
  user_id: string;
}
export interface Donation {
  donation_total_id: string;
  created_at: number;
  point: number;
  isCompleted: boolean;
}

export interface AnimalMap {
  [key: string]: string;
}
export interface HowToGetTrees {
  title: string;
  trees: number;
}
export interface HowToRankUp {
  title: string;
  animals: string;
  trees: number;
}

export interface IdeaComments {
  id: string;
  created_at: string;
  post_id?: string;
  comment: string;
  user_id: string;
  users: User | null;
}

export interface IdeaPost {
  title: string;
  content: string;
  product?: string;
  user_id: string;
  selected: boolean;
  img_url: string;
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
  post_id: number;
  created_at: string;
  challenge_id: string | null;
  insta_url: string | null;
  user_id: string | null;
  img_url: string | null;
  tags: string | null;
  mainChallenge: { title: string };
  users: User;
}

export interface CertifyPostType {
  insta_url: string;
  user_id: string;
  img_url: string;
  tags: string;
  challenge_id: string;
}

export interface Badge {
  challenge_id: string;
  completedMission: boolean | null;
  join_id: string;
  reviews: number | null;
  user_id: string;
  mainChallenge: {
    badgeUrl: string;
    challenge_Id: string;
    content: string;
    title: string;
    point: number;
    limit: number;
    product: string;
    startDate: string | null;
    endDate: string | null;
    howto: string;
    animal?: string;
  } | null;
}
