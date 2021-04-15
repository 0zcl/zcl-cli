const axios = require('axios')

axios.interceptors.response.use(res => res.data)

/**
 * 获取信息
 * @param {url} tplUrl 
 * @returns Function
 */
async function getTemplateList(tplUrl) {
  return axios.get(tplUrl)
}


module.exports = {
  getTemplateList,
}