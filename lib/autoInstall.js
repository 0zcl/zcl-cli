const spawn = require('child_process').spawn;

module.exports = (installType, options = {}) => {
  const defaultOptions = {
    onExit: () => {},
    onClose: () => {},
    showDetail: false,
    cmdName: '',
  }
  options = Object.assign({}, defaultOptions, options)
  switch(installType) {
    case 'npm':
      options.cmdName = 'npm'
      break
    case 'cnpm':
      options.cmdName = 'cnpm'
      break
    case 'yarn':
      options.cmdName = 'yarn'
      break
  }

  const child = spawn(options.cmdName, ['install'], {
    stdio: options.showDetail ? 'inherit': 'pipe',
    // 仅在当前运行环境为 Windows 时，才使用 shell: https://zzz.buzz/zh/2017/02/11/node-js-cross-platform-spawn/
    shell: process.platform === 'win32'
  })
  
	child.on('exit', (...arg) => {
		options.onExit && options.onExit(arg)
  })
  
  child.on('close', (...arg) => {
		options.onClose && options.onClose(arg)
  })

}
