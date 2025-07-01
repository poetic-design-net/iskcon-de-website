/**
 * Debounce function to limit the rate at which a function can fire
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the passed function
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout>;
	
	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Debounce function that returns a promise
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version that returns a promise
 */
export function debounceAsync<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
	let timeout: ReturnType<typeof setTimeout>;
	
	return function executedFunction(...args: Parameters<T>): Promise<ReturnType<T>> {
		return new Promise((resolve) => {
			const later = () => {
				clearTimeout(timeout);
				resolve(func(...args) as ReturnType<T>);
			};
			
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		});
	};
}