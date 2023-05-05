var gulp = require('gulp');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now() / 1000);

gulp.task('iconfont', function () {
	return gulp
		.src(['src/utils/icon/svg-icons/*.svg']) // folder svg
		.pipe(
			iconfont({
				fontName: 'titan-font', // font name
				formats: ['ttf', 'eot', 'woff', 'woff2'], //format file font
				appendCodepoints: true,
				appendUnicode: false,
				normalize: true,
				fontHeight: 1000,
				centerHorizontally: true,
				descent: 12,
				timestamp: runTimestamp,
			})
		)
		.on('glyphs', function (glyphs, options) {
			gulp.src('src/utils/icon/icon.css') // folder file css before
				.pipe(
					consolidate('lodash', {
						glyphs: glyphs,
						fontName: options.fontName,
						fontDate: Date.now(),
					})
				)
				.pipe(gulp.dest('src/dist')); // folder file css after execute
		})
		.pipe(gulp.dest('src/dist')); // folder font compiled
});
