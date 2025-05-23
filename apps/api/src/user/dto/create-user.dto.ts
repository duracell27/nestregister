/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
