import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  @IsNumber()
  page: number;

  // TODO - 옵션 검증
  // @IsOptional()
  // @IsArray()
  // @ArrayNotEmpty()
  // @ArrayMinSize(1)
  // @IsString({ each: true })
  // @Type(() => String)
  // @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  // filter: string[];

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
