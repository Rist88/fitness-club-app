import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Program } from './entities/program.entity';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';

@Module({
  exports: [ProgramsService],
  imports: [TypeOrmModule.forFeature([Program, User])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
