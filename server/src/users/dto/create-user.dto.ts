import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly userRole: 'coach' | 'user';
}
