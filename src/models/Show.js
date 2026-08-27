import isInPast from "../helper/isInPast.ts";
import isInFuture from "../helper/isInFuture.ts";

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
