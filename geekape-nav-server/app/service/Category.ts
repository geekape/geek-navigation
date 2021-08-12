import { Service } from 'egg';


export default class CategoryService extends Service {
  formatCategoryList(data) {
    const stairCategory = data.filter(item=> !item.categoryId)
    const secondCategory = data.filter(item=> item.categoryId)

    let newData = stairCategory.map(item=> {
      item.children = [...secondCategory.filter(cate=> item._id == cate.categoryId)]
      return item
    })

    return newData
  }
}
