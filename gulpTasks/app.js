const gulp=require("gulp")
const htmlmin=require("gulp-htmlmin")
const sass=require("gulp-sass")
const uglifycss=require('gulp-uglifycss')
const concat=require("gulp-concat")
const babel=require("gulp-babel")
const uglify=require("gulp-uglify")



gulp.task("html",()=>{
    return gulp.src("src/**/*.html")
        //.pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest("build"))
})

gulp.task("css",()=>{
    return gulp.src("src/assets/scss/*.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(uglifycss({"uglyComments":true}))
        .pipe(concat("style.css"))
        .pipe(gulp.dest("build/assets/css"))
})



gulp.task("js",()=>{

    return gulp.src("src/assets/js/*.js")
        .pipe(babel({comments:false,presets:["env"]}))
        //.pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(gulp.dest("build/assets/js"))
})



gulp.task("imgs",()=>{
    return gulp.src("src/assets/imgs/*.*")
        .pipe(gulp.dest("build/assets/imgs"))
})


gulp.task("app",gulp.series("html","css","js","imgs"))