const cache = require('./cache');

const downloaders = [
	require('./ard-downloader'),
	require('./zdf-downloader'),
	require('./dw-downloader')
];

exports.getShow = function(channelId) {
	// look up in cache
	let show = cache.getShow(channelId);
	if (show !== null) {
		return Promise.resolve(show);
	}

	// download
	for (let downloader of downloaders) {
		if (downloader.channelIds.includes(channelId)) {
			return downloader.getShow(channelId).then(cache.save);
		}
	}

	// neither cache nor download available
	return Promise.reject('no downloader available');
};
