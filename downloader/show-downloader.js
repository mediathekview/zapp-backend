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
	for (let downloader of downloaders) {
		if (downloader.channelIds.includes(channelId)) {
			return downloader.getShow(channelId);
		}
	}
	return Promise.reject('no downloader available');
};
