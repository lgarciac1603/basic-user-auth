import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto, ResponseCreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { ResponseLoginUserDto } from './dtos/login-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: ResponseCreateUserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    const user = await this.usersService.createUser(createUserDto);

    return {
      id: user.id,
      email: user.email,
      ok: true,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 201,
    description: 'User login successfully',
    type: ResponseLoginUserDto,
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ResponseLoginUserDto> {
    const user = await this.usersService.findByEmail(
      loginUserDto.email,
      loginUserDto.password,
    );

    const payload = { email: user.email, id: user.id, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload);
    return {
      id: user.id,
      ok: true,
      name: user.name,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      token,
    };
  }
}
