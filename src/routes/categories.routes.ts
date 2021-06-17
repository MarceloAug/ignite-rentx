import {Router} from 'express';
import multer from 'multer';
import {CreateCategoryController} from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategory/listCategoriesController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ensureAuthencated } from '../middleware/ensureAuthenticated';
const categoriesRoutes = Router();
const upload = multer({
   dest:"./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuthencated);
//express passa para o controller o request e o response
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/",listCategoriesController.handle);

categoriesRoutes.post('/import',upload.single("file"),importCategoryController.handle)

export {categoriesRoutes};