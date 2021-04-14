const { getTemplateList } = require('./request.js')
const inquirer = require('inquirer')
const { wrapLoading } = require('./utils')
const download = require('download-git-repo')
const path = require('path')
const util = require('util')
const { TEMPLATE_NAME } = require('../config/setting')
const { getProjectAskInfo, getAutoInstallType } = require('../config/ask')
const Generator = require('./Generator')
const { logger } = require('./utils')
const autoInstall = require('./autoInstall')


class Creator {
  constructor(projectName, targetDir) {
    this.projectName = projectName
    this.rootPath = process.cwd()
    this.target = targetDir
    this.downloadGitRepo = util.promisify(download)
    this.generator = new Generator()
  }

  async getTemplateUrl() {
    const tplLists = await wrapLoading(getTemplateList, '获取横版信息')
    if (!tplLists) return
    const templateList = Object.values(tplLists).map(item => ({ name: item.name, value: item.git }))
    const {templateUrl} = await inquirer.prompt([
      {
        name: 'templateUrl',
        type: 'list',
        choices: templateList,
        message: '请选择创建项目类型'
      }
    ])
    return templateUrl
  }

  async download(templateUrl) {
    const destination = path.resolve(this.rootPath, TEMPLATE_NAME)
    await wrapLoading(this.downloadGitRepo, '下载模版', `direct:${templateUrl}`, destination, {clone: true})
  }

  async getProjectInfo() {
    const projectAskInfo = await getProjectAskInfo(this.projectName)
    this.generator.run({
      metadata: {
        ...projectAskInfo
      },
      sourceName: TEMPLATE_NAME,
      destination: this.projectName
    })
  }

  async autoInstall() {
    const { installType } = await getAutoInstallType()
    process.chdir(path.join(this.rootPath, this.projectName))
    autoInstall(installType, {
      showDetail: true,
      onClose: code => {
        if(code[0] === 0) {
					logger.success('👉  Get started with the following commands:\n\n')
					logger.info('====================')
					logger.info(`cd ${this.projectName} \n\nnpm run dev`)
					logger.info('====================')
				}
      }
    })
  }

  async create() {
    // 思路：
    // 1、获取模版列表：http://gitlab.61info.com:8190/zcl/tpc-cli/snippets/3/raw
    const templateUrl = await this.getTemplateUrl()
    // 2、下载
    await this.download(templateUrl)
    // 3、获取用户输入信息、通过文件流，将输入信息合并成新项目、删除旧(暂存)的项目
    await this.getProjectInfo()

    // 4、npm自动安装
    await this.autoInstall()
  }

}

module.exports = Creator