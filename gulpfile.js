const gulp=require("gulp")
const util=require("gulp-util")
const sequence=require("run-sequence")

require("./gulpTasks/app")
require("./gulpTasks/deps")
require("./gulpTasks/servidor")



gulp.task("default",gulp.series((fim)=>{
    if(util.env.production){
        console.log("bbbb")
        gulp.series("deps","app")()
    }
    else{
        gulp.series("deps","app","servidor")()
    }
    
    fim()
}))

