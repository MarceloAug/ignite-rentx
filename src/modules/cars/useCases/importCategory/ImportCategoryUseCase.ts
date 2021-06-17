import fs from 'fs';
import csvParse from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCategory{
    name:string;
    description:string;
}

@injectable()
class ImportCategoryUseCase{

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository : ICategoriesRepository){

    }
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve,reject) =>{
            //lê o arquivo
            const stream = fs.createReadStream(file.path);
            const categories:IImportCategory[] = [];
            //delimitador ja por padrao é virgula
            const parseFile = csvParse();
            //pega o que foi lido e joga pora dentro do parseFile
            stream.pipe(parseFile);
            //com o parse file eu consigo ler o arquivo linha por linha
            parseFile.on('data', async(line)=>{
                const [name,description] = line
                categories.push({
                    name,
                    description
                });
            }).on("end",()=>{
                //remove o arquivo da tmp
                fs.promises.unlink(file.path)
                resolve(categories);
            }).on("error", (err)=>{
                reject(err);
            })
        });
    }


    async execute(file: Express.Multer.File):Promise<void>{
        const categories = await this.loadCategories(file);
        categories.map( async (category) => {
            const {name,description} = category;
            const existCategory = await this.categoriesRepository.findByname(name);

            if(!existCategory){
               await this.categoriesRepository.create({
                    name,
                    description
                })
            }
        });
    }
}
export {ImportCategoryUseCase};