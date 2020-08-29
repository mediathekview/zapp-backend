const axios = require("axios");
const moment = require("moment-timezone");
const Show = require("../models/Show");

const urls = {
	deutsche_welle: "http://www.dw.com/api/epg/5?languageId=1&days=1",
	deutsche_welle_plus: "http://www.dw.com/api/epg/4?languageId=1&days=1"
};

exports.channelIds = Object.keys(urls);

function parseShow(showJson, channelId) {
	let show = new Show(showJson.name);
	show.description = showJson.programDescription;
	show.channel = channelId;
	show.subtitle = showJson.description;
	show.startTime = moment(showJson.startDate);
	show.endTime = moment(showJson.endDate);
	return show;
}

function getShow(json, channelId) {
	for (let item of json.items) {
		let show = parseShow(item, channelId);

		if (show.isRunningNow()) {
			return show;
		}
	}

	return null;
}

exports.getShow = async function (channelId) {
	const url = urls[channelId];

	console.log(`- load ${url} to get show info for ${channelId}`);
	const response = await axios.get(url);

	if (response.status !== 200) {
		throw "wrong status code for getShow: " + response.status;
	}

	const show = getShow(response.data, channelId);

	if (show === null) {
		throw("show info currently not available");
	}

	return show;
};
