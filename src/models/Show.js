export default class Show {

	constructor(title) {
		this.title = title;
	}

	isRunningNow() {
		return this.startTime.isBefore() && this.endTime.isAfter();
	}
}
