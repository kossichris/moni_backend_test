import { IsNotEmpty } from 'class-validator';

export class FundWalletDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly balance: number;
}
