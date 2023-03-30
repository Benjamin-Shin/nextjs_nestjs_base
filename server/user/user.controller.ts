import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { user } from "@prisma/client";
import { CreateUserDto } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/:id")
  async findUserById(@Param("id") id: number): Promise<user | null> {
    return await this.userService.findUserById(id);
  }

  @Get("/email/:email")
  async findUserByEmail(@Param("email") email: string): Promise<user | null> {
    return await this.userService.findUserByEmail(email);
  }

  @Get("/")
  async getList(): Promise<user[]> {
    return await this.userService.getList();
  }

  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto): Promise<user> {
    return await this.userService.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password
    });
  }

  @Post("/update/:id")
  async update(@Param("id") id: number, @Body() updateUserDto: CreateUserDto): Promise<user> {
    return await this.userService.update(id, {
      email: updateUserDto.email,
      name: updateUserDto.name
    });
  }
}