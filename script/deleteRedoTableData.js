//删除数据库中，某一个表的，某一个字段的重复数据
//可以定义哪个表，哪个字段，哪个字段的值重复，删除哪个字段的值重复的数据


const path = require('path');
const fs = require('fs');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'geek_nav'
    }
});

const tableName = 'nav';
const fieldName = 'navName';

(async () => {
    const repeatList = await knex(tableName)
        .select(fieldName)
        .groupBy(fieldName)
        .havingRaw('count(*) > 1');

    for (let i = 0; i < repeatList.length; i++) {
        const repeatItem = repeatList[i];
        const repeatValue = repeatItem[fieldName];

        const deleteList = await knex(tableName)
            .select('id')
            .where(fieldName, repeatValue)
            .orderBy('id', 'desc')
            .limit(999999);

        for (let j = 1; j < deleteList.length; j++) {
            const deleteItem = deleteList[j];
            await knex(tableName)
                .where('id', deleteItem.id)
                .del();
        }
    }

    console.log('删除重复数据成功');
    process.exit();
})();