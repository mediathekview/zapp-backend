const showMap = {};

exports.save = function (show) {
	showMap[show.channel] = show;
	return show;
};

exports.getShow = function (channelId) {
	let show = showMap[channelId];

	if (!show) {
		console.log('cache miss: ' + channelId);
		return null;
	}

	if (show.endTime.isBefore()) {
		console.log('cache miss: ' + channelId + ', show too old');
		showMap[channelId] = null;
		return null;
	}

	console.log('cache hit: ' + channelId + ' - ' + show);

	return show;
};
