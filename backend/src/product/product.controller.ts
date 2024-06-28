import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  StreamableFile,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { v4 } from 'uuid';
import { Request } from 'express';
import { ProductPayloadDto } from './dto/product.dto';
import * as fs from 'fs';

const storage = {
  storage: multer.diskStorage({
    destination: './uploads/productImages',
    filename: (req, file, cb) => {
      const origin = path.parse(file.originalname);
      const filename: string = origin.name.replace(/\s/g, '') + v4();
      const extension: string = origin.ext;
      cb(null, `${filename}${extension}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/image\/(png|jpeg|gif)/)) {
      cb(null, true);
    } else {
      req.fileValidationError = `unsupported mime type: ${file.mimetype}`;
      cb(null, false);
    }
  },
};

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() query) {
    return await this.productService.getProductMany(parseInt(query.category));
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('image', 5, storage))
  @Post()
  async postProduct(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: ProductPayloadDto,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (files.length < 1) {
      throw new BadRequestException('at least one file is required');
    }
    try {
      return await this.productService.createProduct(req.user.id, data, files);
    } catch (err) {
      // fail to post Product
      for (const file of files)
        fs.unlink(`uploads/productImages/${file.filename}`, () => {});
    }
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProduct(id);
  }

  @Get('productImage/:imageName')
  getProductImage(@Param('imageName') imageName): StreamableFile {
    const file = fs.createReadStream(
      path.join('./uploads/productImages/' + imageName),
    );

    return new StreamableFile(file);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteProduct(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const productUserId = (await this.productService.getProductUserId(id)).user
      .id;
    if (req.user.id !== productUserId) throw new UnauthorizedException();

    return await this.productService.deleteProduct(id);
  }
}
