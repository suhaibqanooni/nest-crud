import {  Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './dto/user.dto';
@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) { }

async create(createUserDto: CreateUserDto) {
     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
     const userToCreate: CreateUserDto = {
       ...createUserDto,
       password: hashedPassword ,
       productTableViewColumns: '["1","2","3","4","5","6"]'
   };
   return this.databaseService.user.create({data:userToCreate})
 }

 async login(email:string, password:string) {
  const user = await this.databaseService.user.findUnique({ where: { email }});
  if(user){
    const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch) {
      const {password, ...loggedUser} = user
      const access_token = await this.jwtService.signAsync(loggedUser)
      return {message:"Successfully logged in", access_token}
    } else {
      return {error: "Wrong password"}
    }
  }else{
    return {error: "User Not Found"}
  }
  }

  async findAll() {
    const data = await this.databaseService.user.findMany({orderBy: {id: 'asc'}})
    const users = data.map(user => {
      const { password, ...userDataWithoutPassword } = user;
      return userDataWithoutPassword;
  });
  return users
  }

  async findOne(id: number) {
    return await this.databaseService.user.findUnique({where:{id}})
  }

  async getOneUser(id: number) {
    const user =  await this.databaseService.user.findUnique({where:{id}})
    const { password,...rest } = user;
    return {user:rest}
  }

 async update(id: number, updateUserDto: Prisma.UserCreateInput) {
  const {password} = updateUserDto
  let updatedUser = updateUserDto
  if(updateUserDto.password){
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const userToCreate: Prisma.UserCreateInput = {
      ...updateUserDto,
      password: hashedPassword 
  };
  updatedUser = password ? userToCreate : updateUserDto
  }
    return this.databaseService.user.update({where:{id}, data:updatedUser})
  }
  
  remove(id: number) {
    return this.databaseService.user.delete({where:{id}})
  }
}
