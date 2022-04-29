import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1613122798443 implements MigrationInterface {
  name = 'SeedDb1613122798443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('cool', 'cool@gmail.com', '$2b$10$TKVfaUZ8y9S4/w1HyGJAMu59ldsmAjMuyftuiOcGDnQ0I4XgEPLGO')`,
    );
  }

  public async down(): Promise<void> {}
}
