import Controller from './common';

export default class CategoryController extends Controller {
  async list() {
    const { ctx } = this
    const { showInMenu = true } = ctx.query
    try {
      const params: any = {}
      if (showInMenu && showInMenu !== "false") {
        params.showInMenu = { $in: [null, true] }
      }
      let data = await ctx.model.Category.find(params).limit(100000)

      const newData = ctx.service.category.formatCategoryList(data)
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
