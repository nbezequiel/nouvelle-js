const gulp=require("gulp")
const util=require("gulp-util")
const sequence=require("run-sequence")

require("./gulpTasks/app")
require("./gulpTasks/servidor")


//--- Se o ambiente for de produção, gera o build do APP. Se não, inicia o servidor e assiste por mudanças nos arquivos.
gulp.task("default",gulp.series((fim)=>{
    if(util.env.production){
        console.log("bbbb")
        gulp.series("app")()
    }
    else{
        gulp.series("app","servidor")()
    }
    
    fim()
}))

