const request = require('request');
const moment = require('moment-timezone');
const xml2js = require('xml2js');

const url = 'http://programm.ard.de/TV/Programm/Load/NavJetztImTV35';
const parser = new xml2js.Parser({ strict: false });

const channelIdMap = {
	'Das Erste': ['das_erste'],
	'ONE': ['one'],
	'tagesschau24': ['tagesschau24'],
	'ARD-alpha': ['ard_alpha'],
	'BR Fernsehen': ['br_nord', 'br_sued'],
	'hr-fernsehen': ['hr'],
	'SR Fernsehen': ['sr'],
	'WDR Fernsehen': ['wdr'],
	'NDR Fernsehen': ['ndr_sh', 'ndr_nds', 'ndr_mv', 'ndr_hh'],
	'MDR Fernsehen': ['mdr_thueringen', 'mdr_sachsen_anhalt', 'mdr_sachsen'],
	'SWR Ferns. BW': ['swr_bw'],
	'SWR Ferns. RP': ['swr_rp'],
	'rbb Fernsehen': ['rbb_berlin', 'rbb_brandenburg'],
};

exports.channelIds = [
	'das_erste',
	'one',
	'tagesschau24',
	'ard_alpha',
	'br_nord',
	'br_sued',
	'hr',
	'sr',
	'wdr',
	'ndr_sh',
	'ndr_nds',
	'ndr_mv',
	'ndr_hh',
	'mdr_thueringen',
	'mdr_sachsen_anhalt',
	'mdr_sachsen',
	'swr_bw',
	'swr_rp',
	'rbb_berlin',
	'rbb_brandenburg',
];

let runningPromise = null;

function parseShows(show, showObj) {
	let infoLine = show.SPAN[1]._.trim();
	let channels = infoLine.split('|').map((s) => s.trim());
	let times = channels.pop().split(/ - | /).map((s) => s.trim());
	let startTime = moment.tz(times[0], 'HH:mm', 'Europe/Berlin');
	let endTime = moment.tz(times[1], 'HH:mm', 'Europe/Berlin');

	if (startTime.isAfter(endTime)) {
		// show runs at midnight
		if (moment().hour() < 12) {
			// now is morning - startTime was yesterday
			startTime.subtract(1, 'd');
		} else {
			// now is evening - end time is tomorrow
			endTime.add(1, 'd');
		}
	}

	let isValidShowTime = startTime.isBefore() && endTime.isAfter();
	for (let channel of channels) {
		let channelIds = channelIdMap[channel] || [];
		for (let channelId of channelIds) {
			if (isValidShowTime) {
				showObj[channelId] = {
					title: show.B[0],
					channel: channelId,
					startTime: startTime,
					endTime: endTime
				};
			} else {
				showObj[channelId] = null;
			}
		}
	}
}

function parse(xml) {
	return new Promise((resolve, reject) => {
		parser.parseString(xml, (err, data) => {
			if (err) {
				reject('parsing error ' + err);
			} else {
				resolve(data);
			}
		});
	});
}

function getAllShows(xml) {
	let validXml = `<root>${xml}</root>`;
	return parse(validXml)
		.then(data => {
			let showObj = {};
			for (let item of data.ROOT.LI) {
				parseShows(item.A[0].IMG[0], showObj);
			}
			return Promise.resolve(showObj);
		});
}

function requestShow() {
	return new Promise((resolve, reject) => {
		request.get({ url: url }, (err, res, data) => {
				if (err) {
					reject(err);
				} else if (res.statusCode !== 200) {
					return reject('wrong status code: ' + res.statusCode);
				} else {
					return resolve(data);
				}
		});
	});
}

exports.getShow = function (channelId) {
	function resolveFromShows(shows) {
		let show = shows[channelId];
		if (show === null) {
			throw 'show info currently not available';
		} else {
			return show;
		}
	}

	if (runningPromise !== null) {
		return runningPromise.then(resolveFromShows);
	}

	runningPromise = requestShow().then(getAllShows);

	return runningPromise
		.then(() => {
			let p = runningPromise;
			runningPromise = null;
			return p;
		}, err => {
			runningPromise = null;
			throw err;
		})
		.then(resolveFromShows);
};
