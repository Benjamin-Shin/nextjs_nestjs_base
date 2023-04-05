import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({description: '이메일', required: true })
    email: string;
    @ApiProperty({description: '이름', required: true })
    name: string;
    @ApiProperty({description: '암호', required: true })
    password: string;
}

export class UpdateUserDto {
    @ApiProperty({description: '이메일', required: false })
    email?: string;
    @ApiProperty({description: '이름', required: false })
    name?: string;
}

export class LoginUserDto {
    @ApiProperty({description: '이메일', required: true })
    email: string;
    @ApiProperty({description: '암호', required: true })
    password: string;
}

export class LoginUserResultDto {
    @ApiProperty({description: '아이디', required: true })
    id: number;
    @ApiProperty({description: '이메일', required: true })
    email: string;
    @ApiProperty({description: '이름', required: true })
    name: string;
    @ApiProperty({description: '결과', required: true })
    resultIdx: number;
    @ApiProperty({description: '결과메시지', required: true })
    result: string;
}