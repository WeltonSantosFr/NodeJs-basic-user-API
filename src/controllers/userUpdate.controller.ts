import { IUserUpdate } from "./../interfaces/users/index";
import { Request, Response } from "express";
import userUpdateService from "../services/userUpdate.service";

const userUpdateController = async (request: Request, response: Response) => {
  try {
    const { name, email, password, isAdm }: IUserUpdate = request.body;
    const { isActive } = request.body;

    if (isActive || isActive === false) {
      return response
        .status(401)
        .send({ error: "Error", message: "Can not update isActive Field" });
    }

    if (request.body.id || request.body.id === false) {
      return response
        .status(401)
        .send({ error: "Error", message: "Can not update id Field" });
    }
    const { id } = request.params;

    const user = await userUpdateService({ name, email, password, isAdm }, id);

    return response.status(200).json({ message: "User Updated!" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Must be an Admin to update other users") {
        return response
          .status(403)
          .send({ error: error.name, message: error.message });
      }
      console.log(error.name, error.message);
      return response
        .status(401)
        .send({ error: error.name, message: error.message });
    }
  }
};

export default userUpdateController;
