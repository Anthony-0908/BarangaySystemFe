export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
  token_type: string;
}