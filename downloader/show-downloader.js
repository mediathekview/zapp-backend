const cache = require('./cache');

const downloaders = [
	require('./zdf-downloader')
];

const channelIds = downloaders.reduce((ids, downloader) =>
	ids.concat(downloader.channelIds), []
);

exports.getShows = function() {
	return Promise.all(channelIds.map(channelId => {
		return exports.getShow(channelId).catch(e => {
			console.error(e.message);
			return null;
		});
	}));
};

exports.getShow = function(channelId) {
	let show = cache.getShow(channelId);
	if (show !== null) {
		return Promise.resolve(show);
	}

	for (let downloader of downloaders) {
		if (downloader.channelIds.includes(channelId)) {
			let show = downloader.getShow(channelId);
			show.then(cache.save);
			return show;
		}
	}
	return Promise.reject('no downloader available');
};
