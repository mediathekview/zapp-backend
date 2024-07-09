const express = require("express");
const shows = require("./routes/shows");
const channelInfoList = require("./routes/channelInfoList");

const version = "1.1.17";
const app = express();

app.use((_, res, next) => {
	res.setHeader("Version", version);

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	next();
});

app.get("/v1/shows/:channelId", shows.findByChannel);
app.get("/v1/channelInfoList", channelInfoList.get);

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
