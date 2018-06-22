const path = require('path')
const fs = require('fs-extra')
const rootDir = require('app-root-path').path

const ready = () => {
  try {
    fs.remove(path.resolve(rootDir, 'dist'))
    console.log(`Remove Directory: ${path.resolve(rootDir, 'dist')}`)
  } catch (error) {
    console.log(error)
  }
}

ready()
