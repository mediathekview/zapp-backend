import xml2js from "xml2js";
import Show from "../models/Show.js";

/**
 * Maximum number of shows (current one and upcoming ones) returned per channel.
 */
const maxShows = 3;

const urls = {
	parlamentsfernsehen_1: "https://www.bundestag.de/apps/plenar/plenar/tv/tvxml/tv.xml",
	parlamentsfernsehen_2: "https://www.bundestag.de/apps/plenar/plenar/tv/tvxml/tv2.xml",
};

const channelIds = ["parlamentsfernsehen_1", "parlamentsfernsehen_2"];

function parseShow(showData, channelId) {
	let show = new Show(showData.langtitel[0]);
	show.description = showData.infos[0] || null;
	show.channel = channelId;
	show.startTime = Temporal.Instant.fromEpochMilliseconds(showData.anfangUnix * 1000);
	show.endTime = Temporal.Instant.fromEpochMilliseconds(showData.endeUnix * 1000);
	show.subtitle = showData.live[0] || "Aufzeichnung vom " + showData.aufzeichnungsdatum[0];
	return show;
}

function getShowsFromXmlData(data, channelId) {
	if (data.tvprogramm.length === 0) {
		return null;
	}

	const shows = data.tvprogramm.sendung.map(sendung => parseShow(sendung, channelId));
	shows.sort((a, b) => Temporal.Instant.compare(a.startTime, b.startTime));

	// current show must be the first one; everything before is finished
	const currentIndex = shows.findIndex(show => show.isRunningNow());

	if (currentIndex === -1) {
		return null;
	}

	return shows.slice(currentIndex, currentIndex + maxShows);
}

async function getShows(channelId) {
	const url = urls[channelId];

	console.log(`- load ${url} to get show info for ${channelId}`);
	const response = await fetch(url);

	if (!response.ok) {
		throw "wrong status code for getShows: " + response.status;
	}

	const responseText = await response.text();
	const data = await xml2js.parseStringPromise(responseText);
	const shows = getShowsFromXmlData(data, channelId);

	if (shows === null) {
		throw "show info currently not available";
	}

	return shows;
}

export default {
	channelIds,
	getShows
};
