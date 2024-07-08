import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // username: string;

  @IsNotEmpty()
  nickname: string;
}
