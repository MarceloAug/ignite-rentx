import { Category } from "../../entities/Category";
import { ICategoriesRepository,ICreateCategoryDTO } from "../ICategoriesRepository";
import {getRepository, Repository} from "typeorm";


class CategoriesRepository implements ICategoriesRepository {

    //deixando a variavel repository como private , permite que so esse arquivo tenha acesso as funções de banco de dados
    private repository: Repository<Category>;

    constructor(){
        this.repository = getRepository(Category);
    }

   //retorna void
    async create({description, name} : ICreateCategoryDTO): Promise<void>{
        const category = this.repository.create({
            description,
            name
        });
        await this.repository.save(category)
    }

    //retorna uma lista de categorias
    async list(): Promise<Category[]>{
        const categories = await this.repository.find();
        return categories;
    }

    async findByname(name:string): Promise<Category>{
        const category = await this.repository.findOne({name});
        return category;
    }
}
export {CategoriesRepository};