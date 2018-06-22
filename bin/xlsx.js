const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs-extra')
const rootDir = require('app-root-path').path
const Utils = XLSX.utils

const config = require(path.resolve(rootDir, 'xlsx.config.js'))

const target = path.resolve(rootDir, `src/xlsx/${config.from.book}.xlsx`)
const book = XLSX.readFile(target)
const sheet = book.Sheets[config.from.sheets]

const main = () => {
  try {
    const dist = path.resolve(rootDir, `data`)
    const output = path.resolve(dist, `db.json`)

    if (!fs.existsSync(dist)) fs.mkdirsSync(dist)

    const json = Utils.sheet_to_json(sheet)

    fs.writeFile(output, JSON.stringify(json))
  } catch (error) {
    console.log(error)
  }
}

main()
