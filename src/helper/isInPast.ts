export default function isInPast(instant: Temporal.Instant): boolean {
	const now = Temporal.Now.instant();
	return Temporal.Instant.compare(instant, now) === -1;
}
