//sobreEscrevendo o Express
//criado pois o request do express nao possui o user por isso foi necessário sobreescrever
declare namespace Express{
    export interface Request{
        user: {
            id: string,
        };
    }
}