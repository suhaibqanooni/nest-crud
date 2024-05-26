import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpException, HttpStatus, UseGuards, ValidationPipe, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { EmployeesGaurd } from './employees.gaurd';
import { CreateEmployeesDto } from './dto/employees.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags("Employees")
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseGuards(new EmployeesGaurd())
  create(@Body(new ValidationPipe()) createEmployeeDto: CreateEmployeesDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
  storage: diskStorage({
    destination:"uploads/employees",
    filename:(req,file,cb)=>{
      cb(null,`${Date.now()}_${file.originalname}`)
    }
  })
}))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return {message: "File uploaded successfully", file:file}
}

@Delete("file/:id")
async deleteFile(@Param('id') id: string){
  const user = await this.employeesService.findOne(+id)
  if(user.photo){
    const filePath = path.join(__dirname, '..', user.photo);
    console.log("________ filename", filePath)
   try {
     if (fs.existsSync(user.photo)) {
       fs.unlinkSync(user.photo);
       return { message: 'File deleted successfully' };
     } else {
       throw new NotFoundException('File not found');
     }
   } catch (error) {
     throw new Error('Failed to delete file');
   }
 }
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