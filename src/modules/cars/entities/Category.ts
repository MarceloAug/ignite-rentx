import {v4 as uuidV4 } from 'uuid';
import {Column, CreateDateColumn, Entity, PrimaryColumn} from  "typeorm";

@Entity("categories")
class Category{
    @PrimaryColumn()//se o nome for igual ao que esta no banco nao precisa passar o parametro , caso nao seja faça o comando abaixo
    //@Column("id")
    id?:string;//campo opcional
    
    @Column()
    name:string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at:Date

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}
export {Category};