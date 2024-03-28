'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const axios = require('axios');
const actionDataScheme = Object.freeze({

});

class NavService extends Service {
    // 返回首页导航分类和导航的数据
    async getHomePageData(actionData) {
        const { knex, jianghuKnex } = this.ctx.app
        const { categoryId ="ai" } = actionData

        // 查分类数据，以parentId为categoryId，按sort排序，按status过滤掉0的数据
        const categoryList = await jianghuKnex('category').where({ parentId: categoryId }).orderBy('sort', 'desc').where('status', '!=', 0).select('*')
        // 查categoryId包含categoryList中categoryId的导航数据，按sort排序，按status过滤掉0的数据
        const navList = await jianghuKnex('nav').whereIn('categoryId', categoryList.map(category => category.categoryId)).orderBy('sort', 'desc').where('status', '!=', 0).select('*')


        // 遍历分类，给children加上导航数据
        categoryList.forEach((category) => {
            category.children = navList.filter(nav => nav.categoryId === category.categoryId)
        });

        // 在第一个分类前面加上一个热门推荐分类，取导航tags有热门的数据
        const hotNavList = navList.filter(nav => nav.tags && nav.tags.includes('热门'))
        categoryList.unshift({
            categoryName: '热门推荐',
            categoryIcon: 'ico icon-icon-group-hot',
            children: hotNavList
        })

        return categoryList
    }

}

module.exports = NavService;
