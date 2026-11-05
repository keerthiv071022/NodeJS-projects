const http=require('http')
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end('Home Page')

    }else if(req.url==='/about'){
        res.end("About Page")
    }else if(req.url==='/contact'){
        res.end("contact Page")
    }else if(req.url==='/product'){
        res.end("Product Page")
    }else if(req.url==='/FAQ'){
        res.end("FAQ Page")
    }
   else{
        res.end("Page not Found")
    }
})
server.listen(3000,()=>{
    console.log("http://localhost:3000/","Server running");
    
})