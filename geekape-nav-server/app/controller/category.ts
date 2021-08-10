import Controller from './common';

export default class CategoryController extends Controller {
  async list() {
    const { ctx } = this
    try {
      let data = await ctx.model.Category.find({}).limit(100000)
      const stairCategory = data.filter(item=> !item.categoryId)
      const secondCategory = data.filter(item=> item.categoryId)

      let newData = stairCategory.map(item=> {
        item.children = [...secondCategory.filter(cate=> item._id == cate.categoryId)]
        return item
      })
      this.success(newData)
    } catch (error) {
      this.error(error.message)
    }
  }
  async add() {
    const { ctx } = this
    let data = await ctx.service.common.add(ctx.request.body, 'Category');
    this.success(data)
  }

  async edit() {
    const { ctx } = this
    const { id } = ctx.request.body;
    let data = await ctx.service.common.update(ctx.request.body, 'Category');
    this.success(data)
  }

  async del() {
    const { ctx } = this
    try {
      const { id } = ctx.request.body
      const data = await Promise.all([
        ctx.model.Category.remove({ _id: id }),
        ctx.model.Category.remove({ categoryId: id }),
      ])
      this.success(data)
    } catch (error) {
      this.error(error.message)
    }
  }
}
