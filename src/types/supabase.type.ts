export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      challengeSuggestion: {
        Row: {
          content: string;
          created_at: string;
          img_url: string;
          liked_count: number;
          liked_users: string[];
          post_id: string;
          product: string;
          selected: boolean;
          title: string;
          user_id: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          img_url?: string;
          liked_count?: number;
          liked_users?: string[];
          post_id?: string;
          product?: string;
          selected?: boolean;
          title?: string;
          user_id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          img_url?: string;
          liked_count?: number;
          liked_users?: string[];
          post_id?: string;
          product?: string;
          selected?: boolean;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'challengeSuggestion_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      ideaComments: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ideaComments_post_id_fkey';
            columns: ['post_id'];
            referencedRelation: 'challengeSuggestion';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 'ideaComments_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      joinChallenge: {
        Row: {
          challenge_id: string;
          completedMission: boolean | null;
          join_id: string;
          reviews: number | null;
          user_id: string;
        };
        Insert: {
          challenge_id: string;
          completedMission?: boolean | null;
          join_id?: string;
          reviews?: number | null;
          user_id?: string;
        };
        Update: {
          challenge_id?: string;
          completedMission?: boolean | null;
          join_id?: string;
          reviews?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'joinChallenge_challenge_id_fkey';
            columns: ['challenge_id'];
            referencedRelation: 'mainChallenge';
            referencedColumns: ['challenge_Id'];
          },
          {
            foreignKeyName: 'joinChallenge_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      mainChallenge: {
        Row: {
          badgeUrl: string;
          challenge_Id: string;
          content: string;
          created_at: string;
          endDate: string | null;
          howto: string;
          isCompleted: boolean | null;
          limit: number;
          point: number;
          product: string;
          startDate: string | null;
          title: string;
        };
        Insert: {
          badgeUrl?: string;
          challenge_Id?: string;
          content?: string;
          created_at?: string;
          endDate?: string | null;
          howto?: string;
          isCompleted?: boolean | null;
          limit?: number;
          point?: number;
          product?: string;
          startDate?: string | null;
          title?: string;
        };
        Update: {
          badgeUrl?: string;
          challenge_Id?: string;
          content?: string;
          created_at?: string;
          endDate?: string | null;
          howto?: string;
          isCompleted?: boolean | null;
          limit?: number;
          point?: number;
          product?: string;
          startDate?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      natureStory: {
        Row: {
          category: string;
          content: string;
          created_at: string;
          img_url: string;
          post_id: string;
          tag: string;
          title: string;
          video_url: string;
        };
        Insert: {
          category?: string;
          content?: string;
          created_at?: string;
          img_url?: string;
          post_id?: string;
          tag?: string;
          title?: string;
          video_url?: string;
        };
        Update: {
          category?: string;
          content?: string;
          created_at?: string;
          img_url?: string;
          post_id?: string;
          tag?: string;
          title?: string;
          video_url?: string;
        };
        Relationships: [];
      };
      reviewComments: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          challenge_id: string;
          created_at: string;
          img_url: string;
          insta_url: string;
          post_id: number;
          tags: string;
          user_id: string;
        };
        Insert: {
          challenge_id: string;
          created_at?: string;
          img_url: string;
          insta_url: string;
          post_id?: number;
          tags: string;
          user_id: string;
        };
        Update: {
          challenge_id?: string;
          created_at?: string;
          img_url?: string;
          insta_url?: string;
          post_id?: number;
          tags?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_challenge_id_fkey';
            columns: ['challenge_id'];
            referencedRelation: 'mainChallenge';
            referencedColumns: ['challenge_Id'];
          },
          {
            foreignKeyName: 'reviews_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      users: {
        Row: {
          address: string | null;
          created_at: string;
          detailAddress: string | null;
          email: string;
          name: string | null;
          nickname: string | null;
          phone: string | null;
          point: number;
          profile_img: string | null;
          rank: number;
          user_id: string;
          zonecode: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          detailAddress?: string | null;
          email: string;
          name?: string | null;
          nickname?: string | null;
          phone?: string | null;
          point?: number;
          profile_img?: string | null;
          rank?: number;
          user_id: string;
          zonecode?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          detailAddress?: string | null;
          email?: string;
          name?: string | null;
          nickname?: string | null;
          phone?: string | null;
          point?: number;
          profile_img?: string | null;
          rank?: number;
          user_id?: string;
          zonecode?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type MainChallenge = Pick<
  Tables<'mainChallenge'>,
  'badgeUrl' | 'challenge_Id' | 'content' | 'created_at' | 'endDate' | 'howto' | 'isCompleted' | 'limit' | 'point' | 'product' | 'startDate' | 'title'
>;
