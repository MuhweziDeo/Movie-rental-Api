const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const users=require('./routes/users')
const movies = require('./routes/movies');
const express = require('express');
const app = express();
const auth=require('./routes/auth');
const config= require('config');

// console.log(config)
// if(!config.get('secret')){
//   console.log('Fatal error')
//   process.exit(1);
// }

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));