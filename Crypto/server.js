const crypto=require('crypto')
// const hash=crypto.createHash('sha256').update('hello world').digest('hex')
// console.log(hash);

//how to hash a password
// const password="mypassword"
// const hashedpassword=crypto.createHash('sha256').update('password').digest('hex')
// console.log('Password: ',password);
// console.log('Hashed Password: ',hashedpassword);

//how to compare a password
// function hashPassword(password){
//     return crypto.createHash('sha256').update(password).digest('hex')

// }
// const password="hello123"
// let storedPassword=hashPassword(password)

// let loginPassword="hello12"
// if(hashPassword(loginPassword)===storedPassword){
//     console.log("Login  successful");
    
// }
// else{
//     console.log("Wrong password");
    
// }
//decrypt and encrypt using different algorithms
const algorithm="aes-256-cbc"
const key=crypto.randomBytes(32)
// console.log(key);

const iv=crypto.randomBytes(16)
// console.log(iv);


function encrypt(password){
    const cipher=crypto.createCipheriv(algorithm,key,iv)
    let encrypted=cipher.update(password,'utf8','hex')
    encrypted=cipher.final('hex')
    return encrypted
}

function decrypt(encryptedPassword){
    const decipher=crypto.createDecipheriv(algorithm,key,iv)
    let decrypted=decipher.update(encryptedPassword,'hex','utf8')
    decrypted=decipher.final('utf8')
    return decrypted
}
const password="mypassword123"
const encryptedpassword=encrypt(password)

console.log("Original Password: ",password);
console.log("Encrypted Password: ",encryptedpassword);
const decryptedPassword=decrypt(encryptedpassword)
console.log("Decrypted password: ",decryptedPassword);





