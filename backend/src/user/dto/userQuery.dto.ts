import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserQueryDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  nickname: string;
}
