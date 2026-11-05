// const os=require('os')
// console.log("Architecture: ",os.arch());
// console.log("cpus: ",os.cpus());
// console.log("freeMemory: ",os.freemem());
// console.log("Home Directory: ",os.homedir());
// console.log("Host NAme: ",os.hostname());
// console.log("Platform: ",os.platform());
// console.log("Release: ",os.release());

// console.log("TotalMemrory: ",os.totalmem());
// console.log("upTime: ",os.uptime());
// console.log("OS Type: ",os.type());

// const EventEmitter=require('events')
// const event=new EventEmitter();

// event.on('greet',()=>{
//     console.log("Hello welcome to NOde.js");
    
// })

// event.emit('greet');


// passing values into parameters
// const EventEmitter=require('events')
// const event=new EventEmitter();

// event.on('greet',(name)=>{
//     console.log("Hello",name);
    
// })

// event.emit('greet','Keerthi');

//passing multiple values
// const EventEmitter=require('events')
// const event=new EventEmitter();
// event.on("student",(name,age)=>{
//     console.log("Name: ",name);
//     console.log("Age: ",age);
// })
// event.emit("student","Keerthi",27)


//same vent multiple listeners
// const EventEmitter=require('events')
// const event=new EventEmitter();

// event.on("message",()=>{
//     console.log("Listener 1");
// })
// event.on("message",()=>{
//     console.log("Listener 2");
// })
// event.emit("message")

//Once...event will listen only once
// const EventEmitter=require('events')
// const event=new EventEmitter();

// event.once("login",()=>{
//     console.log("User logged in");
    
// })
// event.emit("login")
// event.emit("login")
// event.emit("login")

//remover event Listener
//  const EventEmitter=require('events')
// const event=new EventEmitter();

// function welcome(){
//     console.log("welcome");
    
// }
// event.on("greet",welcome)
// event.emit("greet")
// event.removeListener("greet",welcome)
// event.emit("greet")

//removeAllListerners
// const EventEmitter = require("events");
// const event = new EventEmitter();
// event.on("message", () => {
//     console.log("Message Listener 1");
// });
// event.on("message", () => {
//     console.log("Message Listener 2");
// });
// event.removeAllListeners("message");
// event.emit("message")

//ListernerCount
// const EventEmitter = require("events");

// const event = new EventEmitter();event.on("login", () => {
//     console.log("Login 1");
// });

// event.on("login", () => {
//     console.log("Login 2");
// });

// console.log(event.listenerCount("login"));

// rel-life eample-ordertracking
const EventEmitter = require("events");
const order = new EventEmitter();

order.on("placed", (orderId) => {
    console.log("Order Placed:", orderId);
});

order.on("payment", (orderId) => {
    console.log("Payment Completed:", orderId);
});

order.on("shipped", (orderId) => {
    console.log("Order Shipped:", orderId);
});

order.on("delivered", (orderId) => {
    console.log("Order Delivered:", orderId);
});

order.emit("placed", 101);
order.emit("payment", 101);
order.emit("shipped", 101);
order.emit("delivered", 101);