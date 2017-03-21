const express = require('express');
const shows = require('./routes/shows');

const app = express();

app.get('/v1/shows', shows.findAll);
app.get('/v1/shows/:channelId', shows.findByChannel);

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
