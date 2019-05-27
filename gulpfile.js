const gulp = require("gulp");
const ts = require("gulp-typescript");
const clean = require("gulp-clean");
const jeditor = require("gulp-json-editor");

const { compilerOptions, include } = require("./tsconfig.json");
const { destFolder } = require("./package.json");

var paths = {
  file: ["./*.md"],
  package: "./package.json"
};

//clean dest folder before compiling
gulp.task("clean", function() {
  return gulp.src(destFolder, { allowEmpty: true }).pipe(clean());
});

// copy all md(README.md CHANGELOG.md ...) file to dest folder
gulp.task("copy-file", function() {
  return gulp.src(paths.file).pipe(gulp.dest(destFolder));
});

//reorganize package.json for release
gulp.task("new-package", function() {
  return gulp
    .src(paths.package)
    .pipe(
      jeditor(function(json) {
        delete json.scripts;
        delete json.devDependencies;
        return json;
      })
    )
    .pipe(gulp.dest(destFolder));
});

//generate corresponding .d.ts and .js files
gulp.task("compile", function() {
  return gulp
    .src(include)
    .pipe(ts(compilerOptions))
    .pipe(gulp.dest(destFolder));
});

gulp.task(
  "release",
  gulp.series("clean", "copy-file", "new-package", "compile")
);
