import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    description: 'ID único del usuario',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'Success flag indicator',
    example: 'true',
  })
  ok: boolean;
}
