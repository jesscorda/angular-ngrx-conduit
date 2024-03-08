export interface User {
  username: string;
  email: string;
  bio: string | null;
  token: string;
  image: string | null;
  password?: string;
}

export type Username = User['username'];

export type UserRequestPayload = Omit<User, 'token'>;
