
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
    app.get("/movie/:id",middlewares.getMovieById)
    app.post("/rating",middlewares.saveRating)

}

