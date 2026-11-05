
const http=require('http');
const server=http.createServer((req,res)=>{
    if(req.url==='/'&& req.method==='GET'){
        res.writeHead(200,{contentType:'text/html'});
        res.write(`<h1>Student Management System</h1>
            <p>Welcome to my Node.js app!</p>;
            <a href='/students'>View students</a>`);
            res.end();
    }
else if(req.url==='/students'&& req.method==='GET'){
     res.writeHead(200,{contentType:'text/html'});
    res.write(`
        <h1>Student List</h1>
        <ul>
        <li>John-computer science</li>
        <li>Alice-Science</li>
        <li>jane- Commerce</li>
        </ul>
        <a href="/">Back to Home</a>
        `)
        res.end()
}
else{
    res.writeHead(404,{contentType:'text/html'})
    res.write(`<h1>Page Not Found</h1>`)
    res.end()
}

});

server.listen(3000,()=>{
    console.log("server running at http://localhost:3000");
    
})

