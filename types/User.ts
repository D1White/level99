import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface JWTUser extends JwtPayload {
  data: IUser;
}
