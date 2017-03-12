const request = require('request');
const moment = require('moment-timezone');

const baseUrl = 'https://api.zdf.de/cmdm/epg/broadcasts?to=2017-03-11T12%3A58%3A42Z&limit=1&page=1&order=desc';
const headers = {
	"Host": "api.zdf.de",
	"Accept": "application/vnd.de.zdf.v1.0+json",
	"Api-Auth": "Bearer d2726b6c8c655e42b68b0db26131b15b22bd1a32",
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

exports.channelIds = ["zdf", "dreisat", "kika", "phoenix", "zdf_info", "zdf_neo", "arte"];

function getShow(json, channelId) {
	let broadcast = json['http://zdf.de/rels/cmdm/broadcasts'][0];

	return {
		title: broadcast.title,
		subtitle: broadcast.subtitle,
		channel: channelId,
		startTime: moment(broadcast.airtimeBegin),
		endTime: moment(broadcast.airtimeEnd)
	};
}

exports.getShow = function (channelId) {
	let urlChannel = channelIdMap[channelId];
	let url = `${baseUrl}&tvServices=${urlChannel}`;
	return new Promise((resolve, reject) => {
		request.get({
				url: url,
				json: true,
				headers: headers
			}, (err, res, data) => {
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
