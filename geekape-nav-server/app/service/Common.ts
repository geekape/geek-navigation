import { Service } from 'egg';


export default class CommonService extends Service {
  async add(data, modelName) {
    const res = await this.ctx.model[modelName].create(data);
    return res;
  }
  async remove(id, modelName) {
    const res = await this.ctx.model[modelName].remove({ _id: id });
    return res;
  }
  async update(id, data, modelName) {
    const res = await this.ctx.model[modelName].update({ _id: id }, data);
    return res;
  }
  async get(modelName) {
    console.log(this.ctx.model);
    const res = await this.ctx.model[modelName].find({});
    return res;
  }
}
