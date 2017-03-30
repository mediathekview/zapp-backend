const request = require('request');
const moment = require('moment-timezone');
const xml2js = require('xml2js');
const Show = require('../models/Show');

const urls = {
	parlamentsfernsehen_1: 'https://www.bundestag.de/includes/datasources/tv.xml',
	parlamentsfernsehen_2: 'https://www.bundestag.de/includes/datasources/tv2.xml',
};

exports.channelIds = ['parlamentsfernsehen_1', 'parlamentsfernsehen_2'];

function parseShow(showData, channelId) {
	let show = new Show(showData.langtitel[0]);
	show.description = showData.infos[0] || null;
	show.channel = channelId;
	show.startTime = moment(showData.anfangUnix * 1000);
	show.endTime = moment(showData.endeUnix * 1000);
	show.subtitle = showData.live[0] || 'Aufzeichnung vom ' + showData.aufzeichnungsdatum[0];
	return show;
}

function getShow(xml, channelId) {
	let intermission = Show.INTERMISSION;

	return parse(xml).then(data => {

		let lastShow = null;
		for (let show of data.tvprogramm.sendung) {
			let parsedShow = parseShow(show, channelId);
			if (parsedShow.startTime.isBefore()) {
				if (parsedShow.endTime.isAfter()) {
					return parsedShow;
				}
			} else if (lastShow) {
				intermission.startTime = lastShow.endTime;
				intermission.endTime = parsedShow.startTime;
				return intermission;
			}
			lastShow = parsedShow;
		}

		return intermission;
	});
}

function parse(xml) {
	return new Promise((resolve, reject) => {
		xml2js.parseString(xml, (err, data) => {
			if (err) {
				reject('parsing error ' + err);
			} else {
				resolve(data);
			}
		});
	});
}

exports.getShow = function (channelId) {
	return new Promise((resolve, reject) => {
		request.get({ url: urls[channelId] }, (err, res, data) => {
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
