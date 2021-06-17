import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/respositories/implementations/UsersRepository';

interface IPayload{
    sub: string;

}

export async function ensureAuthencated(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing",401);
    }
    //Bearer u934832wiewjekrwekjr894
    //split cria um array separando pelo espaço
    const [, token] = authHeader.split(" ");//ignora a primeira posição e joga o valor do array na posicao 1 pra dentro da variavel token
    try {
        const {sub :user_id} = verify(token, "d41d8cd98f00b204e9800998ecf8427e") as IPayload;
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User Does Not Exists",401);
        }

        request.user = {
            id : user_id
        }
        next();
    } catch {
        throw new AppError("Invalid token",401);
    }
    
}