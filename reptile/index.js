const superagent = require('superagent');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


/**
 * 请求函数
 */
function reptile(url, type) {
  request(url, function (error, res, body) {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    if (!error && res.statusCode == 200) {
      const $ = cheerio.load(body)
      const $cardBlock = $('.panel')
      let arr = []

      for (let i = 0; i < $cardBlock.length; i++) {
        let obj = {}
        obj.classify = type + $('.panel-title.card').eq(i).text().trim()
        obj.icon = $('.panel-title.card i').eq(i).attr('class')

        obj.sites = []
        const length = $('.panel').eq(i).find('.card-title').length
        for (let j = 0; j < length; j++) {
          let navItem = {}
          navItem.name = $('.panel').eq(i).find('.card-title').eq(j).text().trim()
          navItem.href = $('.panel').eq(i).find('.card .card-heading').eq(j).attr('title')
          navItem.desc = $('.panel').eq(i).find('.card .card-body').eq(j).text().trim()
          navItem.logo = 'http://chuangzaoshi.com/' + $('.panel').eq(i).find('.card-icon img').eq(j).attr('src')
          obj.sites.push(navItem)
        }
        arr.push(obj)
      }
      console.log(JSON.stringify(arr))
    }
  });
}
async function main() {
  await reptile('http://chuangzaoshi.com/index','［设计］')
  await reptile('http://chuangzaoshi.com/code','［前端］')
  await reptile('http://chuangzaoshi.com/operate','［运营］')
  await reptile('http://chuangzaoshi.com/product','［产品］')
}

main()