const gulp = require('gulp');
const { series, parallel, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const plumber = require('gulp-plumber');
const notifier = require('gulp-notifier');
const svgmin = require('gulp-svgmin');

// MESSAGES FOR NOTIFIER
notifier.defaults({
	messages: {
		sass: 'CSS was successfully compiled!',
		js: "JavaScript is up and running!",
		kit: "HTML has been successfully created!",
		icons: "Icons are initialized!",
		fonts: "Fonts are loaded!"
	},
	prefix: '===>',
	suffix: '<===',
	exclusions: '.map'
})

// FILE PATHS
const filesPath = {
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/**/*.+(png|jpg|gif|svg)',
	html: './src/**/*.kit',
	icons: './src/icons/**/*.svg',
	fonts: './src/fonts/**/*.+(ttf|woff|woff2)',
}

// SASS TASK
const sassTask = (done) => {
	gulp.src(filesPath.sass)
		.pipe(plumber({errorHandler: notifier.error}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass())
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(rename((path) => {
			if (!path.extname.endsWith('.map')) {
				path.basename += '.min';
			}
		}))
		.pipe(dest('./dist/css'))
		.pipe(notifier.success('sass'));
	done();
}

// IMAGEMIN TASK
const imgTask = (done) => {
	gulp.src(filesPath.img)
			.pipe(cache(imagemin()))
			.pipe(dest('./dist/img/'))
	done();
}

// ICONS TASK
const iconsTask = (done) => {
	gulp.src(filesPath.icons)
			.pipe(svgmin())
			.pipe(dest('./dist/icons/'))
	done();
}

// FONT TASK
const fontTask = (done) => {
	gulp.src(filesPath.fonts)
		.pipe(dest('./dist/fonts/'))
		.pipe(notifier.success('fonts'))
	done();
}

// WATCH TASK
const watchTask = () => {
	browserSync.init({
		server: {
			baseDir: './'
		},
		open: false
	});
  gulp.watch(filesPath.sass, sassTask).on("change", browserSync.reload);
  gulp.watch(filesPath.img, imgTask).on("change", browserSync.reload);
  gulp.watch(filesPath.icons, iconsTask).on("change", browserSync.reload);
}

// CLEAR CACHE TASK
const clearCacheTask = (done) => {
	return cache.clearAll(done);
}

// CLEAN DIST TASK
const cleanDistTask = (done) => {
	return del(['./dist/**/*'])
	done();
}

exports.sassTask = sassTask;
exports.imgTask = imgTask;
exports.iconsTask = iconsTask;
exports.watchTask = watchTask;
exports.fontTask = fontTask;
exports.clearCacheTask = clearCacheTask;
exports.cleanDistTask = cleanDistTask;
exports.build = parallel(sassTask, imgTask, iconsTask, fontTask);
exports.default = series(exports.build, watchTask);