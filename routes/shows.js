const downloader = require('./../downloader/show-downloader');

function sendErrorResponse(e, res) {
	let message = e.message;
	if (typeof(message) === 'undefined') {
		message = e;
	}

	console.error(message);
	res.send({error: message});
}

function sendShowsResponse(shows, res) {
	res.send({shows: shows });
}

exports.findAll = function(req, res) {
	downloader.getShows()
		.then(shows => sendShowsResponse(shows.filter(show => show !== null), res))
		.catch(e => sendErrorResponse(e, res));
};

exports.findByChannel = function(req, res) {
	downloader.getShow(req.params.channelId)
		.then(show => sendShowsResponse(show === null ? [] : [show], res))
		.catch(e => sendErrorResponse(e, res));
};
