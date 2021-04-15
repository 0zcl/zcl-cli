const inquirer = require('inquirer')

async function getProjectAskInfo(projectName) {
  const askInfos = [
    {
      name: 'projectName',
      message: '项目/包的名称',
      default: projectName
    }, {
      name: 'projectVersion',
      message: '项目/包的版本号',
      default: '1.0.0'
    }, {
      name: 'projectDescription',
      message: '项目/包的简介',
      default: `A project named ${projectName}`
    }
  ];
  return await inquirer.prompt(askInfos)
}

async function getAutoInstallType() {
  const askInfos = [{
    type: 'list',
    message: '请选择更新npm工具',
    name: 'installType',
    choices: [
      {
        name: "npm",
        message: 'npm'
      },
      {
        name: 'cnpm',
        message: 'cnpm'
      },
      {
        name: 'yarn',
        message: 'yarn'
      }
    ]
  }]
  return await inquirer.prompt(askInfos)
}

module.exports = {
  getProjectAskInfo,
  getAutoInstallType
}