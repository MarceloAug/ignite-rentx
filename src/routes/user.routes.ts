import { Router } from 'express';
import multer from 'multer';
import { UpdateUserAvatarController } from '../modules/accounts/updateUserAvatar/updateUserAvatarController';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import uploadConfig from "../config/upload";
import { ensureAuthencated } from '../middleware/ensureAuthenticated';
const userRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
userRoutes.post("/", createUserController.handle);
userRoutes.patch("/avatar",ensureAuthencated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export{userRoutes}