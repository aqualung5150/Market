import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  condition: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  condition: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Type(() => String)
  @IsString({ each: true })
  existingFiles: string[];
}

export class StatusParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class StatusQueryDto {
  @IsNotEmpty()
  @IsNumber()
  status: number;
}

export class ModifyParamDto extends StatusParamDto {}
export class DeleteParamDto extends StatusParamDto {}
