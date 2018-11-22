var fs = require('fs');


//通过传回来的页数，进行分页模拟
function pagination(p,s){
    //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
    fs.readFile('./data.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来
        //console.log(person.data);
        var length = person.data.length;
        var pagePerson = person.data.slice(s*p,(p+1)*s);
        console.log('------------------------查询成功pagePerson');
        console.log(pagePerson);
    })
}
console.log(pagination(0,6));//查询第一页，每页的数据条数为6条
