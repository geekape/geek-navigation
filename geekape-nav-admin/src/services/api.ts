import request from "@/utils/request";

export const API_LOGIN = '/api/login'
export const API_NAV_LIST = '/api/nav/list'
export const API_NAV = '/api/nav'
export const API_NAV_AUDIT = '/api/nav/audit'
export const API_CATEGORY_LIST = '/api/category/list'
export const API_CATEGORY = '/api/category'
export const API_TAG = '/api/tag'
export const API_TAG_list = '/api/tag/list'

export async function login(data: { username: string, password: string }) {
  return request({
    url: API_LOGIN,
    method: 'POST',
    data,
  });
}

export async function getNavList(data: any) {
  return request({
    url: API_NAV_LIST,
    method: 'GET',
    data
  });
}
