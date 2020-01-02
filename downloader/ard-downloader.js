const request = require('request');
const moment = require('moment-timezone');
const xml2js = require('xml2js');
const Show = require('../models/Show');

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
	'Radio Bremen': ['rb'],
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
	'rb',
];

let runningPromise = null;

function parseShows(showData, showObj) {
	let infoLine = showData.IMG[0].SPAN[1]._.trim();
	let channels = infoLine.split('|').map((s) => s.trim());
	let times = channels.pop().split(/ - | /).map((s) => s.trim());

	let show = new Show(showData.IMG[0].B[0]);
	show.infoUrl = 'http://programm.ard.de' + showData.$.HREF;
	show.startTime = moment.tz(times[0], 'HH:mm', 'Europe/Berlin');
	show.endTime = moment.tz(times[1], 'HH:mm', 'Europe/Berlin');
	show.fixMidnightTime();

	for (let channel of channels) {
		let channelIds = channelIdMap[channel] || [];
		for (let channelId of channelIds) {
			if (show.isRunningNow()) {
				show.channel = channelId;
				showObj[channelId] = show.clone();
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
				parseShows(item.A[0], showObj);
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
