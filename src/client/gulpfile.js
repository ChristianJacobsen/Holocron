// Dependencies
const gulp = require("gulp");
const tslint = require("gulp-tslint");

// TSLint
gulp.task("tslint", function () {
  gulp.src("src/app/**/*.ts")
    .pipe(tslint({
      formatter: "prose",
      configuration: "tslint.json"
    }))
    .pipe(tslint.report({
      summarizeFailureOutput: true
    }));
});

// Default
gulp.task("default", ["tslint"]);
