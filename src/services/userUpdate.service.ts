import { IUserUpdate } from "./../interfaces/users/index";
import bcrypt from "bcryptjs";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const userUpdateService = async (
  { name, email, password, isAdm }: IUserUpdate,
  id: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new Error("User not found");
  }

  if (password) {
    if (bcrypt.compareSync(password!, user.password)) {
      throw new Error("Inform a different password.");
    }
  }
  if (isAdm || isAdm === false) {
    throw new Error("Can not update isAdm Field");
  }

  await userRepository.update(id, {
    name: name ? name : user.name,
    email: email ? email : user.email,
    password: password ? bcrypt.hashSync(password!, 10) : user.password,

    updatedAt: new Date(),
  });

  return true;
};

export default userUpdateService;
