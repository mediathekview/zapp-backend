import Show from "../models/Show.js";

const apiTokenRegex = new RegExp("videoToken[\\\\s:\"{]*apiToken[\\\\s:\"]*([\\w-.]{40,})");
const indexUrl = "https://www.zdf.de/live-tv";
const currentBaseUrl = "https://api.zdf.de/cmdm/epg/broadcasts?limit=1&page=1&order=desc";
const upcomingBaseUrl = "https://api.zdf.de/cmdm/epg/broadcasts?limit=10&page=1&order=asc";
const upcomingTimeSpan = {hours: 2};

/**
 * Maximum number of shows (current one and upcoming ones) returned per channel.
 */
const maxShows = 3;

const headers = {
	"Host": "api.zdf.de",
	"Accept": "application/vnd.de.zdf.v1.0+json",
	"Origin": "https://www.zdf.de"
};
const channelIdMap = {
	"zdf": "zdf",
	"dreisat": "3sat",
	"kika": "ki.ka",
	"phoenix": "phoenix",
	"zdf_info": "zdfinfo",
	"zdf_neo": "ZDFneo",
};

let apiToken = false;

const channelIds = ["zdf", "dreisat", "kika", "phoenix", "zdf_info", "zdf_neo"];

function parseShow(broadcast, channelId) {
	let show = new Show(broadcast.title);
	show.subtitle = broadcast.subtitle;
	show.description = broadcast.text;
	show.channel = channelId;
	show.startTime = Temporal.Instant.from(broadcast.airtimeBegin);
	show.endTime = Temporal.Instant.from(broadcast.airtimeEnd);
	return show;
}

function getShowFromJson(json, channelId) {
	let broadcast = json["http://zdf.de/rels/cmdm/broadcasts"][0];

	if (!broadcast) {
		return null;
	}

	return parseShow(broadcast, channelId);
}

function getShowsFromJson(json, channelId) {
	let broadcasts = json["http://zdf.de/rels/cmdm/broadcasts"] || [];
	return broadcasts.map(broadcast => parseShow(broadcast, channelId));
}

async function getApiToken() {
	if (apiToken) {
		return apiToken;
	}

	console.log(`- load ${indexUrl} to get api token`);
	const response = await fetch(indexUrl);

	if (!response.ok) {
		throw "wrong status code for getApiToken: " + response.status;
	}

	const responseText = await response.text();
	const newApiToken = responseText.match(apiTokenRegex);

	if (newApiToken && newApiToken.length >= 2) {
		return newApiToken[1];
	} else {
		throw "api token not found";
	}
}

async function getCurrentShow(channelId) {
	const urlChannel = channelIdMap[channelId];
	const time = Temporal.Now.instant().round("second");
	const url = `${currentBaseUrl}&tvServices=${urlChannel}&to=${time}`;

	let response;

	try {
		apiToken = await getApiToken();

		headers["Api-Auth"] = "Bearer " + apiToken;

		console.log(`- load ${url} to get show info for ${channelId}`);
		response = await fetch(url, {headers: headers});

		if (!response.ok) {
			throw "wrong status code for getShow: " + response.status;
		}

	} catch (e) {
		apiToken = null;
		throw e;
	}

	const json = await response.json();
	const show = getShowFromJson(json, channelId);

	if (show === null) {
		throw "show info currently not available";
	}

	return show;
}

async function getUpcomingShows(channelId, count) {
	const urlChannel = channelIdMap[channelId];
	const from = Temporal.Now.instant().round("second");
	const to = from.add(upcomingTimeSpan);
	const url = `${upcomingBaseUrl}&tvServices=${urlChannel}&from=${from}&to=${to}`;

	console.log(`- load ${url} to get upcoming show info for ${channelId}`);
	const response = await fetch(url, {headers: headers});

	if (!response.ok) {
		throw "wrong status code for getUpcomingShows: " + response.status;
	}

	const json = await response.json();
	return getShowsFromJson(json, channelId).slice(0, count);
}

async function getShows(channelId) {
	const currentShow = await getCurrentShow(channelId);

	const upcomingShowCount = maxShows - 1;

	if (upcomingShowCount === 0) {
		return [currentShow];
	}

	try {
		const upcomingShows = await getUpcomingShows(channelId, upcomingShowCount);
		return [currentShow, ...upcomingShows];
	} catch (e) {
		// current show is still available, upcoming shows are optional
		console.error(`- could not load upcoming shows for ${channelId}: ${e}`);
		return [currentShow];
	}
}

export default {
	channelIds,
	getShows
};
