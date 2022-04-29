import {MigrationInterface, QueryRunner} from "typeorm";

export class walletCreateAndUserEdited1651235618116 implements MigrationInterface {
    name = 'walletCreateAndUserEdited1651235618116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."wallets_currency_enum" AS ENUM('NGN')`);
        await queryRunner.query(`CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "balance" integer NOT NULL, "name" character varying NOT NULL, "currency" "public"."wallets_currency_enum" NOT NULL DEFAULT 'NGN', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "walletId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0a95e6aab86ff1b0278c18cf48e" UNIQUE ("walletId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0a95e6aab86ff1b0278c18cf48e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "walletId"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TYPE "public"."wallets_currency_enum"`);
    }

}
