
// const url = require('url')
// const myUrl=url.parse('https://www.example.com/index.html')
// console.log(myUrl);
// console.log(myUrl.protocol);
// console.log(myUrl.port);
// console.log(myUrl.pathname);

// 2nd way

const myurl=new URL("https://www.example.com/index.html")
console.log(myurl.hostname);
