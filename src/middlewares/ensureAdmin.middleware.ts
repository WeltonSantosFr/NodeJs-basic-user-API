import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

export const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (request.user.isAdm === false && request.user.email !== user?.email) {
      throw new Error("Must be an Admin to update other users");
    }

    if (request.user.isAdm === false) {
      throw new Error("Must be an Admin");
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Must be an Admin to update other users") {
        return response.status(401).json({ message: "Must be an Admin!" });
      }
      return response.status(403).json({ message: "Must be an Admin!" });
    }
  }
};

export default ensureAdmin;
