const { exec, execFile, spawn } = require('child_process')
const child = spawn('node', ['-v']) // 子进程
// console.log('child.stdout', child.stdout)
child.stdout.pipe(process.stdout)
console.log(process.pid, child.pid)
/*
12432 9912
v10.16.2
*/


exec(`node -v`, (error, stdout, stderr) => {
  console.log('exec', { error, stdout, stderr })
})
/*
{ error: null, stdout: 'v10.16.2\r\n', stderr: '' }
*/


execFile(`node`, ['-v'], (error, stdout, stderr) => {
  console.log('execFile', { error, stdout, stderr })
})
/*
{ error: null, stdout: 'v10.16.2\r\n', stderr: '' }
*/


console.log('platform ===>', process.platform)
const childProcess = spawn('npm', ['install'], {
    stdio: 'pipe', // stdio：配置父进程和子进程之间建立的管道。默认为pipe
    // shell默认为false, 仅在当前运行环境为 Windows 时，才使用 shell
    shell: process.platform === 'win32'
})
childProcess.stdout.pipe(process.stdout)
console.log('主进程', process.pid, childProcess.pid)

childProcess.on('close', (code) => {
    console.log(`子进程使用代码 ${code} 关闭所有 stdio`)
})

childProcess.on('exit', (code) => {
    console.log(`子进程使用代码 ${code} 退出`)
})
/*

audited 431 packages in 2.051s
found 7 vulnerabilities (3 low, 4 high)
  run `npm audit fix` to fix them, or `npm audit` for details
子进程使用代码 0 退出
子进程使用代码 0 关闭所有 stdio
*/
