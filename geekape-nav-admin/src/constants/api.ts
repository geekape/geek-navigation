export interface Category {
  _id: string
  name: string
  parentId: string
  children: Category[]
}

export interface ApiResponse {
  code: number
  msg: string
  data: any
}
