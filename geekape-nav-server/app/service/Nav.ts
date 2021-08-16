import { Service } from 'egg';

export enum NAV_STATUS {
    pass,
    wait,
    reject
}


export default class NavService extends Service {
    async findMaxValueList(value) {
        return await this.ctx.model.Nav.find({ status: NAV_STATUS.pass }).sort({ [value]: -1 }).limit(10)
    }
}
