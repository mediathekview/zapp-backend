const axios = require("axios");
const moment = require("moment-timezone");
const Cache = require("./cache");
const Show = require("../models/Show");

const cache = new Cache();
const url = "https://programm.ard.de/TV/Export/Now";

const channelIdMap = {
	"das_erste": "daserste",
	"tagesschau24": "tagesschau24",
	"br_sued": "br-süd",
	"br_nord": "br-süd",
	"hr": "hr",
	"mdr_thueringen": "mdr-sachsen",
	"mdr_sachsen_anhalt": "mdr-sachsen",
	"mdr_sachsen": "mdr-sachsen",
	"ndr_sh": "ndr-niedersachsen",
	"ndr_nds": "ndr-niedersachsen",
	"ndr_mv": "ndr-niedersachsen",
	"ndr_hh": "ndr-niedersachsen",
	"rb": "radiobremen",
	"rbb_berlin": "rbb-brandenburg",
	"rbb_brandenburg": "rbb-brandenburg",
	"sr": "sr",
	"swr_bw": "swr-württemberg",
	"swr_rp": "swr-württemberg",
	"ard_alpha": "alpha",
	"wdr": "wdr",
	"one": "one",
};

exports.channelIds = Object.keys(channelIdMap);

function getShow(json, channelId, mediathekChannelName) {
	let broadcasts = json.events;
	let showToReturn = null;

	if (!broadcasts) {
		return null;
	}

	for (let entryKey in broadcasts) {
		const entry = broadcasts[entryKey].now;

		if (!entry) {
			continue;
		}

		// parse every show possible to cache it
		let show = new Show(entry.title);
		show.subtitle = entry.sub_title;
		show.description = entry.short_text;
		show.channel = channelId;
		show.startTime = moment(entry.start);
		show.endTime = moment(entry.stop);

		cache.save(show, entry.channel.mediathek_name);

		if (entry.channel.mediathek_name === mediathekChannelName) {
			showToReturn = show;
		}
	}

	return showToReturn;
}

exports.getShow = async function (channelId) {
	const mediathekChannelName = channelIdMap[channelId];
	const cachedShow = cache.getShow(mediathekChannelName);

	if (cachedShow !== null) {
		// already cached this show internally (maybe from a run for another channel)
		console.log(`- ${channelId} was loaded from ard cache`);

		// set correct channel because in mediathekChannelName can map to multiple ids
		cachedShow.channel = channelId;
		return cachedShow;
	}

	console.log(`- load ${url} to get show info for ${channelId}`);
	const response = await axios.get(url);

	if (response.status !== 200) {
		throw "wrong status code for getShow: " + response.status;
	}

	const show = getShow(response.data, channelId, mediathekChannelName);

	if (show === null) {
		throw("show info currently not available");
	}

	return show;
};
