import {Router} from 'express';
import { authenticateRoutes } from './Authenticate.Routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specifications",specificationsRoutes);
router.use("/users",userRoutes);
router.use(authenticateRoutes);//vai no / direto
export {router};