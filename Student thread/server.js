const http=require('http')
const fs=require('fs')
const { MongoClient, ObjectId } = require('mongodb')


const client=new MongoClient(
    "mongodb://127.0.0.1:27017/"
)
let students;

async function connectDb() {
    await client.connect()
    const db=client.db("studentDb")
    students=db.collection("students")
    console.log("Mongodb connected");
    
}
const server=http.createServer((req,res)=>{
    if (req.method === "GET" && req.url === "/db.css") {

    fs.readFile("./public/db.css", "utf8", (err, data) => {

        if (err) {
            res.writeHead(500)
            res.end("Error loading CSS")
            return
        }

        res.writeHead(200, {
            "Content-Type": "text/css"
        })

        res.end(data)
    })

    return
}

if(req.method==="POST" && req.url==="/students"){
    let body="";
    req.on("data",chunk=>body +=chunk)
    req.on("end",async()=>{
        const data=JSON.parse(body)
        await students.insertOne(data);
        res.end(JSON.stringify({
            message:"Student Added"
        }))
    })
return
}
//UPDATE
if(req.method==="PUT" && req.url.startsWith("/students/")){
    const id=req.url.split("/")[2];
    let body="";
    req.on("data",chunk=>body+=chunk);
    req.on("end",async()=>{
        const data=JSON.parse(body);
        await students.updateOne({
            _id:new ObjectId(id)
        },{
            $set:data
        });
        res.end(JSON.stringify({
            message:"Student updated"
        }))
    })
    return
}
  if (req.method === "DELETE" && req.url.startsWith("/students/")) {
                const id = req.url.split("/")[2];
                students.deleteOne({
                    _id: new ObjectId(id)

                }).then(() => {
                    res.end(JSON.stringify({
                        message: "Student Deleted"
                    }))
                })
                return
            }
    if(req.method==="GET" && req.url==="/students"){
        students.find().toArray().then(data=>{
            res.writeHead(200,{
                "content-type":"application/json",
            })
            res.end(JSON.stringify(data))
        })
        return
    }
    if(req.url==='/'){
        console.log("HTML requested")
        fs.readFile('./public/index.html','utf8',(err,data)=>{
            if(err){
                console.log(err);
                
                res.statusCode=500
                res.end("Error loading HTML")
                return
            }
            res.statusCode=200
            res.setHeader('Content-Type','text/html')
            res.end(data)
        })
        return
    }
   
})
connectDb().then(()=>{
server.listen(3000,()=>{
    console.log("http://localhost:3000/");
    
})
})