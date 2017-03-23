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

exports.findByChannel = function(req, res) {
	downloader.getShow(req.params.channelId)
		.then(show => sendShowsResponse(show === null ? [] : [show], res))
		.catch(e => sendErrorResponse(e, res));
};
