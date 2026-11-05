const http=require('http')
//syntax
//http.createServer((req,res)=>{
    
// })

// const server=http.createServer((req,res)=>{
//     // res.write('hello nodejs')
//     res.write('<h1>Hello NodeJs</h1>')
//     res.end()
// })

// server.listen(3000,()=>{
//     console.log('server running');
    
// })


//basic routing
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end('Home Page')

    }else if(req.url==='/about'){
        res.end("About Page")
    }else if(req.url==='/contact'){
        res.end("contact Page")
    }else if(req.url==='/product'){
        res.end("Product Page")
    }else{
        res.end("Page not Found")
    }
})
server.listen(3000,()=>{
    console.log("Server running");
    
})