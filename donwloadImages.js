import { data } from "./data.js";
import axios from "axios";
import fs from 'fs'
import path from "path";
import readLine from 'readline'
const userFolderPath = process.env.USERPROFILE
const URL = "https://www.mercosul-line.com.br" //trocar pela url de destino dos arquivos


const nameOfFolder = 'mapas_rotas_mercosul_line'// o nome da pasta pode ser alterado para o qualquer outro

/**
 * @description folderCreationLocation  
 *@param __dirname, é o caminho padrão para criar a pasta dentro do diretorio, para trocar o local de criação da pasta, basta mudar removendo o @param __dirname por um caminho valido como por exemplo: 'Desktop' ou algo do tipo
*  
**/
const folderCreationLocation = __dirname

const listOfQuestions = [
  'Insira o nome da pasta:',
  'Insira o local de salvamento da pasta (Ex: Desktop): '
]

const reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

const createQuestion = (response, question, errMsg) => {
  reader.question(`\n${question}`, answer => {
    if (!answer) throw `\n${errMsg}\n`

    response = answer
    reader.close()
  })

  return response
}

const createFolder = (folderName, folderLocation) => {

  if (!folderName) throw '\nERRO: Não é possivel criar uma pasta sem nome!\n'

  fs.mkdir(path.join(userFolderPath, folderLocation, folderName), { recursive: true }, (err) => {
    if (err) throw err
    console.log('\nPasta criada com sucesso: ', path.join(userFolderPath, folderLocation, folderName), '\n')
  })

  return `${path.join(userFolderPath, folderLocation, folderName)}`
}

const folderLocation = createFolder('TESTE_TESTE_TESTE',)


const downloadFiles = async (fileURL, nameFile) => {

  await axios.get(fileURL, { responseType: "stream" }).then(response => {
    const outputFile = fs.createWriteStream(`${nameFile}`)

    response.data.pipe(outputFile)

    outputFile.on('finish', () => {
      console.log('Download concluido, com sucesso"')
    })

    outputFile.on('error', () => {
      console.log('Erro ao baixar a imagem!')
    })

  }).catch(err => {
    console.error('Erro ao fazer a requisação: ', err)
  })
}


const callFileDowloadFunction = async (folderLocation) => {

  for (let i = 0; i < data.length; i++) {
    downloadFiles(`${URL}/${data[i]}`, data[i].split('/')[3])

    await new Promise(resolve => setTimeout(resolve, 1500))
  }

}

// callFileDowloadFunction()





