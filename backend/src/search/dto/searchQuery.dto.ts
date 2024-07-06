import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  page: number;
}
