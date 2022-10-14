import { Request, Response, NextFunction } from "express";
import { IUserRequest } from "../interfaces/users";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const userCreateSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});

export const validateUserCreate = (schema: SchemaOf<IUserRequest>) => {
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = request.body;

      try {
        const validateData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        request.user = validateData;
        next();
      } catch (error: any) {
        return response.status(400).json({ error: error.errors?.join(", ") });
      }
    } catch (error) {
      next(error);
    }
  };
};
