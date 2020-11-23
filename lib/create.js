const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Creator = require('./Creator')

module.exports = async function(projectName, option) {
  // 判断文件是否存在，是否覆蓋
  const cwd = process.cwd() // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, projectName) // 工作目录
  console.log('targetDir', targetDir, option)
  if (fs.existsSync(targetDir)) {
    if (option.force) await fs.remove(targetDir)  // 强制删除
    else {
      // 询问是否覆盖
      const {action} = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists. Pick an action:',
          choices: [
            {name: 'Overwrite', value: 'overwrite'},
            {name: 'Cancel', value: 'cancel'}
          ]
        }
      ])
      if (action === 'cacal') return
      else if (action === 'overwrite') {
        console.log('removing ....')
        await fs.remove(targetDir)
      }
    }
  }
  
  // 创建项目
  const creator = new Creator(projectName, targetDir)
  creator.create()
}