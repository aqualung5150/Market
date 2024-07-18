import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  StreamableFile,
  UnauthorizedException,
  UnsupportedMediaTypeException,
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
import {
  CreateProductDto,
  UpdateProductDto,
  StatusParamDto,
  StatusQueryDto,
  ModifyParamDto,
  DeleteParamDto,
} from './dto/product.dto';
import * as fs from 'fs';
import { ProductImagePipe } from 'src/product-image/product-image.pipe';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

const storage = {
  storage: multer.memoryStorage(),
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

// const storage = {
//   storage: multer.diskStorage({
//     destination: './uploads/productImages',
//     filename: (req, file, cb) => {
//       const origin = path.parse(file.originalname);
//       const filename: string = v4();
//       const extension: string = origin.ext;
//       cb(null, `${filename}${extension}`);
//     },
//   }),
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.match(/image\/(png|jpeg|gif)/)) {
//       cb(null, true);
//     } else {
//       req.fileValidationError = `unsupported mime type: ${file.mimetype}`;
//       cb(null, false);
//     }
//   },
// };

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  // @Get()
  // async getProducts(@Query() query) {
  //   return await this.productService.getProductMany({
  //     title: query.title,
  //     categoryId: parseInt(query.category),
  //     page: query.page,
  //   });
  // }

  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('image', 5, storage))
  @Post('add')
  async postProduct(
    @Req() req: Request,
    @UploadedFiles(ProductImagePipe) files: string[],
    @Body() data: CreateProductDto,
  ) {
    // file validation
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(req.fileValidationError);
    }
    if (files.length < 1) {
      throw new BadRequestException('at least one image is required');
    }

    // create product
    try {
      return await this.productService.createProduct(req.user.id, data, files);
    } catch (err) {
      for (const file of files) {
        fs.unlink(`uploads/productImages/thumb/${file}`, () => {});
        fs.unlink(`uploads/productImages/main/${file}`, () => {});
      }

      throw new HttpException('failed to create', 409);
    }
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('image', 5, storage))
  @Post('modify/:id')
  async updateProduct(
    @Req() req: Request,
    @Param() param: ModifyParamDto,
    @UploadedFiles(ProductImagePipe) files: string[],
    @Body() data: UpdateProductDto,
  ) {
    const productId = param.id;
    if (!data.existingFiles && files.length <= 0) {
      throw new BadRequestException('at least one image is required');
    }
    if (!data.existingFiles) data.existingFiles = [];
    // auth check
    const productUserId = (
      await this.productService.getUserIdByProductId(productId)
    ).user.id;
    if (req.user.id !== productUserId) throw new UnauthorizedException();
    // file validation
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(req.fileValidationError);
    }
    // update product
    try {
      return await this.productService.updateProduct(productId, data, files);
    } catch (err) {
      this.logger.error(err);
      for (const file of files) {
        fs.unlink(`uploads/productImages/thumb/${file}`, () => {});
        fs.unlink(`uploads/productImages/main/${file}`, () => {});
      }

      throw new HttpException('failed to update', 409);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('status/:id')
  async updateProductStatus(
    @Req() req: Request,
    @Param() param: StatusParamDto,
    @Query() query: StatusQueryDto,
  ) {
    const productId = param.id;
    const status = query.status;
    // auth check
    const productUserId = (
      await this.productService.getUserIdByProductId(productId)
    ).user.id;
    if (req.user.id !== productUserId) throw new UnauthorizedException();

    return await this.productService.changeProductStatus(productId, status);
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProduct(id);
  }

  @Get('productImage/:imageName')
  getProductImage(
    @Param('imageName') imageName,
    @Query('impolicy') impolicy,
  ): StreamableFile {
    const file = fs.createReadStream(
      // path.join('./uploads/productImages/' + imageName),
      `./uploads/productImages/${impolicy}/${imageName}`,
    );

    return new StreamableFile(file);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('deleteMany')
  async deleteProducts(@Body() data) {
    console.log(data);
    return await this.productService.deleteProducts(data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteProduct(@Req() req: Request, @Param() param: DeleteParamDto) {
    const productId = param.id;
    const productUserId = (
      await this.productService.getUserIdByProductId(productId)
    ).user.id;
    if (req.user.id !== productUserId) throw new UnauthorizedException();

    return await this.productService.deleteProduct(productId);
  }

  // TEST
  @Post('dummy5150')
  async createDummy() {
    return await this.productService.createTestDummy();
  }

  @Post('deleteAll5150')
  async deleteAll() {
    return await this.productService.deleteAll();
  }

  @Post('dummyUpdate5150')
  async updateDummy() {
    return await this.productService.dummyStatus();
  }
}
