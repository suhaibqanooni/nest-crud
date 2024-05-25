import {  Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateEmployeesDto } from './dto/employees.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createEmployeesDto: CreateEmployeesDto) {
    return this.databaseService.employee.create({data:createEmployeesDto})
  }

  async findAll() {
    return await this.databaseService.employee.findMany({orderBy: {id: 'asc'}})
  }
  async findAllWithDetails() {
    return await this.databaseService.employee.findMany({orderBy: {id: 'asc'},
    include:{Product:true, User:{select:{id:true, name:true, email:true, role:true}}}})
  }

  async findOne(id: number) {
    return await this.databaseService.employee.findUnique({where:{id}})
  }

  async findOneWithDetails(id: number) {
    return await this.databaseService.employee.findUnique({where:{id}, 
      include:{Product:true, User:{select:{id:true, name:true, email:true, role:true}}}})
  }

 async update(id: number, updateEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.update({where:{id}, data:updateEmployeeDto})
  }
  
  remove(id: number) {
    return this.databaseService.employee.delete({where:{id}})
  }
}
