/**
 * @param {Instant} instant
 * @return boolean
 */
export default function isInPast(instant) {
	const now = Temporal.Now.instant();
	return Temporal.Instant.compare(instant, now) === -1;
}
