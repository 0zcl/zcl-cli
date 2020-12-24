// const spawn = require('child_process').spawn;
// const child = spawn('ls', ['-l']) // cwd 指定子进程的工作目录，默认当前目录
// // console.log(child.stdout)
// child.stdout.pipe(process.stdout);
// console.log(process.pid, child.pid); // 主进程id3243 子进程3244


// const exec = require('child_process').exec;

// exec(`node -v`, (error, stdout, stderr) => {
//     console.log({ error, stdout, stderr })
//     // { error: null, stdout: 'v8.5.0\n', stderr: '' }
// })

// const execFile = require('child_process').execFile;

// execFile(`node`, ['-v'], (error, stdout, stderr) => {
//     console.log({ error, stdout, stderr })
//     // { error: null, stdout: 'v8.5.0\n', stderr: '' }
// })

const spawn = require('child_process').spawn;
const child = spawn('npm', ['install'], {
    stdio: 'inherit',
    // 仅在当前运行环境为 Windows 时，才使用 shell
    shell: process.platform === 'win32'
}) // cwd 指定子进程的工作目录，默认当前目录
// console.log(child.stdout)
// child.stdout.pipe(process.stdout);
console.log('主线程', process.pid, child.pid); // 主进程id3243 子进程3244
child.on('close', (code) => {
    console.log(`子进程使用代码 ${code} 关闭所有 stdio`);
});
child.on('exit', (code) => {
    console.log(`子进程使用代码 ${code} 退出`);
});