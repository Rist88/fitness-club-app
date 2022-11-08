import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/programs/entities/program.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Program])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
