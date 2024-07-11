import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 } from 'uuid';

const MAIN_SIZE = 1000;
const THUMB_SIZE = 300;

@Injectable()
export class ProductImagePipe implements PipeTransform {
  async resize(value: Express.Multer.File) {
    const metadata = await sharp(value.buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;
    const origin = path.parse(value.originalname);
    const url = v4() + origin.ext;

    // thumb image
    if (width > THUMB_SIZE || height > THUMB_SIZE) {
      await sharp(value.buffer)
        .resize(THUMB_SIZE, THUMB_SIZE)
        .withMetadata()
        .toFile(`uploads/productImages/thumb/${url}`);
    } else {
      await sharp(value.buffer).toFile(`uploads/productImages/thumb/${url}`);
    }

    // main image
    if (width > MAIN_SIZE || height > MAIN_SIZE) {
      await sharp(value.buffer)
        .resize(MAIN_SIZE)
        .withMetadata()
        .toFile(`uploads/productImages/main/${url}`);
    } else {
      await sharp(value.buffer).toFile(`uploads/productImages/main/${url}`);
    }

    return url;
  }

  async transform(value: Express.Multer.File[]) {
    const filenames: string[] = [];
    for (const file of value) {
      filenames.push(await this.resize(file));
    }
    return filenames;
  }
}
