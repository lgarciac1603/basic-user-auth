import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class ResponseDeleteUserDto {
  @ApiProperty()
  @IsBoolean()
  ok: boolean;

  @ApiProperty()
  @IsNumber()
  code: number;
}
