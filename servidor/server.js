const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const port=8080




app.use(express.static("../build"))
app.use(bodyParser.urlencoded({extended:true}))

require("./rotas/routes")(app)



app.listen(port,()=>{
    console.log(`O servidor está funcionando na porta ${port}`)
})

