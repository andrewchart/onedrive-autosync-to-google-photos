require('dotenv').config();

const log = require('./modules/logger.js');
const validateApiKey = require('./modules/validate-api-key.js');

// Setup Express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true, limit: '6mb' }));

/**
 * 
 */
app.post('/', (req, res) => {

  // Check for API Key Integrity
  if(validateApiKey(req.body.apiKey) === false) {

    let error = {
      status: 401,
      message: 'Unauthorized',
      details: 'ERROR: Invalid API key.'
    };

    log(error);

    return res.status(error.status).json(error);

  }

});


/**
 * Onedrive and Google Photos OAuth Page:
 * This is a page where the app administrator can authorize a OneDrive account and Google Photos
 * account which will be the origin/receiver of synced files.
 */
app.all(/^\/auth$/, async (req, res) => {

    if(
        (req.method === "POST" && req.body.apiKey && validateApiKey(req.body.apiKey)) ||
        (req.method === "GET" && req.query.apiKey && validateApiKey(req.query.apiKey))
    ) {
        res.render('auth', { data: {
          onedrive_user: { 
            name: 'o', 
            account_id: '1'
          },
          google_photos_user: { 
            name: 'g', 
            account_id: '2'
          },
          onedrive_oauth_url: '',
          google_photos_oauth_url: ''
        } });
    }

    else if(
        (req.method === "POST" && (!req.body.apiKey || !validateApiKey(req.body.apiKey))) ||
        (req.method === "GET" && (req.query.apiKey && !validateApiKey(req.query.apiKey)))
    ) {
        res.render('login', { message: "Incorrect API Key." });
    }

    else {
        res.render('login', { message: "" });
    }

});

/**
 * Health Check: Responds to a GET request for the root. 
 */
app.get('/', (req, res) => {

  let response = {
    status: 200,
    message: 'OK',
    details: 'Ping pong! The app is awake.'
  }
  
  res.status(200).json(response);

});

/**
 * All other routes should 404
 */
app.all('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Not Found', details: 'Page not found.' });
});

/**
 * Start the server
 */
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});