import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class ResponseLoginUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  id: string;

  @ApiProperty()
  @IsBoolean()
  ok: boolean;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsString()
  token: string;
}
