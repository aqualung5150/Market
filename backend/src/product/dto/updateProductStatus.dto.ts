import { IsNotEmpty, IsNumber } from 'class-validator';

export class StatusParamDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}

export class StatusQueryDto {
  @IsNotEmpty()
  @IsNumber()
  status: number;
}
