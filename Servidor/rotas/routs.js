
const middlewares=require("../middlewares/middlewares")

module.exports=function(app){
    app.post("/makelogin",middlewares.makeLogin),
    app.get("/lastposts",middlewares.getLastPosts),
    app.get("/lastposts/:id",middlewares.getLastPosts2),
    app.get("/lastposts/:page",middlewares.getAllPosts)
}

