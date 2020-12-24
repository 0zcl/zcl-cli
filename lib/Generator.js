const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const { logger } = require('./utils')
const rm = require('rimraf').sync
const path = require('path')

class Generator {
  constructor() {
    this.metalsmith = Metalsmith(process.cwd())
    this.config = {}
  }
  
  run(config) {
    this.config = config
    const { metadata, sourceName, destination } = this.config
    this.metalsmith = this.metalsmith.metadata(metadata) // metadata 为用户输入的内容
      .clean(false)
      .source(sourceName)
      .destination(destination)
      .use(this.generateTemplate)
      .build(err => {
        rm(path.resolve(process.cwd(), sourceName))
        if (err) {
          logger.error(`Metalsmith build error: ${err}`)
         }
      })
  }

  generateTemplate(files, metalsmith, done) {
    console.log('metadata', metalsmith.metadata())
    Object.keys(files).forEach(fileName => { //遍历替换模板
      try {
        const regs = /\.(png|jpe?g|gif|svg)$/
        // 字体文件、图片等不能用 handlebar 替换: https://www.jianshu.com/p/a8804047d4ed
        if (!/\.(png|jpe?g|gif|svg)$/.test(fileName) || /\.(woff2?|eot|ttf|otf)$/.test(fileName)) {
          const fileContentsString = files[fileName].contents.toString()
          files[fileName].contents = new Buffer.from(Handlebars.compile(fileContentsString)(metalsmith.metadata()))
        }
      } catch (err) {
        logger.error(`fileName------------${fileName}`);
        logger.error(`err -------------${err}`);
      }
     })
    done()
  }
}

module.exports = Generator