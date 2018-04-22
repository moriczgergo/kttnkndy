/**
 * @typedef {Object} KtnnTimer
 * @property {string} timerName The name of the timer instance
 * @property {number} startTime The start timestamp
 * @property {function} end
 * @property {function} log
 * @property {boolean} timestamped Should log print the time of execution?
 * @property {string} name The name of the kttn instance
 */

/**
 * @typedef {Object} KttnInstance
 * @property {string} name The instance name
 * @property {function} log
 * @property {function} error
 * @property {function} timer
 * @property {boolean} timestamped Should log and error print the time of execution?
 */

/**
 * @typedef {Object} KttnOptions
 * @property {boolean} [showInitializedMessage=true] Should an initialized message be printed?
 * @property {boolean} [timestampedLog=true] Should log and error print the time of execution?
 */

/**
 * Logs a message in the instance.
 * @param {string} message Log message
 */
function kttnLog (message) {
  var timestamp = this.timestamped ? new Date().toLocaleTimeString() + ' - ' : '' // Build timestamp text - if needed.
  console.log(`${timestamp}[${this.name}] ${message}`) // Log message.
}

/**
 * Logs an error in the instance.
 * @param {string} message Error message
 */
function kttnError (message) {
  var timestamp = this.timestamped ? new Date().toLocaleTimeString() + ' - ' : '' // Build timestamp text - if needed.
  console.error(`${timestamp}[${this.name}] ${message}`) // Log error.
}

/**
 * Ends the timer.
 * @returns {Number} Timer length in milliseconds
 */
function kttnEndTimer () {
  var length = Date.now() - this.startTime // Get timer length
  if (length < 1) { // If timer length is less than 1 second
    this.log(`Ended timer "${this.name}", took ${length}ms.`) // Log length in milliseconds
  } else {
    this.log(`Ended timer "${this.name}", took ${length / 1000}s.`) // Log length in seconds
  }
  return length
}

/**
 * Creates a timer instance.
 * @param {string} name Timer name
 * @returns {KttnTimer} The new timer
 */
function kttnTimer (name) {
  var startTime = Date.now() // Take a timestamp
  this.log(`Started timer "${name}".`)

  return {
    timerName: name, // Timer name
    startTime, // Timer's start timestamp
    end: kttnEndTimer, // Timer ender function
    log: this.log, // Pass on logger function
    timestamped: this.timestamped, // Pass on timestamped for logger function
    name: this.name // Instance name for logger function
  }
}

/**
 * Creates a new kttn instance.
 * @param {string} instanceName The instance name
 * @param {KttnOptions} options The instance options
 * @returns {KttnInstance} The new instance
 */
function newKttnInstance (instanceName, options) {
  var checkedOptions = Object.assign({ // Take the default options as default, and override specified options
    showInitializedMessage: true,
    timestampedLog: true
  }, options)

  var instance = {
    name: instanceName, // Name of the instance
    log: kttnLog, // The logging function
    error: kttnError,
    timer: kttnTimer, // The timer function
    timestamped: checkedOptions.timestampedLog // timestampedLog option
  }

  if (checkedOptions.showInitializedMessage) { // Check for the initialized message option
    instance.log('Initialized.') // Log the initialized message
  }

  return instance
}

module.exports = newKttnInstance
