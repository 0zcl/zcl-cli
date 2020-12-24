const ora = require('ora');
const chalk = require("chalk");

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message)
  spinner.start()
  const data = await fn(...args)
  spinner.succeed()
  return data
}

const logger = {
  info(msg) {
    console.info(chalk.blue(msg));
  },
  success(msg) {
    console.log(chalk.green(msg));
  },
  error(msg) {
    console.error(chalk.red(msg));
  },
};

module.exports = {
  wrapLoading,
  logger
}