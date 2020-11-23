const ora = require('ora');

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message)
  spinner.start()
  const data = await fn(...args)
  spinner.succeed()
  return data
}

module.exports = {
  wrapLoading
}