import Cache from "./cache.js";
import ArdDownloader from "./ard-downloader.js";
import ZdfDownloader from "./zdf-downloader.js";
import ParliamentDownloader from "./parliament-downloader.js";

const cache = new Cache();

const downloaders = [
	ArdDownloader,
	ZdfDownloader,
	ParliamentDownloader,
];

/**
 * Maps channel ids to the last time a show for this channel was requested
 * an not found in cache. These timestamps can be used to throttle api calls.
 */
const requestTimeMap = {};

/**
 * Minimum time to wait between requesting unavailable channels in milliseconds.
 */
const minWaitTimeMillis = 2 * 60 * 1000; // 2 minutes


async function getShow(channelId) {
	// look up in cache
	let show = cache.getShow(channelId);
	if (show !== null) {
		console.log(`- ${channelId} was loaded from main cache`);
		return show;
	}

	// download
	for (let downloader of downloaders) {
		if (downloader.channelIds.includes(channelId)) {

			if (requestTimeMap[channelId] && (Date.now() - requestTimeMap[channelId]) < minWaitTimeMillis) {
				throw ("show info currently not available; api throtteling active");
			}

			requestTimeMap[channelId] = Date.now();
			return downloader.getShow(channelId).then(cache.save.bind(cache));
		}
	}

	// neither cache nor download available
	throw "no downloader available";
}

export default { getShow };
