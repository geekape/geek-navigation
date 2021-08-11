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
  async update(data, modelName) {
      const { id } = data
      delete data.id
    const res = await this.ctx.model[modelName].update({ _id: id }, data);
    return res;
  }
  async get(id, modelName) {
    console.log(this.ctx.model);
    const res = await this.ctx.model[modelName].findOne({ _id: id });
    return res;
  }
  async getList(modelName) {
    console.log(this.ctx.model);
    const res = await this.ctx.model[modelName].find({});
    return res;
  }
  async getRandomData(randomNumber: number = 10, modelName) {
    const res = await this.ctx.model[modelName].aggregate( [ { $sample: { size: randomNumber } } ] );
    return res;
  }
}
