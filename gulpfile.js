var gulp 		= require('gulp')
var sass 		= require('gulp-sass')
// var browserify 	= require('gulp-browserify')
var browserify 	= require('browserify')
var babelify 	= require('babelify')
var connect 	= require('gulp-connect')
var livereload 	= require('gulp-livereload')
var fs 			= require('fs')
var autoprefixer = require('gulp-autoprefixer');
var svgSprite = require("gulp-svg-sprite");
var gulpSequence = require('gulp-sequence')
var cssmin = require('gulp-cssmin')
var uglify = require('gulp-uglify')

// gulp-svg-sprite config
var config = {
    mode: {
        defs: {
          render: {
            css: false, // CSS output option for icon sizing
            scss: false // SCSS output option for icon sizing
          },
          dest: 'sprite', // destination folder
          prefix: '.svg--%s', // BEM-style prefix if styles rendered
          sprite: 'sprite.svg', //generated sprite name
          example: true // Build a sample page, please!
        }
    },
    transform: [
                {svgo: {
                    plugins: [
                        { removeViewBox: false },
                        { removeUselessStrokeAndFill: false },
                        { cleanupIDs: false },
                        { mergePaths: false },
                        { removeUnknownsAndDefaults: false }
                    ]
                }}
            ],
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceIDs: false
    }
};

gulp.task('autoprefixer', () =>
    gulp.src('./dist/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
)

gulp.task('svgSprite', function() {
  return gulp.src('./src/img/svg/*.svg')
  .pipe(svgSprite(config))
  .pipe(gulp.dest('./assets'));
});

gulp.task('autoprefixer', () =>
    gulp.src('./dist/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
)

gulp.task('sass', function() {

	return gulp.src('./src/scss/style.scss')
			   .pipe(sass().on('error', sass.logError))
			   .pipe(gulp.dest('./dist/css'))
			   .pipe(gulp.dest('../public/dist/css'))               
			   .pipe(livereload())


})

gulp.task('sass-remote', function() {

	return gulp.src('./src/scss/style.scss')
			   .pipe(sass().on('error', sass.logError))
			   .pipe(gulp.dest('../sites/all/themes/invest/dist/css'))

})

gulp.task('reload', function() {
	return gulp.src('./index.html')
		.pipe(livereload())
})

gulp.task('browserify', function() {

	return browserify("./src/js/script.js")
	  .transform("babelify", {presets: ["es2015"]})
	  .on('error', function() {console.log('error')})
	  .bundle()
	  .pipe(fs.createWriteStream("./dist/js/app.js"))
	  // .pipe(fs.createWriteStream("../public/dist/js/app.js"))

})

gulp.task('browserify-remote', function() {

	return browserify("./src/js/script.js")
	  .transform("babelify", {presets: ["es2015"]})
	  .on('error', function() {console.log('error')})
	  .bundle()
	  .pipe(fs.createWriteStream("../sites/all/themes/invest/dist/js/app.js"))


})

gulp.task('watch', function() {
  livereload.listen()
	connect.server()
	gulp.watch('./index.html', ['reload'])
	gulp.watch('./src/scss/*.scss', ['sass'])
	gulp.watch('./src/js/*.js', ['browserify'])
})

gulp.task('watch-remote', function() {
    gulp.watch('./src/scss/*.scss', ['sass-remote'])
    gulp.watch('./src/js/*.js', ['browserify-remote'])
    
})

gulp.task('uglify', function (cb) {
        gulp.src('dist/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
})


gulp.task('cssmin', function () {
    gulp.src('dist/css/style.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('dev-remote', ['watch-remote'])
gulp.task('dev', ['watch']);
gulp.task('svg', ['svgSprite']);//, 'sprites'

gulp.task('build', gulpSequence(['sass', 'browserify'], 'autoprefixer', 'cssmin','uglify'))