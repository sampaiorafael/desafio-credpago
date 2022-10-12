import { MigrationInterface, QueryRunner } from "typeorm";

export class addScoreToCreditanalysis1665604131287 implements MigrationInterface {
    name = 'addScoreToCreditanalysis1665604131287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit_analysis" ADD "score" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit_analysis" DROP COLUMN "score"`);
    }

}
