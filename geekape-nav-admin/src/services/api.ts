import { request } from 'umi';

export async function login(username: any, password: any) {
  return request('/api/login', {
    method: 'POST',
    data: {
      username,
      password
    }
  });
}
