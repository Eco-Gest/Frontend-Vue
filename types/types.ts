// user.ts
export interface State {
    id: string;
    username: string;
    email: string;
    access_token: string;
    isLoggedIn: boolean;
  }
  
  export interface User {
    email: string;
    password: string;
    username?: string;
  }