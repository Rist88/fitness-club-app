import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  getPrograms() {
    return this.programRepository.find();
  }

  async getProgram(id: number) {
    const program = await this.programRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!program) {
      throw new NotFoundException(`program #${id} not found`);
    }
    return program;
  }

  addProgram(createprogramDto: CreateProgramDto) {
    const program = this.programRepository.create(createprogramDto);
    return this.programRepository.save(program);
  }

  async modifyProgram(id: number, updateProgramDto: UpdateProgramDto) {
    const program = await this.programRepository.preload({
      id: id,
      ...updateProgramDto,
    });
    if (!program) {
      throw new NotFoundException(`program #${id} not found`);
    }
    return this.programRepository.save(program);
  }

  async removeProgram(id: number) {
    const program = await this.programRepository.findOne({
      where: {
        id: id,
      },
    });
    return this.programRepository.remove(program);
  }
}
