import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategories1617918208438 implements MigrationInterface {
//yarn typeorm migration:run executa as migrations
//yarn typeorm migration:revert desfaz a migration
//yarn typeorm migration:create -n CreateTable Cria uma migration
    public async up(queryRunner: QueryRunner): Promise<void> {
        //
        await queryRunner.createTable(
            new Table({
                name:"categories",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },

                    {
                        name:"name",
                        type:"varchar",
                    },

                    {
                        name:"description",
                        type:"varchar",
                    },

                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }

                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("categories");
    }

}
