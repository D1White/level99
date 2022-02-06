import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IUserFull extends IUser {
  password: string;
}

export type CreateUser = Pick<IUserFull, 'email' | 'password' | 'name'>;

export type LoginForm = Pick<IUserFull, 'email' | 'password'>;

export interface ILoginRes extends IUser {
  token: string;
}

export interface JWTUser extends JwtPayload {
  data: IUser;
}
