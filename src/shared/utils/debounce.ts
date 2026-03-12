/**
 * Debounces a function by the given delay in ms.
 */
export function debounce<A extends unknown[]>(
	fn: (...args: A) => void,
	delayMs: number,
): (...args: A) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: A) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			timeoutId = null;
			fn(...args);
		}, delayMs);
	};
}
