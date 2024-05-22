    export interface State {
        posts: Post[],
        currentPost : Post | null
    }

    export interface User{
        id: number;
        username: string;
        email: string;
        image: null | string;
        birthdate: null | string;
        biography: null | string;
        position: string;
        is_private: boolean;
        badge_id: number;
        created_at: string;
        updated_at: string;
  };

  export interface Category {
    id: number;
    title: string;
    image: null | string;
    created_at: string;
    updated_at: string;
  };
  
  export interface Comment {
    id: number;
    post_id: number;
    author_id: number;
    content: string;
    created_at: null | string;
    updated_at: null | string;
  };

  export interface UserPostParticipation {
    id: number;
    post_id: number;
    participant_id: number;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
  };

  export interface Post {
    id: number;
    category_id: number;
    author_id: number;
    tag: string;
    title: string;
    description: string;
    image: null | string;
    position: string;
    type: string;
    level: string;
    start_date: null | string;
    end_date: null | string;
    created_at: string;
    updated_at: string;
    user_post_participation: UserPostParticipation[];
    category: Category;
    like: any[];
    comment: Comment[];
    user: User;
  };

