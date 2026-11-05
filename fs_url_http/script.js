const fs=require('fs')
const url=require('url')
const http=require('http')

const server=http.createServer((req,res)=>{
    let newUrl=url.parse(req.url)

    if(newUrl.pathname==='/'){
        fs.readFile('index.html',(err,data)=>{
            if(err){
                res.end("File not Found")
            }else{
                res.write(data)
                res.end()
            }
            res.end()
        })
        }
    })
    server.listen(3000,()=>{
        console.log("server running");
        
    })
