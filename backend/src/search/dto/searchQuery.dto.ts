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

  @IsOptional()
  // @IsArray()
  // @ArrayNotEmpty()
  // @ArrayMinSize(1)
  @Type(() => String)
  @IsString({ each: true })
  filter: string[] | string;
}
