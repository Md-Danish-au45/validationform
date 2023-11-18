const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { config } = require('dotenv');
const db = require('./database/connection');

// Load environment variables
config();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establish MongoDB connection
db().then(() => {
  require('./routes')(app);
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
