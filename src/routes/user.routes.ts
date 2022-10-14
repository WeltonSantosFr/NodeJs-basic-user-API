import { Router } from "express";
import userCreateController from "../controllers/userCreate.controller";
import userLoginController from "../controllers/userLogin.controller";
import userListController from "../controllers/userList.controller";
import userUpdateController from "../controllers/userUpdate.controller";
import userDeleteController from "../controllers/userDelete.controller";
import ensureAuth from "../middlewares/ensureAuth.middleware";
import ensureAdmin from "../middlewares/ensureAdmin.middleware";

const userRouter = Router();

userRouter.post("/users", userCreateController);

userRouter.post("/login", userLoginController);

userRouter.get("/users", ensureAuth, ensureAdmin, userListController);

userRouter.patch("/users/:id", ensureAuth, ensureAdmin, userUpdateController);

userRouter.delete("/users/:id", ensureAuth, ensureAdmin, userDeleteController);

export default userRouter;
