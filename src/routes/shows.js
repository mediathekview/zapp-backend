import downloader from "../downloader/show-downloader.js";

function sendErrorResponse(e, res) {
	let message = e.message;
	if (typeof (message) === "undefined") {
		message = e;
	}

	console.error(message);
	res.send({error: message});
}

function sendShowsResponse(shows, res) {
	res.send({shows: shows});
}

function findByChannel(req, res) {
	downloader.getShows(req.params.channelId)
		.then(shows => sendShowsResponse(shows, res))
		.catch(e => sendErrorResponse(e, res));
}

export default {findByChannel};
