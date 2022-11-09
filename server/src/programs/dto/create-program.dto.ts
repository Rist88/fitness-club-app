import { IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
