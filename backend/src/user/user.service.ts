import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    // 이메일 중복 체크
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    if (!data.password || data.password.length < 6) {
      throw new BadRequestException('비밀번호는 최소 6자 이상이어야 합니다.');
    }

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('회원가입 처리 중 오류가 발생했습니다.');
    }
  }

  async remove(id: number): Promise<Omit<User, 'password'>> {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    }) as Promise<Omit<User, 'password'>>;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<Omit<User, 'password'>> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password as string, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    }) as Promise<Omit<User, 'password'>>;
  }

  // user.service.ts

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }
  
}
