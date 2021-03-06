const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost/movie-list-server';

mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl)
  .then(() => console.log(chalk.cyan(`[mongoose] Connected to MongoDB!`)))
  .catch(err => {
    return console.log(chalk.red(`[mongoose] Unable to connect to MongoDB! ${err}`));
  });

const app = express();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3001;

app.set('port', port);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

const moviesRoutes = require('./routes/MoviesRoutes');

app.use('/api/movie', moviesRoutes);

app.all('*', (req, res, next) => {
  req.status = 401;
  return res.json(`Not found. Couldn't find it. It's not here!`);
});

app.use((err, req, res, next) => {
  res.status = 500;
  return res.json(`Unable to process request. ERROR: ${err}`);
});

app.listen(port, () => console.log(chalk.blue(`[express] Listening on port: ${port} [${env}]`)))
