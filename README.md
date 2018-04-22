# kttnkndy [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![npm](https://img.shields.io/npm/dt/kttnkndy.svg)](https://www.npmjs.com/package/kttnkndy)

![kttnkndy logo](https://bbyjins.skiilaa.me/img/kttnkndy/logo/transparent_landscape_small.png)

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

# Quick Start

First, we'll need to initialize a kttn instance. You should do this for every service running on the same console output.

```js
var kttn = require('kttnkndy')('main'); // Initializes a kttn instance, logs "16:54:41 - [main] Initialized."
```

## Basic logging and errors

Something you probably do in every project you build is logging. It's essential to debugging and making sure your project works.

kttnkndy makes it easy to differentiate between logging messages from different services.

```js
kttn.log('Hello world!'); // Outputs: "16:54:41 - [main] Hello world!"
kttn.error('Uh-oh... Something happened...'); // Outputs: "16:54:41 - [main] Uh-oh... Something happened..." on stderr
```

## Timers

To measure your project's performance, timers are essential. They measure how much time it took to do something.

In kttnkndy, it's easy to time things.

```js
var myTimer = kttn.timer('myTimer'); // Creates a timer instance, outputs: "16:54:42 - [myInstance] Started timer "myTimer"."
doSomething();
var ms = myTimer.end(); // Ends the timer, outputs: "16:55:42 - [myInstance] Ended timer "myTimer", took 60.663s.". Returns milliseconds.
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
 * options - A [KttnOptions](#kttnoptions) object.

#### Returns

newKttnInstance returns a [KttnInstance](#kttninstance).

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

This is [kttnLog](#kttnlog), but it logs the message to `stderr`.

### kttnTimer

kttnTimer is the function returned on `kttn.timer`.

#### Example

```js
var timer = kttn.timer('myTimer');
```

#### Parameters

 * name - The name of the timer. (string)

#### Returns

kttnTimer returns a [KttnTimer](#kttntimer-1).

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
 * log - [kttnLog](#kttnlog) (function)
 * error - [kttnError](#kttnerror) (function)
 * timer - [kttnTimer](#kttntimer) (function)
 * timestamped - timestampedLog from [newKttnInstance](#newkttninstance)'s [options](#kttnoptions). (bool)

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
 * end - [kttnEndTimer](#kttnendtimer) (function)
 * log - [kttnLog](#kttnlog) (function)
 * timestamped - timestampedLog from [newKttnInstance](#newkttninstance)'s [options](#kttnoptions). (bool)
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
