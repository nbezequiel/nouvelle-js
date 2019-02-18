const express=require("express")
const fs=require("fs")

module.exports={
    makeLogin:function(req,resp){
        fs.readFile("./users/users.json","utf-8",(err,data)=>{
            const users=JSON.parse(data)
            const userToLogin=req.body;
            
            for(logins of users){
                if(logins.login==userToLogin.login && logins.senha==userToLogin.senha){
                    resp.send('{"access":true}')
                }
                else{
                    resp.send('{"acess":false}')
                }
            }
            
        })
        
    },
    getLastPosts:function(req,resp){
        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            const posts=JSON.parse(data)
            const postsToSend=posts.slice(0,7)
            resp.send(JSON.stringify(postsToSend))
        })
    },
    getLastPosts2:function(req,resp){
        let idReq= req.params.id
        let postsToSend=false

        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            const posts=JSON.parse(data)
            posts.forEach(item=> {
                if(item.id==parseInt(idReq)){
                    postsToSend=item
                }
            }); 
            if(postsToSend){
                resp.send(JSON.stringify(postsToSend))
            }
            else{
                resp.send('{"Error":"error"}')
            }
        })
    }
}

