import { Request, Response } from "express";
import userCreateService from "../services/userCreate.service";

const userCreateController = async (request: Request, response: Response) => {
  try {
    const { email, name, password, isAdm } = request.body;

    const newUser = await userCreateService({ email, name, password, isAdm });

    return response.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return response
        .status(400)
        .send({ error: error.name, message: error.message });
    }
  }
};

export default userCreateController;
