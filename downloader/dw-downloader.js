const request = require('request');
const moment = require('moment-timezone');

const url = 'http://www.dw.com/api/epg/5?languageId=1';

exports.channelIds = ['deutsche_welle'];

function parseShow(showJson, channelId) {
	return {
		title: showJson.name,
		subtitle: showJson.description,
		channel: channelId,
		startTime: moment(showJson.startDate),
		endTime: moment(showJson.endDate)
	};
}

function getShow(json, channelId) {
	let shows = json.items;

	for (let item of json.items) {
		let show = parseShow(item, channelId);
		if (show.startTime.isBefore() && show.endTime.isAfter()) {
			return Promise.resolve(show);
		}
	}

	return Promise.reject('intermission');
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
