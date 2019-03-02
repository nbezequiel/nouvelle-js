
const middlewares=require("../middlewares/middlewares")


//--- Rotas disponibilizadas pela API.
module.exports=function(app){
    app.post("/makelogin",middlewares.makeLogin),
    app.get("/lastposts",middlewares.getLastPosts),
    app.get("/lastposts/:id",middlewares.getPostInfo),
    app.get("/allposts/:page",middlewares.getAllPosts)
}

