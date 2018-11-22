export default async function handleUpload (data) {
  const file = data
  try {
    const fileContents = readUploadedFileAsText(file)
    return fileContents
  } catch (e) {
    console.warn(e.message)
  }
}

function readUploadedFileAsText (inputFile) {
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result)
    }
    temporaryFileReader.readAsText(inputFile)
  })
}
