import { Service } from 'egg';


export default class NavService extends Service {
    async findMaxValueList(value) {
        return await this.ctx.model.Nav.find().sort({ [value]: -1 }).limit(10)
    }
}
