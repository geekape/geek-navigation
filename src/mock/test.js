import Mock from 'mockjs';//es6语法引入mock模块


var datas = Mock.mock({
    "data|3": [1,2,3]
})

console.log(datas);