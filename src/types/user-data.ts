import type { AuthorizationStatus } from "../const";

export interface IAuthRole {
  role: keyof typeof AuthorizationStatus;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  position: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
