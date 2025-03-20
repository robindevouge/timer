# @robindevouge/timer

## About

A standalone timer, able to count up, down or indefinitely and triger callbacks at each tick and/or at the end.

Since it uses `setInterval`, it is not accurate and should not be used for critical timing.

Maintainer: Robin Devouge (hello@robindevouge.be)

Repository: https://github.com/robindevouge/timer.git

_Please do not request for additional features, this package was developed to suit my needs during projects (that is why this package is scoped instead of public). If you wish to customize it you are free to do so by respecting the attached license._

## Install

```console
npm install @robindevouge/timer
```

## Usage

### Import

```javascript
import Timer from '@robindevouge/timer';
```

### Initialization

```javascript
const timer = new Timer(config);
```

#### **config**

| Config      | Type       | Default | Description                                                                                                           |
| ----------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `startTime` | `number`   | `10`    | Time (in seconds) to start the timer from.                                                                            |
| `endTime`   | `number`   | `0`     | Time (in seconds) at which the timer will stop.                                                                       |
| `increment` | `number`   | `1`     | Time in seconds between each tick.                                                                                    |
| `infinite`  | `number`   | `false` | Whether or not the timer should continue indefinitely. Automatically set to true is startTime is the same as endTime. |
| `autostart` | `boolean`  | `false` | Whether or not to start the timer on init.                                                                            |
| `onTick`    | `function` | `null`  | Function called at each tick. Receives the current time as param.                                                     |
| `onEnd`     | `function` | `null`  | Function called once the timer reaches endTime.                                                                       |

### Methods

#### start()

Starts the timer. Can be used both for first start and restart after a `stop()`. Callback receives current time.

```javascript
timer.start(callback);
```

| Params       | Type       | Default | Description |
| ------------ | ---------- | ------- | ----------- |
| **callback** | `function` | `null`  | Callback    |

#### stop()

Stops (pauses) the timer. Callback receives current time.

```javascript
timer.stop(callback);
```

| Params       | Type       | Default | Description |
| ------------ | ---------- | ------- | ----------- |
| **callback** | `function` | `null`  | Callback    |

#### reset()

Resets the current time to `config.startTime` value. Callback receives current time.

```javascript
timer.reset(callback);
```

| Params       | Type       | Default | Description |
| ------------ | ---------- | ------- | ----------- |
| **callback** | `function` | `null`  | Callback    |

### Standalone functions

#### getTimeMinSec()

Converts time in seconds to minutes and seconds.

```javascript
import { getTimeMinSec } from '@robindevouge/timer';

const [min, sec] = getTimeMinSec(seconds);
```

| Params   | Type     | Description     |
| -------- | -------- | --------------- |
| **time** | `number` | Time in seconds |

#### getFormattedTime()

Converts time in seconds to a formatted string (`mm:ss` or a custom separator).

```javascript
import { getFormattedTime } from '@robindevouge/timer';

const formattedTime = getFormattedTime(seconds, separator);
```

| Params        | Type     | Default  | Description     |
| ------------- | -------- | -------- | --------------- |
| **time**      | `number` | required | Time in seconds |
| **separator** | `string` | `:`      | Separator       |
