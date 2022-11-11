import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgramDto } from './dto/create-program.dto';
import { Program } from './entities/program.entity';
import { ProgramsService } from './programs.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

describe('ProgramsService', () => {
  let service: ProgramsService;
  let programRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramsService,
        {
          provide: getRepositoryToken(Program),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProgramsService>(ProgramsService);
    programRepository = module.get<MockRepository>(getRepositoryToken(Program));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProgram', () => {
    describe('when program with ID exists', () => {
      it('should return the program object', async () => {
        const programId = 1;
        const expectedProgram = { data: 'someData' };

        programRepository.findOne.mockReturnValue(expectedProgram);
        const serviceGetProgramSpy = jest.spyOn(service, 'getProgram');

        const program = await service.getProgram(programId);

        expect(serviceGetProgramSpy).toHaveBeenCalledWith(programId);
        expect(program).toEqual(expectedProgram);
      });
    });
    describe('absent program behaviour', () => {
      it('should throw the "NotFoundException"', async () => {
        const programId = 66;
        programRepository.findOne.mockReturnValue(undefined);

        try {
          await service.getProgram(programId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('getPrograms', () => {
    describe('repository.find() invoked when handler called', () => {
      it('should return the programs data', async () => {
        const expectedPrograms = { data: 'someData' };

        programRepository.find.mockReturnValue(expectedPrograms);
        const programs = service.getPrograms();
        expect(programs).toEqual(expectedPrograms);
      });
    });
  });

  describe('addProgram', () => {
    describe('send program data', () => {
      it('repository.save() invoked when called with program data', async () => {
        const dto: CreateProgramDto = {
          name: 'ProgramName',
          description: 'Test description',
        };

        const programRepositoryCreateSpy = jest.spyOn(
          programRepository,
          'create',
        );
        const programRepositorySaveSpy = jest.spyOn(programRepository, 'save');

        programRepository.save.mockReturnValue({});
        service.addProgram(dto);

        expect(programRepositoryCreateSpy).toBeCalledWith(dto);
        expect(programRepositorySaveSpy).toBeCalled();
      });
    });
  });
});
