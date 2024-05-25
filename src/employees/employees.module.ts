import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[DatabaseModule, JwtModule.register({secret: 'asdf1234zxvc5678qwer'})],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})


export class EmployeesModule {}
