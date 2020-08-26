const axios = require("axios");
const moment = require("moment-timezone");
const Show = require("../models/Show");

const apiTokenRegex = new RegExp("apiToken[\\s\:\"\"]*([\\w\-\.]{40,})");
const indexUrl = "https://www.zdf.de/live-tv";
const baseUrl = "https://api.zdf.de/cmdm/epg/broadcasts?limit=1&page=1&order=desc";
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
	"arte": "arte",
};

let apiToken = false;

exports.channelIds = ["zdf", "dreisat", "kika", "phoenix", "zdf_info", "zdf_neo", "arte"];

function getShow(json, channelId) {
	let broadcast = json["http://zdf.de/rels/cmdm/broadcasts"][0];

	if (!broadcast) {
		return null;
	}

	let show = new Show(broadcast.title);
	show.subtitle = broadcast.subtitle;
	show.description = broadcast.text;
	show.channel = channelId;
	show.startTime = moment(broadcast.airtimeBegin);
	show.endTime = moment(broadcast.airtimeEnd);
	return show;
}

async function getApiToken() {
	if (apiToken) {
		return apiToken;
	}

	const response = await axios.get(indexUrl);

	if (response.status !== 200) {
		throw "wrong status code for getShow: " + response.status;
	}

	let newApiToken = response.data.match(apiTokenRegex);

	if (newApiToken && newApiToken.length >= 2) {
		return newApiToken[1];
	} else {
		throw "api token not found";
	}
}

exports.getShow = async function (channelId) {
	const urlChannel = channelIdMap[channelId];
	const time = moment.utc().format();
	const url = `${baseUrl}&tvServices=${urlChannel}&to=${time}`;

	const apiToken = await getApiToken();
	headers["Api-Auth"] = "Bearer " + apiToken;

	const response = await axios.get(url, { headers: headers });

	if (response.status !== 200) {
		throw "wrong status code for getShow: " + response.status;
	}

	const show = getShow(response.data, channelId);

	if (show === null) {
		throw("show info currently not available");
	}

	return show;
};
