import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpException, HttpStatus, UseGuards, ValidationPipe, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { EmployeesGaurd } from './employees.gaurd';
import { CreateEmployeesDto } from './dto/employees.dto';

@ApiTags("Employees")
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseGuards(new EmployeesGaurd())
  create(@Body(new ValidationPipe()) createEmployeeDto: CreateEmployeesDto) {
    return this.employeesService.create(createEmployeeDto);
  }
 
  @Get()
  @UseGuards(new EmployeesGaurd())
  findAll() {
    return this.employeesService.findAll();
  }
  @Get("details")
  @UseGuards(new EmployeesGaurd())
  findAllWithDetails() {
    return this.employeesService.findAllWithDetails();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
     const user = await this.employeesService.findOne(+id)
      if(!user)
        throw new NotFoundException("Employee with id " + id + " not found")
      return user
  }

  @Get('details/:id')
  async findOneWithDetails(@Param('id') id: string) {
     const user = await this.employeesService.findOneWithDetails(+id)
      if(!user)
        throw new NotFoundException("Employee with id " + id + " not found")
      return user
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeCreateInput) {
      return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      return this.employeesService.remove(+id).then(() => {}).catch(() => {
        throw new NotFoundException("Employee with id " + id + " not found")
      })
  }
}