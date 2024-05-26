import { Controller, Get, Post, Body, Patch, Param, Delete,  ValidationPipe, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/orders.dto'


@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createEmployeeDto: CreateOrdersDto) {
    return this.ordersService.create(createEmployeeDto);
  }

 
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @Get("details")
  findAllWithDetails() {
    return this.ordersService.findAllWithDetails();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
     const user = await this.ordersService.findOne(+id)
      if(!user)
        throw new NotFoundException("Order with id " + id + " not found")
      return user
  }

  @Get('details/:id')
  async findOneWithDetails(@Param('id') id: string) {
     const user = await this.ordersService.findOneWithDetails(+id)
      if(!user)
        throw new NotFoundException("Order with id " + id + " not found")
      return user
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeCreateInput) {
      return this.ordersService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      return this.ordersService.remove(+id).then(() => {}).catch(() => {
        throw new NotFoundException("Order with id " + id + " not found")
      })
  }
}