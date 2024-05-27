import {  Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreateOrdersDto } from './dto/orders.dto';


@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createOrdersDto: CreateOrdersDto) {
    return this.databaseService.order.create({data:createOrdersDto})
  }

  async findAll() {
    return await this.databaseService.order.findMany({orderBy: {id: 'asc'}})
  }
  async findAllWithDetails() {
    return await this.databaseService.order.findMany({orderBy: {id: 'asc'},
    include:{ User:{select:{id:true, name:true, email:true, role:true}}}})
  }

  async findOne(id: number) {
    return await this.databaseService.order.findUnique({where:{id}})
  }

  async findOneWithDetails(id: number) {
    return await this.databaseService.order.findUnique({where:{id},
      include:{ User:{select:{id:true, name:true, email:true, role:true}}}})
  }

 async update(id: number, updateEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.order.update({where:{id}, data:updateEmployeeDto})
  }
    
  remove(id: number) {
    return this.databaseService.order.delete({where:{id}})
  }


}
