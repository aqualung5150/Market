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

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  // GET
  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProduct(id);
  }

  @Get('productImage/:imageName')
  getProductImage(
    @Param('imageName') imageName: string,
    @Query('impolicy') impolicy: string,
  ): StreamableFile {
    const file = fs.createReadStream(
      `./uploads/productImages/${impolicy}/${imageName}`,
    );

    return new StreamableFile(file);
  }

  // POST
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('image', 5, storage))
  @Post('add')
  async postProduct(
    @Req() req: Request,
    @UploadedFiles(ProductImagePipe) filenames: string[],
    @Body() data: CreateProductDto,
  ) {
    // file validation
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(req.fileValidationError);
    }
    if (filenames.length < 1) {
      throw new BadRequestException('at least one image is required');
    }

    // create product
    try {
      console.log(req.user.id, data, filenames);
      return await this.productService.createProduct(
        req.user.id,
        data,
        filenames,
      );
    } catch (err) {
      for (const filename of filenames) {
        fs.unlink(`uploads/productImages/thumb/${filename}`, () => {});
        fs.unlink(`uploads/productImages/main/${filename}`, () => {});
      }

      this.logger.error(err);
      throw new HttpException('failed to create', 409);
    }
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('image', 5, storage))
  @Post('modify/:id')
  async updateProduct(
    @Req() req: Request,
    @Param() param: ModifyParamDto,
    @UploadedFiles(ProductImagePipe) filenames: string[],
    @Body() data: UpdateProductDto,
  ) {
    const productId = param.id;
    if (!data.existingFiles && filenames.length <= 0) {
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
      return await this.productService.updateProduct(
        productId,
        data,
        filenames,
      );
    } catch (err) {
      this.logger.error(err);
      for (const filename of filenames) {
        fs.unlink(`uploads/productImages/thumb/${filename}`, () => {});
        fs.unlink(`uploads/productImages/main/${filename}`, () => {});
      }

      throw new HttpException('failed to update', 409);
    }
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('deleteMany')
  async deleteProducts(@Body() data) {
    return await this.productService.deleteProducts(data);
  }

  // PATCH
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

  // DELETE
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
