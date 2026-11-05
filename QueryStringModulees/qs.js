// fetch('https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1,key2,key3');
const qs=require('querystring')
const query='limit=10&skip=5&select=key1,key2,key3'
const parsedQuery=qs.parse(query)
console.log(parsedQuery);
console.log(parsedQuery.limit);

const obj={limit:10,skip:5,select:'title,price'}
console.log(obj);
const stringData=qs.stringify(obj)
console.log(stringData);


