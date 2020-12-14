const axios = require('axios')
const { tplUrl } = require('../config/setting.js')

axios.interceptors.response.use(res => res.data)

async function getTemplateList() {
  return axios.get(tplUrl)
}


module.exports = {
  getTemplateList,
}