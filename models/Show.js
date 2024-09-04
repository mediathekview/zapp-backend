import moment from "moment-timezone";

export default class Show {

	constructor(title) {
		this.title = title;
	}

	isRunningNow() {
		return this.startTime.isBefore() && this.endTime.isAfter();
	}

	fixMidnightTime() {
		if (this.startTime.isAfter(this.endTime)) {
			// show runs at midnight
			if (moment.tz("Europe/Berlin").hour() < 12) {
				// now is morning - startTime was yesterday
				this.startTime.subtract(1, "d");
			} else {
				// now is evening - end time is tomorrow
				this.endTime.add(1, "d");
			}
		}
	}

	clone() {
		let show = new Show(this.title);
		show.description = this.description;
		show.channel = this.channel;
		show.subtitle = this.subtitle;
		show.infoUrl = this.infoUrl;
		show.startTime = this.startTime;
		show.endTime = this.endTime;
		return show;
	}
}
