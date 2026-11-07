export default class Cache {

	constructor() {
		this.showsMap = {};
	}

	save(shows, key) {
		key = key || shows[0].channel;
		this.showsMap[key] = shows;
		return shows;
	}

	getShows(channelId) {
		let shows = this.showsMap[channelId];

		if (!shows || shows.length === 0) {
			return null;
		}

		if (shows[0].isFinished()) {
			this.showsMap[channelId] = null;
			return null;
		}

		return shows;
	}

}
