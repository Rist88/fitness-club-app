import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    describe('when user with ID exists', () => {
      it('should return the user object', async () => {
        const userId = 66;
        const expectedUser = { data: 'someData' };

        userRepository.findOne.mockReturnValue(expectedUser);
        const serviceGetUserSpy = jest.spyOn(service, 'getUser');

        const user = await service.getUser(userId);

        expect(serviceGetUserSpy).toHaveBeenCalledWith(userId);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('absent user behaviour', () => {
      it('should throw the "NotFoundException"', async () => {
        const userId = 66;
        userRepository.findOne.mockReturnValue(undefined);

        try {
          await service.getUser(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('getUsers', () => {
    describe('repository.find() invoked when handler called', () => {
      it('should return the users data', async () => {
        const expectedUsers = { data: 'someData' };

        userRepository.find.mockReturnValue(expectedUsers);
        const users = service.getUsers();
        expect(users).toEqual(expectedUsers);
      });
    });
  });

  describe('addUser', () => {
    describe('send user data', () => {
      it('repository.save() invoked when called with user data', async () => {
        const dto: CreateUserDto = {
          name: 'SomenameAwesomeGuyCheck4',
          lastName: 'FineSurname',
          email: 'mailsome@somemail.com',
          userRole: 'user',
        };

        const userRepositoryCreateSpy = jest.spyOn(userRepository, 'create');
        const userRepositorySaveSpy = jest.spyOn(userRepository, 'save');

        userRepository.save.mockReturnValue({});
        service.addUser(dto);

        expect(userRepositoryCreateSpy).toBeCalledWith(dto);
        expect(userRepositorySaveSpy).toBeCalled();
      });
    });
  });
});
