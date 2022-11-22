import { httpGet } from '../config/axiosConfig';
import { BASE_URL } from '../config/constants';

// needs to be async?
// it's better to define return type here? like 'Promise<Program[]>'
export const getPrograms = () => {
  return httpGet(`${BASE_URL}/programs`);
};

// fetch example implementation
// export const getPrograms = async (): Promise<Program[]> => fetch(`${BASE_URL}`).then(res => res.json());
