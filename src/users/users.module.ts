import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[DatabaseModule, JwtModule.register({secret: 'asdf1234zxvc5678qwer'})],
  controllers: [UsersController],
  providers: [UserService],
})


export class UserModule {}
