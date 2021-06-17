import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { container} from 'tsyringe';


class CreateSpecificationController{
    async handle(request:Request, response:Response):Promise<Response>{
        const {name,description} = request.body;
        //pega o repositorio do container que instancia o repositorio
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
        await createSpecificationUseCase.execute({description,name});
        return response.status(201).send();
    }
}
export {CreateSpecificationController};