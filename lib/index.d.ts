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
export declare const getTimeMinSec: (time: number) => [number, number];
/**
 * Converts time in seconds to minutes and seconds formatted as mm:ss (or a custom separator)
 * @param {number} time - Time in seconds
 * @param {string} [separator=':'] - String used to separate minutes and seconds
 * @returns {string} Formatted time
 */
export declare const getFormattedTime: (time: number, separator?: string) => string;
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
    constructor({ startTime, endTime, increment, infinite, autostart, onTick, onEnd }?: Config);
    /**
     * Private method
     * A tick run at each increment until time reaches endTime
     * Current time is passed to the callback
     */
    tick(): void;
    /**
     * Starts the timer at any moment.
     * Failsafed to prevent creating multiple interval instances.
     * Can be used to resume the timer after a stop.
     */
    start(cb?: (time: number) => void): void;
    /**
     * Stops the timer.
     */
    stop(cb?: (time: number) => void): void;
    /**
     * Sets the current time to startTime provided at the initialization.
     */
    reset(cb?: (time: number) => void): void;
}
export {};
