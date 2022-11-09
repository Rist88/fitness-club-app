import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  // This request returns all programs
  @Get()
  getPrograms() {
    return this.programsService.getPrograms();
  }

  // This request returns single program with particular id
  @Get(':id')
  getProgram(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.getProgram(id);
  }

  // This request creates new program
  @Post()
  createProgram(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.addProgram(createProgramDto);
  }

  // This request modifies data of particular program
  @Patch(':id')
  modifyProgramData(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.programsService.modifyProgram(id, body);
  }

  // This request removes program with particular id
  @Delete(':id')
  deleteProgram(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.removeProgram(id);
  }
}
