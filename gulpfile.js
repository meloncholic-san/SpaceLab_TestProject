

import gulp from "gulp";
import fileInclude from "gulp-file-include";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import browserSync from "browser-sync";
import { deleteAsync } from "del";
import rename from "gulp-rename";
import fs from "fs";
import path from "path";
import webpackConfig from './webpack.config.js';
import webpackStream from 'webpack-stream';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

const paths = {
  html: {
    src: ['src/index.html', 'src/pages/**/*.html'],
    watch: ['src/index.html', 'src/pages/**/*.html', 'src/components/**/*.html'],
    dest: 'dist/',
  },
  styles: {
    src: "src/scss/main.scss",
    watch: ["src/components/**/*.scss", "src/pages/**/*.scss", "src/scss/**/*.scss"], 
    dest: "dist/css/",
  },
  scripts: {
    src: ['src/components/**/**/*.js', 'src/pages/**/**/*.js', "src/js/**/*.js"],
    dest: 'dist/js/',
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img/',
  },
  svgSprite: {
    src: 'src/img/symbol-defs.svg',
    dest: 'dist/img/',
  }
};

function html() {
  return gulp.src(paths.html.src)
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(rename((file) => {
      file.dirname = '';
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.stream());
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig))
    .pipe(terser())
    .pipe(rename((file) => {
      file.dirname = '';
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream());
}

function copyPngWithNode(cb) {
  const srcDir = path.resolve('src/img');
  const destDir = path.resolve('dist/img');

  fs.mkdirSync(destDir, { recursive: true });

  function copyPngRecursively(currentSrcDir, currentDestDir) {
    const items = fs.readdirSync(currentSrcDir, { withFileTypes: true });
    items.forEach(item => {
      const srcPath = path.join(currentSrcDir, item.name);
      const destPath = path.join(currentDestDir, item.name);

      if (item.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyPngRecursively(srcPath, destPath);
      } else if (item.isFile() && item.name.toLowerCase().endsWith('.png')) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied PNG: ${destPath}`);
      }
    });
  }

  copyPngRecursively(srcDir, destDir);

  cb();
}

function copyGifsWithNode(cb) {
  const srcDir = path.resolve('src/img');
  const destDir = path.resolve('dist/img');

  fs.mkdirSync(destDir, { recursive: true });

  function copyGifsRecursively(currentSrcDir, currentDestDir) {
    const items = fs.readdirSync(currentSrcDir, { withFileTypes: true });
    items.forEach(item => {
      const srcPath = path.join(currentSrcDir, item.name);
      const destPath = path.join(currentDestDir, item.name);

      if (item.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyGifsRecursively(srcPath, destPath);
      } else if (item.isFile() && item.name.toLowerCase().endsWith('.gif')) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied GIF: ${destPath}`);
      }
    });
  }

  copyGifsRecursively(srcDir, destDir);

  cb();
}

function imagesOptimize() {
  return gulp.src(['src/img/**/*', '!src/img/**/*.gif', '!src/img/**/*.png'])
    // .pipe(imagemin()) 
    .pipe(gulp.dest(paths.images.dest));
}

const images = gulp.parallel(copyGifsWithNode, copyPngWithNode, imagesOptimize);

// function svgSprite() {
//   return gulp.src(paths.svgSprite.src)
//     .pipe(gulp.dest(paths.svgSprite.dest));
// }

function clean() {
  return deleteAsync(["dist"]);
}

function serve() {
  bs.init({
    server: {
      baseDir: "dist",
      index: "index.html",
      middleware: [
        function (req, res, next) {
          if (
            !req.url.includes(".") &&
            !req.url.startsWith("/html/") &&
            req.url !== "/"
          ) {
            req.url = "/index.html";
          }
          return next();
        },
      ],
    },
  });
  gulp.watch(paths.html.watch, html);
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

export const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images));
export default gulp.series(build, serve);
