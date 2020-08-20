import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteColsUrl21597808788316 implements MigrationInterface {
    name = 'deleteColsUrl21597808788316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avatar" DROP COLUMN "url2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avatar" ADD "url2" character varying`);
    }

}
