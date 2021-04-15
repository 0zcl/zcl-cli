const fs = require('fs-extra')
const path = require('path')

const exsit = fs.existsSync(path.join(__dirname, '../hello-world1'))
console.log('exsit', exsit) // true or false