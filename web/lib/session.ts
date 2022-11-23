import type { IronSessionOptions } from "iron-session";

export type User = {
  isAuthenticated: boolean;
  email: string;
};

export const sessionOptions: IronSessionOptions = {
  cookieName: "auth",
  password: process.env.COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
