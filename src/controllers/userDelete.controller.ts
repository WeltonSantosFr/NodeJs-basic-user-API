import { Request, Response } from "express";
import userDeleteService from "../services/userDelete.service";

const userDeleteController = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const user = await userDeleteService(id);

    return response.status(204).json({ message: "User deleted with success!" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User not Found") {
        return response
          .status(404)
          .json({ error: error.name, message: error.message });
      }
      return response
        .status(400)
        .json({ error: error.name, message: error.message });
    }
  }
};

export default userDeleteController;
