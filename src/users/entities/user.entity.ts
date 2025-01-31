import { hash } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  lastname: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ unique: true })
  @ApiProperty()
  isActive: boolean;

  @Column({ unique: true })
  @ApiProperty()
  isAdmin: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
