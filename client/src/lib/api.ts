import { httpGet } from '../config/axiosConfig';

const BASE_URL = 'http://localhost:5000/programs';

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  subscriptions?: Program[];
  userRole: 'coach' | 'user';
}

export interface Program {
  id: number;
  name: string;
  description: string;
  subscribers: User[];
}

export const getPrograms = async (): Promise<Program[]> => {
  // todo: resolve correct 'any' type
  const programs: any = await httpGet(`${BASE_URL}`);

  return programs;
};

// fetch implementation
// export const getPrograms = async (): Promise<Program[]> => fetch(`${BASE_URL}`).then(res => res.json());
