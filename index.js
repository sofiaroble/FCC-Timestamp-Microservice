// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
;  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/:timestamp?', (req, res) => {
  try {
    let date;

    if (req.params.timestamp === undefined) {
      date = new Date();
    } else {
      const { timestamp } = req.params;
      const parsedTimestamp = /^\d+$/.test(timestamp) ? parseInt(timestamp) : timestamp;
      date = new Date(parsedTimestamp);
    }

    if (isNaN(date.getTime())) {
      return res.json({ error: 'Invalid Date' });
    }

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});

// Handle empty date parameter
app.get('/api/', (req, res) => {
  const date = new Date();

// Prepare the response object
  const response = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };

  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
