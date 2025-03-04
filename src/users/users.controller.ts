import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UserAuthGuard } from './guards/user.guard';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { ResponseLoginUserDto } from './dtos/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, ResponseCreateUserDto } from './dtos/create-user.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ResponseTokenVerification,
  TokenVerification,
} from './dtos/token-verify.dto';
import { DeleteUserDto, ResponseDeleteUserDto } from './dtos/delete-user.dto';

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

  @Post('token')
  @ApiOperation({ summary: 'Token validation' })
  @ApiResponse({
    status: 201,
    description: 'Token validation',
    type: ResponseTokenVerification,
  })
  async tokenValidation(
    @Body() tokenVerification: TokenVerification,
  ): Promise<ResponseTokenVerification> {
    try {
      const { id, token } = tokenVerification;
      const user = await this.usersService.findOne(id);

      if (user) {
        const result = this.jwtService.verify(token);
        if (result) {
          return {
            isValid: true,
          };
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Not valid token');
    }
  }

  @Delete()
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({
    status: 201,
    description: 'Delete user',
    type: ResponseDeleteUserDto,
  })
  async deleteUser(
    @Body() deleteUser: DeleteUserDto,
  ): Promise<ResponseDeleteUserDto> {
    const { email, password } = deleteUser;
    console.log(email, password);

    if (!email || !password) {
      throw new BadRequestException('Request error');
    }

    const { id } = await this.usersService.findByEmail(email, password);
    const response = await this.usersService.remove(id);

    console.log(response);
    return { ok: true, code: 201 };
  }
}
