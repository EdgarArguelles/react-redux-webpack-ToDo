import gulp from 'gulp';
import gutil from 'gulp-util';
import open from 'gulp-open'; // Open a URL in a web browser
import webpack from 'webpack'; // Compile with Webpack
import WebpackDevServer from 'webpack-dev-server'; // Compile and Run with Webpack
import eslint from 'gulp-eslint'; // Evaluate js via eslint
import {Server} from 'karma'; // Start test server
import runSequence from 'run-sequence'; // Run tasks in sequence

// Open a URL in a web browser
gulp.task('open', () => {
  gulp.src('./src/index.html')
    .pipe(open({uri: 'http://localhost:8080/index.html'}));
});

// Webpack
gulp.task('webpack', (callback) => {
  let webpackConfig = require('./webpack.config');
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

// Webpack-dev-server
gulp.task('dev', (callback) => {
  let webpackConfig = require('./webpack.config');
  webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');
  let compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {historyApiFallback: true, hot: true}).listen(8080, 'localhost', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    callback();
  });
});

// Evaluate js via eslint
gulp.task('eslint', () => {
  gulp.src(['**/*.js', '!node_modules/**', '!dist/**', '!coverage/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Run tests
gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', () => {
  runSequence('eslint', 'test', 'webpack');
});

gulp.task('default', () => {
  runSequence('eslint', 'dev', 'open');
});