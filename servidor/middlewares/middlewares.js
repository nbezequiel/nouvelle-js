
const fs=require("fs")

module.exports={
    //--- Valida se usuário e a senha recebida condizem com o disponível no arquivo de usuários.
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
    //--- Retorna os 8 principais posts que ficaram na página principal.
    getLastPosts:function(req,resp){
        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            const posts=JSON.parse(data)
            const postsToSend=posts.slice(0,8)
            resp.send(JSON.stringify(postsToSend))
        })
    },
    //--- Retorna as informações de uma postagem a serem exibidas ao cliente
    getPostInfo:function(req,resp){
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
    },
    //--- Retorna todos os posts disponiveis de acordo com a pagina do catálogo que o usuário está navegando.
    getAllPosts:function(req,resp){
        let page= req.params.page
        let postsToSend;

        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            const posts=JSON.parse(data)
            postsToSend=posts.slice(page,page+9)
            if(postsToSend){
                resp.send(JSON.stringify(postsToSend))
            }
            else{
                resp.send('{"Error":"error"}')
            }
        })
    },
    getMainMovieSerie:function(req,resp){
        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            if(err){
                resp.send("erro")
            } else{
                posts=JSON.parse(data);
                let postsToSend=posts.slice(0,2)
                resp.send(postsToSend)
            }
        })
    },
    getPageOfMovies:function(req,resp){
        
        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            if(err){
                resp.send("erro")
            } else{
                posts=JSON.parse(data);
                let postsToSend=posts.slice(0,16)
                resp.send(postsToSend)
            }
        })
    },
    getMovieById:(req,resp)=>{
        let idI=req.params.id
        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            let posts=JSON.parse(data)
            const postsToSend=posts.filter((elem)=>elem.id==idI)
            fs.readFile("../build/description.html","utf-8",(erro,page)=>{
                resp.send(page)
            })
        })
    },
    saveRating:(req,resp)=>{
        
    }
}

