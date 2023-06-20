import webpack from "webpack-stream";
import fileInclude from "gulp-file-include";
import rename from "gulp-rename";
export const js = () => {
	return (
		app.gulp
			.src(app.path.src.js, { sourcemaps: true })
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "JS",
						message: "Error: <%= error.message %>",
					})
				)
			)
			.pipe(fileInclude())
			.pipe(app.gulp.dest(app.path.build.js))
			.pipe(
				rename({
					extname: ".min.js",
				})
			)
			// .pipe(webpack({
			//    mode: 'development',
			//    output: {
			//       filename: 'script.min.js',
			//    }
			// }))
			.pipe(app.gulp.dest(app.path.build.js))
			.pipe(app.plugins.browsersync.stream())
	);
};
