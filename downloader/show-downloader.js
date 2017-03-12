const channels = require('./../models/channels');

exports.getShows = function() {
	return channels.ids.map(function (channelId) {
		return exports.getShow(channelId);
	});
};

exports.getShow = function(channelId) {
	return  {
		title: "The Title",
		subtitle: "The Subtitle",
		description: "description",
		channel: channelId,
		startTime: new Date().getTime(),
		endTime: new Date().getTime()
	};
};
