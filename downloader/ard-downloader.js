const axios = require('axios');
const moment = require('moment-timezone');
const Show = require('../models/Show');

const url = 'https://programm.ard.de/TV/Export/Now';

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
	let broadcasts = json['events'];

	if (!broadcasts) {
		return null;
	}

	for (let entryKey in broadcasts) {
		const entry = broadcasts[entryKey].now;

		if (entry && entry.channel.mediathek_name === mediathekChannelName) {
			let show = new Show(entry.title);
			show.subtitle = entry.sub_title;
			show.description = entry.short_text;
			show.channel = channelId;
			show.startTime = moment(entry.start);
			show.endTime = moment(entry.stop);
			return show;
		}
	}

	return null;
}

exports.getShow = async function (channelId) {
	const response = await axios.get(url);

	if (response.status !== 200) {
		throw 'wrong status code for getShow: ' + response.status;
	}

	const show = getShow(response.data, channelId, channelIdMap[channelId]);

	if (show === null) {
		throw('show info currently not available');
	}

	return show;
};
