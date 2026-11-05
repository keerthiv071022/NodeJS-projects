const http=require("http")
const PORT=3000
const books=[{
    id:1,
    title:"Harry Potter",
    author:"J.K. Rowling"
},{
    id:2,
    title:"The Alchemist",
    author:"Paulo coelho"
}]
const server=http.createServer((req,res)=>{
    res.setHeader("Content-Type","application/json")
    //GET-Get all books
    if(req.method==="GET" && req.url==="/books"){
        res.statusCode=200;
        res.end(JSON.stringify(books))
    }
    //POST-Add a new book
    else if(req.method==="POST" && req.url==="/books"){
        let body=""
        req.on("data",(chunk)=>{
            body+=chunk;
        })
        req.on("end",()=>{
            const newBook=JSON.parse(body);
            newBook.id=books.length+1;
            books.push(newBook);
            res.statusCode=201;
            res.end(JSON.stringify(newBook))
        })
    }
    //PUT- update a book
    else if(req.method==="PUT"&&req.url.startsWith("/books/")){
        const id=Number(req.url.split("/")[2])
        let body=""
        req.on("data",(chunk)=>{
            body+=chunk;
            req.on("end",()=>{
                const updatedData=JSON.parse(body);
                const book=books.find(book=>book.id===id);
                if(!book){
                    res.statusCode=404;
                    res.end(JSON.stringify({message:"Book not Found"}))
                    return;
                }
                book.title=updatedData.title;
                book.auhtor=updatedData.author;
                res.statusCode=200;
                res.end(JSON.stringify(book))
            })
        })
    }
    else if(req.method==="DELETE"&&req.url.startsWith('/books/')){
        const id=Number(req.url.split('/')[2])
        const index=books.findIndex(book=>book.id==id)
        if(index===-1){
            res.statusCode=404;
            res.end(JSON.stringify({message:"Book not Found"}))
            return
        }
        const deleteBook=books.splice(index,1);
        res.statusCode=200;
        res.end(JSON.stringify({
            message:"Book deleted successfully",
            book:deleteBook[0]
        }))
    }
    else{
        res.statusCode=404;
        res.end(JSON.stringify({
            message:"Route not Found"
        }))
    }
})
server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
    
})