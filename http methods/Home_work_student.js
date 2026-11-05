const http=require("http")
const PORT=3000
const students=[{
    id:101,
    name:"Keerthi",
    age:27,
    address:"Kochi"
},{
    id:102,
    name:"Ashtami",
    age:21,
    address:"Kollam"
}]
const server=http.createServer((req,res)=>{
    res.setHeader("Content-Type","application/json")
    //GET-Get all students
    if(req.method==="GET" && req.url==="/students"){
        res.statusCode=200;
        res.end(JSON.stringify(students))
    }
    //POST-Add a new student
    else if(req.method==="POST" && req.url==="/students"){
        let body=""
        req.on("data",(chunk)=>{
            body+=chunk;
        })
        req.on("end",()=>{
            const newStudent=JSON.parse(body);
            newStudent.id=students.length+1;
            students.push(newStudent);
            res.statusCode=201;
            res.end(JSON.stringify(newStudent))
        })
    }
    //PUT- update a student
    else if(req.method==="PUT"&&req.url.startsWith("/students/")){
        const id=Number(req.url.split("/")[2])
        let body=""
        req.on("data",(chunk)=>{
            body+=chunk;
            req.on("end",()=>{
                const updatedData=JSON.parse(body);
                const student=students.find(student=>student.id===id);
                if(!student){
                    res.statusCode=404;
                    res.end(JSON.stringify({message:"Stduent not Found"}))
                    return;
                }
               student.name=updatedData.name;
                student.age=updatedData.age;
                student.address=updatedData.address
                res.statusCode=200;
                res.end(JSON.stringify(student))
            })
        })
    }
    //DELETE
    else if(req.method==="DELETE"&&req.url.startsWith('/students/')){
        const id=Number(req.url.split('/')[2])
        const index=students.findIndex(student=>student.id==id)
        if(index===-1){
            res.statusCode=404;
            res.end(JSON.stringify({message:"Student not Found"}))
            return
        }
        const deleteStudent=students.splice(index,1);
        res.statusCode=200;
        res.end(JSON.stringify({
            message:"Student deleted successfully",
           student:deleteStudent[0]
        }))
    }
})
server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
    
})