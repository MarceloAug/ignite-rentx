import { inject, injectable } from "tsyringe";
import { ICreatedUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../respositories/IUsersRepository";
import { hash } from 'bcryptjs';
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(@inject('UsersRepository')
        private usersRepository: IUsersRepository) {
        
    }

   async execute({ name, email, driver_license, password }:ICreatedUserDTO):Promise<void> {
       
       const userAlreadyExist = await this.usersRepository.findByEmail(email);

       if (userAlreadyExist) {
           throw new AppError("User Already exists")
       }
       const passwordHash = await hash(password, 8);
       await this.usersRepository.create({
           name,
           email,
           driver_license,
           password:passwordHash
       });
    }
}

export {
    CreateUserUseCase
}