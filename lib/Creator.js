const { getTemplateList } = require('./request.js')
const inquirer = require('inquirer')
const { wrapLoading } = require('./utils')
const download = require('download-git-repo')
const path = require('path')
const util = require('util')

class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName
    this.rootPath = process.cwd()
    this.target = targetDir
    this.downloadGitRepo = util.promisify(download)
  }

  async getTemplateUrl() {
    const tplLists = await wrapLoading(getTemplateList, '获取横版信息')
    console.log('tplLists', tplLists)
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
    const destination = path.resolve(this.rootPath, `abc`)
    await wrapLoading(this.downloadGitRepo, '下载模版', `direct:${templateUrl}`, destination, {clone: true})
  }

  async create() {
    console.log('begin create')
    // 思路：
    // 1、获取模版列表：http://gitlab.61info.com:8190/zcl/tpc-cli/snippets/3/raw
    const templateUrl = await this.getTemplateUrl()
    // 2、下载
    await this.download(templateUrl)
  }

}

module.exports = Creator