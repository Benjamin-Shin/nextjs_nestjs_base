import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/server/prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./user.entity";
import bcryptjs from "bcryptjs";

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async findUserById(id: number) {
    return await this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getList() {
    return await this.db.user.findMany();
  }

  async create(data: CreateUserDto) {
    // Password를 hash로 변환
    let hashedPassword = await bcryptjs.hash(data.password, 12);
    data.password = Buffer.from(hashedPassword, "utf8").toString('base64');

    return await this.db.user.create({
      data
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.db.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return await this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async login(email: string) {
    return await this.db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
  }
}