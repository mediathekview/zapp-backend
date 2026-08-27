import isInPast from "../helper/isInPast.js";
import isInFuture from "../helper/isInFuture.js";

export default class Show {

	constructor(title) {
		this.title = title;
	}

	isRunningNow() {
		return isInPast(this.startTime) && isInFuture(this.endTime);
	}

	isFinished() {
		return isInPast(this.endTime);
	}
}
