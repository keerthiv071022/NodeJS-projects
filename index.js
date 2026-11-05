const fs=require('fs')

// fs.mkdir('myFolder',(err)=>{
//     if(err){
//         console.log(err);
        
//     }
//     else{
//         console.log('Folder created');
        
//     }
// })

// fs.writeFile('myFolder/text.txt','welcome to node js',(err)=>{
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log("file create add content successfully");
        
//     }
// })

// try{
//     fs.writeFileSync('newFile','new content added')
//     console.log('success');
    
// }catch(err){
//     console.log(err);
    
// }

// fs.readFile('myFolder/text.txt','utf8',(err,data)=>{
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log(data);
        
//     }
// })

// try{
//     const data=fs.readFileSync('myFolder/text.txt','utf8')
//     console.log(data);
    
// }catch(err){
//     console.log(err);
    
// }

// fs.appendFile('myFolder/text.txt','\nNew content added',(err)=>{
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log("success");
        
//     }
// })

// try{fs.appendFileSync('myFolder/text.txt','\nNew content added again using async')
//     console.log('success');
    
// }catch(err){
//     console.log(err);
    
// }

// if(fs.existsSync('myFolder')){
//     console.log('file exist');
    
// }else{
//     console.log('file not found');
    
// }

// fs.unlink('newFile',(err)=>{
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log("File deleted successfully");
        
//     }
// })

fs.rmdir('new',(err)=>{
    if(err){console.log(err);
    }
    else{
        console.log('success');
        

    }
})