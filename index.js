const express = require('express');
const shows = require('./routes/shows');
const channelInfoList = require('./routes/channelInfoList');

const app = express();

app.get('/v1/shows/:channelId', shows.findByChannel);
app.get('/v1/channelInfoList', channelInfoList.get);

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
