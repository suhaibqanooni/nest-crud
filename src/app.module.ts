import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [DatabaseModule, ProductModule, UserModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
