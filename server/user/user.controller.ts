import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { user } from "@prisma/client";
import { CreateUserDto } from "./user.entity";
import { UserService } from "./user.service";

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')  // Swagger에 Tag를 생성
@Controller("api/user")  // main.ts에서 api를 전역으로 한 걸 주석처리해서 여기서 처리
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: '사용자 조회' })  // Swagger에 API를 생성
  @Get("/:id")
  async findUserById(@Param("id") id: number): Promise<user | null> {
    return await this.userService.findUserById(id);
  }

  @ApiOperation({ summary: '사용자 이메일로 조회' })  // Swagger에 API를 생성
  @Get("/email/:email")
  async findUserByEmail(@Param("email") email: string): Promise<user | null> {
    return await this.userService.findUserByEmail(email);
  }

  @ApiOperation({ summary: '사용자 목록 조회' })  // Swagger에 API를 생성
  @Get("/")
  async getList(): Promise<user[]> {
    return await this.userService.getList();
  }

  @ApiOperation({ summary: '사용자 생성' })  // Swagger에 API를 생성
  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto): Promise<user> {
    return await this.userService.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password
    });
  }

  @ApiOperation({ summary: '사용자 수정' })  // Swagger에 API를 생성
  @Post("/update/:id")
  async update(@Param("id") id: number, @Body() updateUserDto: CreateUserDto): Promise<user> {
    return await this.userService.update(id, {
      email: updateUserDto.email,
      name: updateUserDto.name});
  }
}