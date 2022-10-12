import { MigrationInterface, QueryRunner } from "typeorm";

export class addCpfToCreditanalysis1665593393991 implements MigrationInterface {
    name = 'addCpfToCreditanalysis1665593393991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit_analysis" ADD "cpf" character(11) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit_analysis" DROP COLUMN "cpf"`);
    }

}
