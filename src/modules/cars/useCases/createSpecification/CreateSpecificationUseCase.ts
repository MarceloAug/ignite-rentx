import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import {inject, injectable} from 'tsyringe';
interface IRequest{
    name:string,
    description:string
}

@injectable()
class CreateSpecificationUseCase{

    constructor(@inject("SpecificationsRepository")
        private specificationsRepository:ISpecificationsRepository){

    }
   async execute({description,name}:IRequest):Promise<void>{
        const specificationAlreadyExists = await this.specificationsRepository.findByname(name);

        if(specificationAlreadyExists){
            throw new Error('Specification Already Exists');
        }
      await this.specificationsRepository.create({description,name});
    }
}
export {CreateSpecificationUseCase};