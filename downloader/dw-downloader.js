const request = require('request');
const moment = require('moment-timezone');
const Show = require('../models/Show');

const url = 'http://www.dw.com/api/epg/5?languageId=1';

exports.channelIds = ['deutsche_welle'];

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
	let intermission = Show.INTERMISSION;
	let lastShow = null;

	for (let item of json.items) {
		let show = parseShow(item, channelId);

		if (show.startTime.isBefore()) {
			if (show.endTime.isAfter()) {
				return Promise.resolve(show);
			}
		} else if (lastShow) {
			intermission.startTime = lastShow.endTime;
			intermission.endTime = show.startTime;
			return Promise.resolve(intermission);
		}

		lastShow = show;
	}

	return Promise.resolve(Show.INTERMISSION);
}

exports.getShow = function (channelId) {
	return new Promise((resolve, reject) => {
		request.get({ url: url, json: true }, (err, res, data) => {
				if (err) {
					reject(err);
				} else if (res.statusCode !== 200) {
					return reject('wrong status code: ' + res.statusCode);
				} else {
					return resolve(getShow(data, channelId));
				}
		});
	});
};
