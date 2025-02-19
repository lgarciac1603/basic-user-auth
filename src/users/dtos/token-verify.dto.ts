import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class TokenVerification {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  token: string;
}

export class ResponseTokenVerification {
  @ApiProperty()
  @IsBoolean()
  isValid: boolean;
}
