import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const ensureAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let token = request.headers.authorization;

    if (!token) {
      throw new Error("No token informed");
    }

    token = token.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (error: any, decoded: any) => {
        request.user = decoded;
        next();
      }
    );
  } catch (error) {
    return response.status(401).send({ message: "Invalid Token" });
  }
};

export default ensureAuth;
