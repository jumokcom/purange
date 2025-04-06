import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // ✅ Prisma 모듈 가져오기
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule
  ], // ✅ PrismaModule 등록
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
