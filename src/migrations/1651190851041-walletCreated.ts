import {MigrationInterface, QueryRunner} from "typeorm";

export class walletCreated1651190851041 implements MigrationInterface {
    name = 'walletCreated1651190851041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."wallet_currency_enum" AS ENUM('NGN')`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "currency" "public"."wallet_currency_enum" NOT NULL DEFAULT 'NGN', CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TYPE "public"."wallet_currency_enum"`);
    }

}
