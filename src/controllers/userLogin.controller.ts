import { Request, Response } from "express";
import userLoginService from "../services/userLogin.service";

const userLoginController = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const token = await userLoginService({ email, password });

    return response.status(200).json({ token: token });
  } catch (error) {
    if (error instanceof Error) {
      return response
        .status(403)
        .send({ error: error.name, message: error.message });
    }
  }
};

export default userLoginController;
