const path = require('path')
const fs = require('fs')

module.exports = function (source, map) {
  const result = source.replace(/{include:(.+?)}/g, (m, value) => {
    const exp = value.split(/\./).slice(1).join('.')
    if (['html', 'js', 'css', 'vue'].includes(exp)) {
      const lang = exp
      //const content = fs.readFileSync(path.resolve(__dirname, '../../../codes/' + value))
      const content = fs.readFileSync(path.resolve(__dirname, '../components/' + value))
      return wrap(content, lang)
    }
  })
  this.callback(null, result, map)
}

function wrap(code, lang) {
  return '```' + lang + "\n" + code.toString().trim() + "\n" + '```'
}
