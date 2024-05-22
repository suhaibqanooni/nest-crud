import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { title, price, category } = value as Prisma.ProductCreateInput;
    if (!title || !price || !category) {
      throw new BadRequestException('You must provide all the data.');
    }
    if (!(category === 'LAPTOPS' || category === 'PRINTERS')) {
      throw new BadRequestException('Please select valid data for Category.');
    }
    return value;
  }
}