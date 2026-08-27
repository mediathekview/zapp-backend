export default class Cache {

	constructor() {
		this.showMap = {};
	}

	save(show, key) {
		key = key || show.channel;
		this.showMap[key] = show;
		return show;
	}

	getShow(channelId) {
		let show = this.showMap[channelId];

		if (!show) {
			return null;
		}

		if (show.isFinished()) {
			this.showMap[channelId] = null;
			return null;
		}

		return show;
	}

}
