import { Request, Response } from "express";
import userListService from "../services/userList.service";

const userListController = async (request: Request, response: Response) => {
  const users = await userListService();

  return response.status(200).json(users);
};

export default userListController;
