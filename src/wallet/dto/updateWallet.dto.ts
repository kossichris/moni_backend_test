import { IsNotEmpty } from 'class-validator';

export class UpdateWalletDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly balance: number;
}
