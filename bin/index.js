const _ = require('lodash')
const path = require('path')
const fs = require('fs-extra')
const rootDir = require('app-root-path').path
const Handlebars = require('handlebars')

/********** config **********/
const db = require(path.resolve(rootDir, 'data/db.json'))
const pageTemplate = require(path.resolve(rootDir, 'src/pages/index.js'))

/********** funciton **********/
const main = () => {
  try {
    _.forEach(db, data => {
      const dist = data.dist ? data.dist : ''
      const filename = data.filename ? `${data.filename}.html` : 'index.html'
      const distPath = path.resolve(rootDir, 'dist', dist)
      if (!fs.existsSync(distPath)) fs.mkdirsSync(distPath)

      const source = Handlebars.compile(pageTemplate)

      const app = source({ ...data })

      fs.writeFile(
        path.resolve(rootDir, 'dist', dist, filename),
        app,
        'utf8',
        error => {
          if (error) {
            console.log(error)
          } else {
            console.log(`Generated: dist/${dist}/${filename}`)
          }
        }
      )
    })
  } catch (error) {
    console.log(error)
  }
}

/********** execute **********/
main()
