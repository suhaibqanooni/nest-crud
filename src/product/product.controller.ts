import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ProductValidationPipe } from './product-validation.pipe';

@ApiTags("Products")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // create(@Body() createProductDto: Prisma.ProductCreateInput) {
  //   const {title, price, category} = createProductDto
  //   if(!title || !price || !category) return {error: "You must provide all the data..."}
  //   else if(category == "LAPTOPS" || category == "PRINTERS") 
  //     return this.productService.create(createProductDto);
  //   else
  //   return {error:"please select valid data for Category"}
  // }

  @Post()
  @UsePipes(ProductValidationPipe)
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      return await this.productService.findOne(+id).then(data=>{
      if(!data)
        throw new HttpException({error: "Not Found"}, HttpStatus.BAD_REQUEST)
      return data
      })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: Prisma.ProductCreateInput) {
    const {title, price, category} = updateProductDto
    if(!title || !price || !category) return {error: "You must provide all the data..."}
    else if(category == "LAPTOPS" || category == "PRINTERS") 
      return this.productService.update(+id, updateProductDto);
    else
    return {error:"please select valid data for Category"}
  }

  // @Patch(':id')
  // @UsePipes(ProductValidationPipe) 
  // update(@Param('id') id: string, @Body() updateProductDto: Prisma.ProductCreateInput) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
