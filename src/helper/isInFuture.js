/**
 * @param {Instant} instant
 * @return boolean
 */
export default function isInFuture(instant) {
	const now = Temporal.Now.instant();
	return Temporal.Instant.compare(instant, now) === 1;
}
