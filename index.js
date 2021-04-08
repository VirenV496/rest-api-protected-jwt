const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users')
const auth = require('./routes/auth');
const posts = require('./routes/posts')


app.use(express.json());

mongoose.connect('mongodb://localhost/users', {useNewUrlParser:true ,  useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  mongoose.set('useCreateIndex', true );


app.use('/api/users',users); //for crud endpoints 
app.use('/api/auth', auth);//for login email and pass and generating webtokens 
app.use('/api/posts',posts);//testing purpose



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

                                                                                                                                                                                                                    
  
