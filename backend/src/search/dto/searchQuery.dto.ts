import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsNumber()
  id: number; // for admin

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsNumber()
  maxPrice: number;

  @IsOptional()
  @IsNumber()
  status: number;

  @IsOptional()
  @IsNumber()
  condition: number;
}
