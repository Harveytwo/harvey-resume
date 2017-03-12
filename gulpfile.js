var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');//css浏览器前缀补充
var minifycss = require('gulp-minify-css');//css压缩
var uglify = require('gulp-uglify');//js压缩
var imagemin = require('gulp-imagemin'); //img压缩
var runSequence = require('gulp-run-sequence'); //task顺序执行
var contentIncluder = require('gulp-content-includer');
var concat = require('gulp-concat');

gulp.task('default', function() {  
  gulp.run(['html','cssmin','jsmin','imgmin'],'concat','watch');
});

//html
gulp.task('html', function() {
  gulp.src("dev/html/component/*.html")
        .pipe(gulp.dest('dist/html/component'));
  gulp.src("dev/html/index.html")
  			.pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('dist/'));
});

//css压缩
gulp.task('cssmin', function() {
  gulp.src('dev/css/**/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],//主流浏览器的最新两个版本
        cascade: false, //是否美化属性值 默认：true 
        remove:true //是否去掉不必要的前缀 默认：true 
     }))
    //.pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
});

//js压缩
gulp.task('jsmin', function() {
  gulp.src('dev/js/**/*.js')
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
});

//img压缩
gulp.task('imgmin', function() {
  gulp.src('dev/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'))
});

//文件合并
gulp.task('concat', function () {
//	gulp.src(['dist/**/common.js', 'dist/**/rem.js', 'dist/**/zepto.js'])
//  .pipe(concat('all.js'))
//  .pipe(gulp.dest('dist/js/quote/')); 
//gulp.src(['dist/**/base.css', 'dist/**/common.css'])
//  .pipe(concat('all.css'))
//  .pipe(gulp.dest('dist/css/base/'));  
});

//监听文件修改
gulp.task('watch',['html'], function() {
  gulp.watch(["dev/**/*.html"], ['html']);
  gulp.watch(["dev/**/*.css"], ['cssmin']);
  gulp.watch(["dev/**/*.js"], ['jsmin']);
  gulp.watch(["dev/img/**/*"], ['imgmin']);
  gulp.watch(['dist/**/common.js', 'dist/**/rem.js', 'dist/**/zepto.js'], ['concat']);
  gulp.watch(['dist/**/base.css', 'dist/**/common.css'], ['concat']);
});