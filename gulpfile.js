_hostName="localhost:"
var gulp = require('gulp'),
    less = require('gulp-less');

    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

    //自动加上 css3 前缀
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({
    browsers: ["last 5 versions"],
    cascade: true
});

//热加载
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var concat = require('gulp-concat');
//- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');
//- 压缩CSS为一行；
var rev = require('gulp-rev');
//- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');
//- 路径替换



gulp.task('less', function () {
    gulp.src('./src/less/**/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less({
        	plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({stream: true}));
});


gulp.task('serve', ['less'], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("./src/less/**/*.less", ['less']);
  gulp.watch("./src/html/**/*.html").on('change', reload);
});




//图片压缩
image = require('gulp-image');
gulp.task('img', function () {
  gulp.src('./src/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img'));
});



//html代码压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('minify', function() {
  return gulp.src('src/html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/html'));
});


gulp.task('default',['serve','minify']);
