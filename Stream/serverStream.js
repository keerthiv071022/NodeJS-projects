//1.readable stream
// const fs=require('fs')
// const stream=fs.createReadStream("data.txt")
// stream.on("data",(chunk)=>{
    // console.log(chunk);
//     console.log(chunk.toString());



    
// })
//2.writable stream
// const fs=require("fs")
// const stream=fs.createWriteStream("data.txt")
// stream.write("Hello")
// stream.write("World")
// stream.end()

//3.duplex stream
// const {Duplex}=require("stream")
// const duplexStream=new Duplex({
//     //read
//     read(size){
//         this.push("Hello from Duplex stream")
//         this.push(null)
//     },
//     //write
//     write(chunk,encoding,callback){
//         console.log("Received: ",chunk.toString());
//         callback()
        
//     }
// })

// duplexStream.on("data",(chunk)=>{
//     console.log(chunk.toString());
    
// })
// duplexStream.write("Client message!")
// duplexStream.end()

//3.Transform
// const {Transform}=require("stream")
// const upperCAseTransform=new Transform({
//     transform(chunk,encoding,callback){
//         this.push(chunk.toString().toUpperCase())
//         callback()
//     }
// })
// process.stdin
// .pipe(upperCAseTransform)
// .pipe(process.stdout)


//Buffer
//1.Bufer.from
// const buf1=Buffer.from("Hello world","utf8")
// console.log(buf1);

//2.Buffer.alloc
// const buf2=Buffer.alloc(10)
// console.log(buf2);

//3.Buffer.allocUnsafe
// const buf3=Buffer.allocUnsafe(10)
// console.log(buf3);

//4.Buffer.toString
// const buf1=Buffer.from("Hello world","utf8")
// console.log(buf1.toString());

//5.Buffer.write
// const bufWrite=Buffer.alloc(20)
// bufWrite.write("Hello world",0,"utf8")
// // console.log(bufWrite);
// console.log(bufWrite.toString);

//6.buffer.slice
// const buf1=Buffer.from("Hello world","utf8")
// const subbuf=buf1.slice(0,4)
// console.log(subbuf.toString());

// const buf5=Buffer.from("hello")
// const buf6=Buffer.from("World")
// const combinedBuf=Buffer.concat([buf1,buf2])
// console.log(combinedBuf.toString());

