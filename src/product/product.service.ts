import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) { }

  create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({data:createProductDto})
  }

  findAll() {
    return this.databaseService.product.findMany({orderBy: {id: 'asc'}})
  }

  findByCategory(category:any) {
    return this.databaseService.product.findMany({where:{category}})
  }

  findOne(id: number) {
    return this.databaseService.product.findUnique({where:{id}})
  }

  update(id: number, updateProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.update({where:{id}, data:updateProductDto})
  }

  remove(id: number) {
    return this.databaseService.product.delete({where:{id}})
  }
}
