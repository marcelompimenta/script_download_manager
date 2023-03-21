const fs = require('fs')
const path = require('path')
const regex = /[\w.]+(?:\/[\w.]+)+(?:.\w+)?/

function createNewFile(file) {
  fs.writeFile('data.js', `export const data = [${file}]`, err => {
    if (err) throw err

    console.log("arquivo criado com sucesso")

  })
}

fs.readFile(path.join(__dirname, 'paths.txt'), { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err

  const newData = data.split('&').map(i => `"${i.match(regex)}.svg"\n`)
  const finalData = newData.toString().split(',')

  createNewFile(finalData)

  console.log(finalData)
})
