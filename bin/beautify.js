const glob = require('glob')
const fs = require('fs-extra')
const path = require('path')
const rootDir = require('app-root-path').path
const beautify = require('js-beautify')

const opt = {
  indent_size: 2,
  end_with_newline: true,
  preserve_newlines: false,
  max_preserve_newlines: 0,
  wrap_line_length: 0,
  wrap_attributes_indent_size: 0
}

glob.sync(path.resolve(rootDir, 'dist/**/*.html')).map(file => {
  fs.readFile(file, 'utf8', (error, html) => {
    if (error) console.log(error)
    const result = beautify.html(html, opt)
    fs.writeFile(file, result, 'utf8', error => {
      if (error) console.log(error)
    })
  })
})
