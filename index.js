import express from "express";
import shows from "./routes/shows.js";
import channelInfoList from "./routes/channelInfoList.js";

const version = "1.2.8";
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
