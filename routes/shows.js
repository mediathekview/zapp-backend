const downloader = require('./../downloader/show-downloader');

exports.findAll = function(req, res) {
	res.send(downloader.getShows());
};

exports.findByChannel = function(req, res) {
	res.send([downloader.getShow(req.params.channelId)]);
};
