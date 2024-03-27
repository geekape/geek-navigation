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
        // 查所有导航数据
        const navList = await jianghuKnex('nav').orderBy('sort', 'desc').where('status', '!=', 0).select('*')

        // 遍历分类，给children加上导航数据
        categoryList.forEach((category) => {
            category.children = navList.filter(nav => nav.categoryId === category.categoryId)
        });

        return categoryList
    }

}

module.exports = NavService;
