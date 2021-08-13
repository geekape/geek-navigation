import Controller from '../core/base_controller';

export default class CategoryController extends Controller {
    tableName(): string {
        return 'Tag';
    }

    async getList() {
        await super.getList()
    }
}
