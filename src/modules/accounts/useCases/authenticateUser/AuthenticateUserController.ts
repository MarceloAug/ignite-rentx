import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUsecase";


class AuthenticateUserController{

    async handle(request:Request,response:Response) {
        const { email, password } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const token = await authenticateUserUseCase.execute({ password, email });
        
        return response.json(token);
    }
}

export { AuthenticateUserController };