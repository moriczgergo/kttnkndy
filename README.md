# kttnkndy [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![npm](https://img.shields.io/npm/dt/kttnkndy.svg)](https://www.npmjs.com/package/kttnkndy)
![kttnkndy logo](https://bbyjins.skiilaa.me/img/kttnkndy/logo/transparent_small.png)
kttnkndy (pronounced cotton candy) is a logging tool that actually helps your work.

# Features

 * Create differently named instances for different services.
 * Create timers to measure performance.

# Usage

```js
var kttn = require('kttnkndy')('myInstance'); // [myInstance] Initialized.

kttn.log('Hello World!'); // 16:54:41 - [myInstance] Hello World!

var myTimer = kttn.timer('myTimer'); // 16:54:42 - [myInstance] Started timer "myTimer".
doSomething(); // Run a time-consuming function...
myTimer.end(); // 16:55:42 - [myInstance] Ended timer "myTimer", took 60.663s.
```

# Documentation

## Functions

### newKttnInstance

newKttnInstance is the function returned on `require('kttnkndy')`.

#### Example

```js
var kttn = require('kttnkndy')('myInstance', {
  showInitializedMessage: true,
  timestampedLog: true
})
```

#### Parameters

 * instanceName - The name of the kttn instance. Appears in all log messages. (string)
 * options - A [KttnOptions](#KttnOptions) object.

#### Returns

newKttnInstance returns a [KttnInstance](#KttnInstance).

### kttnLog

kttnLog is the function returned on `kttn.log`.

#### Example

```js
kttn.log('Hello World!')
```

#### Parameters

 * message - The message to log. (string)

### kttnError

kttnError is the function returned on `kttn.error`.

This is [kttnLog](#kttnLog), but it logs the message to `stderr`.

### kttnTimer

kttnTimer is the function returned on `kttn.timer`.

#### Example

```js
var timer = kttn.timer('myTimer');
```

#### Parameters

 * name - The name of the timer. (string)

#### Returns

kttnTimer returns a [KttnTimer](#KttnTimer).

### kttnEndTimer

kttnEndTimer is the function returned on `timer.end`.

This ends the timer and logs a message with the time result.

#### Example

```js
timer.end();
```

#### Returns

kttnEndTimer returns a number, the milliseconds it took between the start of the timer and the end. This value is also logged.

## Objects

### KttnOptions

#### Properties

 * showInitializedMessage - Should an "initialized" message be shown? (bool) (default: true)
 * timestampedLog - Should a timestamp be shown in all messages? (bool) (default: true)

#### Example

```js
{
  showInitializedMessage: false
}
```

### KttnInstance

#### Properties

 * name - The kttn instance's name. (string)
 * log - [kttnLog](#kttnLog) (function)
 * error - [kttnError](#kttnError) (function)
 * timer - [kttnTimer](#kttnTimer) (function)
 * timestamped - timestampedLog from [newKttnInstance](#newKttnInstance)'s [options](#KttnOptions). (bool)

#### Example

```js
{
  name: 'myInstance',
  log: [function],
  error: [function],
  timer: [function],
  timestamped: true
}
```

### KttnTimer

#### Properties

 * timerName - The name of the timer instance. (string)
 * startTime - The UNIX timestamp of the start time of the timer. (number)
 * end - [kttnEndTimer](#kttnEndTimer) (function)
 * log - [kttnLog](#kttnLog) (function)
 * timestamped - timestampedLog from [newKttnInstance](#newKttnInstance)'s [options](#KttnOptions). (bool)
 * name - The name of the kttn instance. (string)

#### Example

```js
{
  timerName: 'myTimer',
  startTime: 1524411709,
  end: [function],
  log: [function],
  timestamped: true,
  name: 'myInstance'
}
```
