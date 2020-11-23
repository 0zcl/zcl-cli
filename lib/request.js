const axios = require('axios')

axios.interceptors.response.use(res => res.data)

async function fetchRepoList() {
  return axios.get('https://api.github.com/orgs/zhu-cli/repos')
}

async function fetchTagsList(reposName) {
  return axios.get(`https://api.github.com/repos/zhu-cli/${reposName}/tags`)
}

module.exports = {
  fetchRepoList,
  fetchTagsList
}