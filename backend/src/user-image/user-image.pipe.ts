import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 } from 'uuid';

const MAIN_SIZE = 1000;

@Injectable()
export class UserImagePipe implements PipeTransform {
  async resize(value: Express.Multer.File) {
    const metadata = await sharp(value.buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;
    const origin = path.parse(value.originalname);
    const url = v4() + origin.ext;

    // main image
    if (width > MAIN_SIZE || height > MAIN_SIZE) {
      await sharp(value.buffer)
        .resize(MAIN_SIZE)
        .withMetadata()
        .toFile(`uploads/profileImages/${url}`);
    } else {
      await sharp(value.buffer).toFile(`uploads/profileImages/${url}`);
    }

    return url;
  }

  async transform(value: Express.Multer.File) {
    return await this.resize(value);
  }
}
