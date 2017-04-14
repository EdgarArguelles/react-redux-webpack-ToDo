'use strict';
const webpackConfig = require('./webpack.config');
webpackConfig.externals = {
  'react/lib/ExecutionEnvironment': true,
  'react/addons': true,
  'react/lib/ReactContext': 'window'
};
webpackConfig.module.rules.push({
  test: /\.js$/,
  enforce: 'pre',
  exclude: [/node_modules/, /\.spec.js$/],
  loaders: ['isparta-loader']
});

module.exports = (config) => {
  config.set({

    // Frameworks to use
    frameworks: ['mocha'],

    // List of files / patterns to load in the browser
    files: [
      'test/**/*.spec.js'
    ],

    // Plugins to use
    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-webpack'
    ],

    // Test results reporter to use
    reporters: ['spec', 'coverage'],

    // Processors before test
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },

    // Webpack configuration
    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    // Optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // Web server port
    port: 9876,

    // Start these browsers
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // If true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};