const request = require('request');
const moment = require('moment-timezone');
const xml2js = require('xml2js');

const urls = {
	parlamentsfernsehen_1: 'https://www.bundestag.de/includes/datasources/tv.xml',
	parlamentsfernsehen_2: 'https://www.bundestag.de/includes/datasources/tv2.xml',
};

exports.channelIds = ['parlamentsfernsehen_1', 'parlamentsfernsehen_2'];

function parseShow(show, channelId) {
	let startTime = moment(show.anfangUnix * 1000);
	let endTime = moment(show.endeUnix * 1000);
	let subtitle = show.live[0];
	if (!subtitle) {
		subtitle = 'Aufzeichnung vom ' + show.aufzeichnungsdatum[0];
	}
	return {
		title: show.langtitel[0],
		subtitle: subtitle,
		channel: channelId,
		startTime: startTime,
		endTime: endTime
	};
}

function getShow(xml, channelId) {
	return parse(xml).then(data => {
		for (let show of data.tvprogramm.sendung) {
			let parsedShow = parseShow(show, channelId);
			if (parsedShow.startTime.isBefore() && parsedShow.endTime.isAfter()) {
				return parsedShow;
			}
		}
		return { title: 'Sendepause' };
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
