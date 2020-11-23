const { fetchRepoList, fetchTagsList } = require('./request.js')
const inquirer = require('inquirer')
const { wrapLoading } = require('./utils')
const download = require('download-git-repo')
const path = require('path')
const util = require('util')

class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName
    this.target = targetDir
    this.downloadGitRepo = util.promisify(download)
  }

  async fetchRepos() {
    let repos = await wrapLoading(fetchRepoList, 'Get reposList')
    if (!repos) return
    repos = repos.map(item => item.name)
    const {repoName} = await inquirer.prompt([
      {
        name: 'repoName',
        type: 'list',
        choices: repos,
        message: 'please choice a template to create project'
      }
    ])
    return repoName
  }

  async fetchTags(reposName) {
    let tagsList = await wrapLoading(fetchTagsList, 'Get Tags', reposName)
    if (!tagsList) return
    tagsList = tagsList.map(item => item.name)
    const {tags} = await inquirer.prompt([
      {
        name: 'tags',
        type: 'list',
        choices: tagsList,
        message: 'please choice a tag of template'
      }
    ])
    return tags
  }

  async download(reposName, tags) {
    const destination = path.resolve(process.cwd(), `./${reposName}@${tags}`)
    await wrapLoading(this.downloadGitRepo, 'downloading Repo', `zhu-cli/${reposName}#${tags}`, destination)
  }

  async create() {
    // 思路：
    // 1、拉取用户下的仓库：https://api.github.com/orgs/zhu-cli/repos
    const reposName = await this.fetchRepos()
    // 2、找到要下载仓库的版本号：https://api.github.com/repos/zhu-cli/vue-template/tags
    const tags = await this.fetchTags(reposName)
    // 3、下载
    const downloaddUrl = await this.download(reposName, tags)
  }

}

module.exports = Creator