import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  readonly email: string;
  readonly image: string;
  readonly bio: string;
}
