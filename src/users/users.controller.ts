import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpException, HttpStatus, UseGuards, ValidationPipe, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { UserGaurd } from './user.gaurd';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';

@ApiTags("User")
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Post('/login')
  login(@Body() loginDto: UserLoginDto) {
    return this.userService.login(loginDto.email, loginDto.password);
  }

  @Get()
  @UseGuards(new UserGaurd())
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
     const user = await this.userService.findOne(+id)
      if(!user)
        throw new NotFoundException("User with id " + id + " not found")
      return user
  }

  @Get('getOne/:id')
  async getOneUser(@Param('id') id: string) {
     const user = await this.userService.getOneUser(+id)
      if(!user)
        throw new NotFoundException("User with id " + id + " not found")
      return user
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserCreateInput) {
      return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}