const request = require('request');
const moment = require('moment-timezone');
const Show = require('../models/Show');

const apiTokenRegex = new RegExp("[a-f0-9]{40}");
const indexUrl = 'https://www.zdf.de/live-tv';
const baseUrl = 'https://api.zdf.de/cmdm/epg/broadcasts?limit=1&page=1&order=desc';
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
	let broadcast = json['http://zdf.de/rels/cmdm/broadcasts'][0];

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

function getApiToken() {
	if (apiToken) {
		return Promise.resolve(apiToken);
	}

	return new Promise((resolve, reject) => {
		request.get({ url: indexUrl }, (err, res, data) => {
			if (err) {
				reject(err);
			} else if (res.statusCode !== 200) {
				return reject('wrong status code: ' + res.statusCode);
			} else {
				apiToken = apiTokenRegex.exec(data);
				if (apiToken) {
					return resolve(apiToken);
				} else {
					return reject('api token not found');
				}
			}
		});
	});
}

exports.getShow = function (channelId) {
	let urlChannel = channelIdMap[channelId];
	let time = moment.utc().format();
	let url = `${baseUrl}&tvServices=${urlChannel}&to=${time}`;

	return getApiToken().then(apiToken => {
		return new Promise((resolve, reject) => {
			headers["Api-Auth"] = "Bearer " + apiToken;

			request.get({ url: url, json: true, headers: headers }, (err, res, data) => {
				if (err) {
					reject(err);
				} else if (res.statusCode !== 200) {
					apiToken = false;
					return reject('wrong status code: ' + res.statusCode);
				} else {
					let show = getShow(data, channelId);
					if (show === null) {
						reject('show info currently not available');
					} else {
						return resolve(show);
					}
				}
			});
		});
	});
};
