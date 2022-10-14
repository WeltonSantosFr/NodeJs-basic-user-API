import { IUserRequest } from "./../../interfaces/users/index";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: IUserRequest;
    }
  }
}
