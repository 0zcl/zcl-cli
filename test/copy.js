const fs = require('fs-extra')
const path = require('path')
// copy file
fs.copySync(path.join(__dirname, 'test.txt'), path.join(__dirname, 'test_copy.txt'))

// copy directory, even if it has subdirectories or files
fs.copySync(path.join(__dirname, 'hello-world'), path.join(__dirname, 'hello-world_copy'))