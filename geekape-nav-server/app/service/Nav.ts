import { Service } from 'egg';


export default class NavService extends Service {
  async findName(keyword) {
    let reg = new RegExp(keyword,'i');
    const res = await this.ctx.model.Nav.find({name: { $regex: reg }})
    return res
  }
}
