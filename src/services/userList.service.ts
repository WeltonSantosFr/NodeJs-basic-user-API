import { string } from "yup";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const userListService = async () => {
  const userRepository = await AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export default userListService;
