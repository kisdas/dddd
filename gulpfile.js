var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');


//转换html路径位置

gulp.task('html',function(){
    gulp.src('./src/index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist'))
})
//转换js文件路径位置
gulp.task('js',function(){
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'))
})
//转换图片路径位置
gulp.task('img',function(){
    gulp.src('./src/img/*.png')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/img'))
})
gulp.task('bgm',function(){
    gulp.src('./src/bgm/*.mp3')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/bgm'))
})
//开服务器
gulp.task('server',function(){
    connect.server({
        port:8090,
        root:'./dist',
        livereload:true
    })
})
//转换less
gulp.task('less',function(){
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
})
//文件监听
gulp.task('watch',function(){
    gulp.watch('./src/index.html',['html']);
    gulp.watch('./src/css/*.less',['less']);
    gulp.watch('./src/js/*.js',['js']);
    gulp.watch('./src/img/*.png',['img']);
    gulp.watch('./src/bgm/*.mp3',['bgm'])
})
gulp.task('default',['html','server','less','js','img','bgm','watch'])