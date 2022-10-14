import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  if (!account) {
    throw new Error("User not Found");
  }
  if (account.isActive === false) {
    throw new Error("User Already Deleted");
  }

  await userRepository.update(account!.id, { isActive: false });

  return true;
};

export default userDeleteService;
