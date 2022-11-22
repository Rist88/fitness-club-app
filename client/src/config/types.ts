import { AxiosRequestConfig } from 'axios';

export type RequestTypeWithData = [url: string, data?: unknown, config?: AxiosRequestConfig<unknown> | undefined];
export type RequestTypeWithoutData = [url: string, config?: AxiosRequestConfig<unknown> | undefined];

// Data entities
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
