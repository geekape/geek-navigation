import { request } from 'umi';

export async function login(data: { username: string, password: string }) {
  return request('/api/login', {
    method: 'POST',
    data,
  });
}
