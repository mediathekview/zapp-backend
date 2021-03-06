const axios = require("axios");
const moment = require("moment-timezone");
const Show = require("../models/Show");

const baseUrl = "https://programm.ard.de/TV/Export/Now?channel=";

const channelIdMap = {
	"das_erste": "Y3JpZDovL2Rhc2Vyc3RlLmRlL0xpdmVzdHJlYW0tRGFzRXJzdGU",
	"tagesschau24": "Y3JpZDovL2Rhc2Vyc3RlLmRlL3RhZ2Vzc2NoYXUvbGl2ZXN0cmVhbQ",
	"br_sued": "Y3JpZDovL2JyLmRlL0xpdmVzdHJlYW0tQlItU8O8ZA",
	"br_nord": "Y3JpZDovL2JyLmRlL0xpdmVzdHJlYW0tQlItU8O8ZA",
	"hr": "Y3JpZDovL2hyLmRlL0xpdmVzdHJlYW0tSFI",
	"mdr_thueringen": "Y3JpZDovL21kci5kZS9MaXZlc3RyZWFtLU1EUi1TYWNoc2Vu",
	"mdr_sachsen": "Y3JpZDovL21kci5kZS9MaXZlc3RyZWFtLU1EUi1TYWNoc2Vu",
	"mdr_sachsen_anhalt": "Y3JpZDovL21kci5kZS9MaXZlc3RyZWFtLU1EUi1TYWNoc2Vu",
	"ndr_sh": "Y3JpZDovL25kci5kZS9MaXZlc3RyZWFtLU5EUi1OaWVkZXJzYWNoc2Vu",
	"ndr_nds": "Y3JpZDovL25kci5kZS9MaXZlc3RyZWFtLU5EUi1OaWVkZXJzYWNoc2Vu",
	"ndr_mv": "Y3JpZDovL25kci5kZS9MaXZlc3RyZWFtLU5EUi1OaWVkZXJzYWNoc2Vu",
	"ndr_hh": "Y3JpZDovL25kci5kZS9MaXZlc3RyZWFtLU5EUi1OaWVkZXJzYWNoc2Vu",
	"rb": "Y3JpZDovL3JhZGlvYnJlbWVuLmRlL3JhZGlvX2JyZW1lbl9saXZlc3RyZWFt",
	"rbb_berlin": "Y3JpZDovL3JiYi1vbmxpbmUuZGUvcmJiZmVybnNlaGVuL2xpdmVfYnJhbmRlbmJ1cmcvc2VuZGVwbGF0ei0tLWxpdmVzdHJlYW0tLS1icmFuZGVuYnVyZy0tLWhsczE",
	"rbb_brandenburg": "Y3JpZDovL3JiYi1vbmxpbmUuZGUvcmJiZmVybnNlaGVuL2xpdmVfYnJhbmRlbmJ1cmcvc2VuZGVwbGF0ei0tLWxpdmVzdHJlYW0tLS1icmFuZGVuYnVyZy0tLWhsczE",
	"sr": "Y3JpZDovL3NyLW9ubGluZS5kZS8yODQ4NjAvbGl2ZXN0cmVhbQ",
	"swr_bw": "Y3JpZDovL3N3ci5kZS8xMzQ4MTA0Mg",
	"swr_rp": "Y3JpZDovL3N3ci5kZS8xMzQ4MTA0Mg",
	"wdr": "Y3JpZDovL3dkci5kZS9CZWl0cmFnLTNkYTY2NGRlLTE4YzItNDY1MC1hNGZmLTRmNjQxNDcyMDcyYg",
	"one": "Y3JpZDovL3dkci5kZS9CZWl0cmFnLTFlNjA0YWFlLTViODctNGMzNC04ZDhmLTg4OWI1ZjE2ZDU3Mw",
	"ard_alpha": "Y3JpZDovL2JyLmRlL0xpdmVzdHJlYW0tQVJELUFscGhh"
};

exports.channelIds = Object.keys(channelIdMap);

function parseShow(json, channelId) {
	const show = new Show(json.title);
	show.subtitle = json.sub_title;
	show.description = json.short_text;
	show.channel = channelId;
	show.startTime = moment(json.start);
	show.endTime = moment(json.stop);
	return show;
}

function getShow(json, channelId, apiChannelId) {
	let broadcasts = json.events[apiChannelId];

	if (!broadcasts) {
		return null;
	}

	for (let entryKey in broadcasts) {
		const entry = broadcasts[entryKey];

		if (!entry) {
			continue;
		}

		const show = parseShow(entry, channelId);

		if (show.isRunningNow()) {
			return show;
		}
	}

	return null;
}

exports.getShow = async function (channelId) {
	const apiChannelId = channelIdMap[channelId];
	const url = baseUrl + apiChannelId;

	console.log(`- load ${url} to get show info for ${channelId}`);
	const response = await axios.get(url);

	if (response.status !== 200) {
		throw "wrong status code for getShow: " + response.status;
	}

	const show = getShow(response.data, channelId, apiChannelId);

	if (show === null) {
		throw("show info currently not available");
	}

	return show;
};
