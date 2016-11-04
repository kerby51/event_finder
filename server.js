require('dotenv').config();

process.env.ENV = process.env.ENV || 'dev';

if (!process.env.AUTH_TOKEN) {
    require('dotenv').config();
}

if (!process.env.APP_KEY) {
    require('dotenv').config();
}

const path = require('path');
const app = require('./app/app');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

if (process.env.ENV === 'dev') {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

// const compiler = webpack(config);
// const webpackMiddle = webpackMiddleware(compiler, {
//   publicPath: '/js',
//   stats: {
//     chunks: false,
//     colors: true,
//   },
// });


app.use(express.static(path.join(__dirname, '/dist')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});





