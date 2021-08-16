export interface CategoryModel {
  _id: string
  name: string
  parentId: string
  children: CategoryModel[]
}

export interface TagModel {
  _id: string
  name: string
}


export interface ApiResponse {
  code: number
  msg: string
  data: any
}


export enum NavStatus {
  pass,
  wait,
  reject,
}
