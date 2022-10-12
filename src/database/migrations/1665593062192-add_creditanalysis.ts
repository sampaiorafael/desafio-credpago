import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreditanalysis1665593062192 implements MigrationInterface {
    name = 'addCreditanalysis1665593062192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."credit_analysis_result_enum" AS ENUM('approved', 'denied', 'to_manual')`);
        await queryRunner.query(`CREATE TABLE "credit_analysis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "result" "public"."credit_analysis_result_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6eabd4bc77fd8ac2db4fe5de832" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "credit_analysis"`);
        await queryRunner.query(`DROP TYPE "public"."credit_analysis_result_enum"`);
    }

}
