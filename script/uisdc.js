// 写一个爬虫，爬取https://hao.uisdc.com/ai/https://hao.uisdc.com/ai/的导航数据
// 用request,cheerio,knex,mysql, dotenv

const request = require('request');
const cheerio = require('cheerio');
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

const url = 'https://hao.uisdc.com/ai/';

// 运行步骤：
// 1. 先爬取整个页面
// 2. 解析分类，先存到数据库，返回分类id
// 3. 再根据分类取出对应的导航数据，每个导航数据加上分类id，存到数据库

request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body);
        const categoryList = [];
        const navList = [];

        let categoryId = 1000;
        let navId = 1000;

        $('.menu .menu-item').each((index, element) => {
            const category = $(element).find('.in').text().trim();
            categoryId++;
            categoryList.push({
                idSequence: categoryId,
                categoryId: `FR${categoryId}`,
                categoryName: category
            });
        });

        // 遍历分类，查页面对应块的导航数据，根据category
        categoryList.forEach((category) => {
            $('.part-cat-block-ai').each((index, parentElement) => {
                // 根据category，查下面h2>strong的文本，如果相等，就取出.c-content>.part-item-website>a的strong文本
                const navCategory = $(parentElement).find('h2 strong').text();
                console.log('navCategory:', navCategory, 'category:', category.categoryName)

                if (navCategory === category.categoryName) {

                    $(parentElement).find('.c-content .part-item-website').each((index, element) => {
                        const name = $(element).find('strong').text();
                        const url = $(element).find('a').attr('href');
                        const icon = $(element).find('img').attr('src');
                        const desc = $(element).find('.item-desc').text();
                        navId++;

                        const iconFileName = icon.substring(icon.lastIndexOf('/') + 1);

                        navList.push({
                            navId: `DH${navId}`,
                            idSequence: navId,
                            categoryId: category.categoryId,
                            navName: name,
                            navUrl: url,
                            navIcon: `/nav/public/images/nav/${iconFileName}`,
                            navDesc: desc
                        });

                        // 图片要下载到本地，图片名称截取icon文件名，以最后一个/后面的字符串为文件名
                        const iconFilePath = path.resolve(__dirname, `../app/public/images/nav/${iconFileName}`);
                        request(icon).pipe(fs.createWriteStream(iconFilePath));
                    });
                }

            });
        });

        console.log(categoryList);
        console.log(navList);

        //插入数据库
        knex('category').insert(categoryList).then(() => {
            console.log('category insert success');
        }).catch((err) => {
            console.log('category insert error', err);
        })

        knex('nav').insert(navList).then(() => {
            console.log('nav insert success');
        }).catch((err) => {
            console.log('nav insert error', err);
        })
    }
});

