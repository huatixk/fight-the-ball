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


gulp.task('serve', ['testLess'], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("./less/**/*.less", ['testLess']);
  gulp.watch("./html/**/*.html").on('change', reload);
});

gulp.task('testLess', function () {
    gulp.src('./less/**/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less({
        	plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true}));
});

//图片压缩
image = require('gulp-image');
gulp.task('image', function () {
  gulp.src('./images/**/*')
    .pipe(image())
    .pipe(gulp.dest('./dest/images'));
});



gulp.task('default',['serve']);
