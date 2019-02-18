const gulp=require("gulp")
const watch=require("gulp-watch")
const webserver=require("gulp-webserver")



gulp.task("monitora",gulp.series((fim)=>{
    watch("src/**/*.html",gulp.series("html"))
    watch("src/assets/**/*.scss",gulp.series("css"))
    watch("src/**/*.js",gulp.series("js"))
    watch("src/assets/imgs/**/*.*",gulp.series("imgs"))
    fim()
}))

gulp.task("servidor",gulp.series("monitora",(fim)=>{
    gulp.src("build")
        .pipe(webserver({livereload:true,port:8080,open:true}))
    fim()
}))