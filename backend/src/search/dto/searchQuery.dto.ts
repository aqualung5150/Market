import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsOptional()
  // @IsArray()
  // @ArrayNotEmpty()
  // @ArrayMinSize(1)
  @Type(() => String)
  @IsString({ each: true })
  filter: string[] | string;

  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsNumber()
  maxPrice: number;
}
