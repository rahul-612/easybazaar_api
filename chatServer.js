const express=require("express");
const cors=require("cors");
const socketIO=require("socket.io");

const app=express();


app.use(cors());        //cors is used for inter communication between url

const chatServer=(server)=>{

const users=[{}];


// circuit of IO
const io=socketIO(server);

// yani jab bhi socket connect hoga to ky krna ha server me
io.on("connection",(socket)=>{
    // console.log("New Connection");

    // chat.jsx se jo data aa rha h 
    socket.on('joined',({user})=>{
          users[socket.id]=user;
          // console.log(`${user} has joined `);

        //   broadcast ka mtlb jisne join kiya h usko chor k sbke pss message chle jayega
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});

        //   emit yeha bhi to hum data bhj rhe client ko aur ye data kvl jisne login kiya h usi ko dikhega to chat.jsx me hum socket.on('welcome') se data access kr lege
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        // yani pure circuit ko bhj dege
        io.emit('sendMessage',{user:users[id],message,id});
    })

    // yani jab disconnect ho
    socket.on('disconnect',()=>{
        // jisne chora uske alawa sbki bta rhe aur socket.id har user ki alg hoti h aur ye socket object m hoti h
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});
        // console.log(`user left`);
    })
});

}


module.exports=chatServer;