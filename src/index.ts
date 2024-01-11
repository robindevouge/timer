/**
 * Standalone timer module.
 * Allows both timer and countdown — can start, stop and reset — can call functions at every step of its lifetime.
 * ⚠️ Time is not accurate ⚠️
 */

/**
 * Converts time in seconds to minutes and seconds
 * @param {number} time - Time in seconds
 * @returns {[number, number]} Array containing minutes and seconds
 */
export const getTimeMinSec = (time: number): [number, number] => {
	const m = Math.floor((time % 3600) / 60);
	const s = Math.floor((time % 3600) % 60);
	return [m, s];
};

/**
 * Converts time in seconds to minutes and seconds formatted as mm:ss (or a custom separator)
 * @param {number} time - Time in seconds
 * @param {string} [separator=':'] - String used to separate minutes and seconds
 * @returns {string} Formatted time
 */
export const getFormattedTime = (time: number, separator: string = ':'): string => {
	const t = getTimeMinSec(time);
	return `${t[0]}${separator}${t[1].toString().padStart(2, '0')}`;
};

interface Config {
	startTime?: number;
	endTime?: number;
	increment?: number;
	infinite?: boolean;
	onEnd?: () => void;
	onTick?: () => void;
	autostart?: boolean;
}

export default class Timer {
	/**
	 * @param {object} [config] - The config object
	 * @param {number} [config.startTime=10] - Time (in seconds) to start the timer from.
	 * @param {number} [config.endTime=0] - Time (in seconds) at which the timer will stop.
	 * @param {number} [config.increment=1] - Number of seconds to increment at each tick. Defaults to 1.
	 * @param {boolean} [config.infinite=false] - Whether or not the timer should continue indefinitely.
	 * @param {boolean} [config.autostart=false] - Whether or not to start the timer on init.
	 * @param {function} [config.onTick] - Function called at each tick (increment).
	 * @param {function} [config.onEnd] - Function called once the timer reaches endTime.
	 */

	startTime: number;
	endTime: number;
	increment: number;
	infinite: boolean;
	currentTime: number;
	interval: number | undefined;
	autostart: boolean;
	onTick: (time: number) => void;
	onEnd: () => void;

	constructor({ startTime = 10, endTime = 0, increment = 1, infinite = false, autostart = false, onTick = () => {}, onEnd = () => {} }: Config = {}) {
		this.startTime = startTime;
		this.endTime = endTime;
		this.infinite = infinite;
		this.currentTime = this.startTime;
		this.interval = undefined;
		this.autostart = autostart;
		this.onTick = onTick;
		this.onEnd = onEnd;

		// Defines if a countdown or a timer
		if (this.startTime <= this.endTime) {
			if (this.startTime === this.endTime) {
				this.infinite = true;
			}
			this.increment = Math.abs(increment);
		} else {
			this.increment = -Math.abs(increment);
		}

		if (this.autostart) {
			this.start();
		}
	}

	/**
	 * Private method
	 * A tick run at each increment until time reaches endTime
	 * Current time is passed to the callback
	 */
	tick() {
		this.currentTime += this.increment;
		this.onTick(this.currentTime);

		if (this.infinite) return;
		if (this.startTime <= this.endTime) {
			if (this.currentTime >= this.endTime) {
				this.onEnd();
				this.stop();
			}
		} else {
			if (this.currentTime <= this.endTime) {
				this.onEnd();
				this.stop();
			}
		}
	}

	/**
	 * Starts the timer at any moment.
	 * Failsafed to prevent creating multiple interval instances.
	 * Can be used to resume the timer after a stop.
	 */
	start(cb = (time: number) => {}) {
		if (!this.interval) {
			this.interval = window.setInterval(this.tick.bind(this), Math.abs(this.increment) * 1000);
			cb(this.currentTime);
		}
	}

	/**
	 * Stops the timer.
	 */
	stop(cb = (time: number) => {}) {
		clearInterval(this.interval);
		this.interval = undefined;
		cb(this.currentTime);
	}

	/**
	 * Sets the current time to startTime provided at the initialization.
	 */
	reset(cb = (time: number) => {}) {
		this.currentTime = this.startTime;
		cb(this.currentTime);
	}
}
