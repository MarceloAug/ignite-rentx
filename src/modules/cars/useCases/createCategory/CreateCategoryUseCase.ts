import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import {inject,injectable} from 'tsyringe';
import { AppError } from "../../../../errors/AppError";
interface IRequest{
    name:string,
    description:string
}//criado para pegar os valores que vem do request.body

@injectable()
class CreateCategoryUseCase{

    constructor(@inject("CategoriesRepository")
        private categoriesRepository:ICategoriesRepository){

    }
   async execute({description,name}:IRequest): Promise<void>{
        const categoriesAlreadyExists = await this.categoriesRepository.findByname(name);

        if(categoriesAlreadyExists){
            throw new AppError('Category Already Exists');
        }
        await this.categoriesRepository.create({name, description});
    }
}
export {CreateCategoryUseCase}