/**
 * 사용자 모듈
 * 사용자 관련 기능을 모듈화하여 관리 (사용자 CRUD 작업)
 */

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
