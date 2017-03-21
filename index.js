const express = require('express');
const shows = require('./routes/shows');

const app = express();

app.get('/v1/shows', shows.findAll);
app.get('/v1/shows/:channelId', shows.findByChannel);

app.listen(4000);
console.log('Listening on port 3000...');
