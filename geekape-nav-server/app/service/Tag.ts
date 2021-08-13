import { Service } from 'egg';


export default class TagService extends Service {
  async addMultiTag(tags) {
    if (!Array.isArray(tags)) return

    try {
      const tagData = tags.map(item=> {
        return {
          name: item
        }
      })
      const res = await this.ctx.model.Tag.insertMany(tagData, { ordered: false })
      return res
    } catch (err) {
      return err
    }
  }
}
