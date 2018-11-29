const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require("mongoose");
const logger = require("morgan");
//const dotenv = require("dotenv").config({ path: './config' });
const path = require('path');

// Initialize the Express App
const app = express();

// Import required modules
const candids = require('./routes/candid.routes');
const jobs = require('./routes/job.routes');
const serverConfig = require('./config/config');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;


// BodyParser and routes
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
        console.error('Please make sure Mongodb is correctly configured!'); // eslint-disable-line no-console
        throw error;
    }
});
app.use('/api', [candids, jobs]);

// API Calls

// // GET
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });
//
// // POST
// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

// Deployment settings
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Check that the server is functioning
app.listen(serverConfig.port, () => console.log(`👂 Listening  on port ${serverConfig.port}`));