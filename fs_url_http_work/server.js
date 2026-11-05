const http=require('http')
const fs=require('fs')
const url=require('url')

const server=http.createServer((req,res)=>{
    const parsedUrl=url.parse(req.url);
    if(parsedUrl.pathname==="/"){
        fs.readFile("home.html",(err, data)=>{
            if(err){
                res.writeHead(500);
                res.end("Server Error")
                return;
            }
            res.writeHead(200,{
                "content-type":"text/html"
            })
            res.end(data)
        })
    }
    else if(parsedUrl.pathname==="/about"){
        fs.readFile("about.html",(err,data)=>{
             if(err){
                res.writeHead(500);
                res.end("Server Error")
                return;
            }
            res.writeHead(200,{
                "content-type":"text/html"
            })
            res.end(data)
        })
    }else{
        fs.readFile("error.html",(err,data)=>
             {
                res.writeHead(404,{"content-type":"text/html"
                });
                 res.end(data)
            })
        }
    })
    server.listen(3000,()=>{
        console.log("server running on port 3000");
    })
