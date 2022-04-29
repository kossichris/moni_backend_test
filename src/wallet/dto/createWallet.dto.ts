import { IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly balance: number;
}

export class TransferWalletDto {
  @IsNotEmpty()
  readonly amount: number;
}
