/**
 * 사용자 관련 비즈니스 로직을 처리하는 서비스
 * 사용자 생성, 조회, 수정 등의 기능을 담당
 */

import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * 모든 사용자 목록을 조회하는 메서드
   * @returns 사용자 목록 (비밀번호 제외)
   */
  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  /**
   * 새로운 사용자를 생성하는 메서드
   * @param createUserDto 사용자 생성에 필요한 데이터 (이메일, 비밀번호, 이름)
   * @returns 생성된 사용자 정보 (비밀번호 제외)
   * @throws ConflictException 이메일이 이미 존재하는 경우
   */
  async create(createUserDto: CreateUserDto) {
    // 이메일 중복 체크
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 새로운 사용자 생성
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
      },
    });

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * 사용자를 삭제하는 메서드
   * @param id 삭제할 사용자의 ID
   * @returns 삭제된 사용자 정보 (비밀번호 제외)
   */
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

  /**
   * 사용자 정보를 수정하는 메서드
   * @param id 수정할 사용자의 ID
   * @param data 수정할 사용자 정보
   * @returns 수정된 사용자 정보 (비밀번호 제외)
   */
  async update(id: number, data: Prisma.UserUpdateInput): Promise<Omit<User, 'password'>> {
    // 비밀번호가 포함된 경우 해시화
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

  /**
   * 이메일로 사용자를 찾는 메서드
   * @param email 찾고자 하는 사용자의 이메일
   * @returns 찾은 사용자 정보 또는 null
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * ID로 사용자를 찾는 메서드
   * @param id 찾고자 하는 사용자의 ID
   * @returns 찾은 사용자 정보 또는 null
   */
  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
