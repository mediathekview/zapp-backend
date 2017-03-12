const express = require('express');
const shows = require('./routes/shows');

const app = express();

app.get('/shows', shows.findAll);
app.get('/shows/:channelId', shows.findByChannel);

app.listen(3000);
console.log('Listening on port 3000...');
