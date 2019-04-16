
const middlewares=require("../middlewares/middlewares")

const fs=require("fs")

//--- Rotas disponibilizadas pela API.
module.exports=function(app){
    app.post("/makelogin",middlewares.makeLogin),
    app.get("/lastposts",middlewares.getLastPosts),
    app.get("/lastposts/:id",middlewares.getPostInfo),
    app.get("/allposts/:page",middlewares.getAllPosts),
    app.get("/mainmovieserie",middlewares.getMainMovieSerie)
    app.get("/getPage/:pagina",middlewares.getPageOfMovies)
    app.get("/movie/:id",(req,resp)=>{
        let idI=req.params.id
        fs.readFile("./posts/posts.json","utf-8",(err,data)=>{
            let posts=JSON.parse(data)
            const postsToSend=posts.filter((elem)=>elem.id==idI)
            fs.readFile("../build/description.html","utf-8",(erro,page)=>{
                resp.send(page)
            })
        })
    })

}

