import { User } from "../entities/user.entity";
import { IUserRequest } from "../interfaces/users";
import bcrypt from "bcryptjs";
import AppDataSource from "../data-source";
import { v4 as uuidv4 } from "uuid";

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const newUser = userRepository.create({
    id: uuidv4(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    isAdm,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  });

  await userRepository.save(newUser);

  const returnUser = { ...newUser, password: undefined };

  return returnUser;
};

export default userCreateService;
