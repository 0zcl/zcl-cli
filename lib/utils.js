const ora = require('ora');
const chalk = require("chalk")
const fs = require('fs-extra')

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message)
  spinner.start()
  let data = null
  try {
    data = await fn(...args)
    spinner.succeed()
  } catch {
    spinner.fail(`${message} 失败`)
    throw new Error(`${message} error`)
  }
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

/**
 * zcl clone ffff --pageName=hellowrold
 * checkArgsPrams('pageName') // true
 * checkArgsPrams('force') // false
 * 检查命令是否带有params
 * @param {*} params 
 */
function checkArgsPrams(params, paramsObj) {
  return new Promise((resolve, reject) => {
    if (paramsObj[params]) resolve({ exist: true})
    else {
      logger.error(`命令未带--${params}参数`)
      reject({ exist: false })
    }
  })
}

/**
 * 复制目录或文件
 * @param {*} src
 * @param {*} dest 
 */
function cp(src, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copy(src, dest, err => {
        if (err) {
          logger.error('复制失败')
          reject({ copy: 'fail' })
        } else resolve({ copy: 'success' }) 
      })
    } else {
      logger.error('复制失败，复制源文件/目录不存在，或复制目标目录已存在')
    }
  })  
}

module.exports = {
  wrapLoading,
  logger,
  checkArgsPrams,
  cp
}