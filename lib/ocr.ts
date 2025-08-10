import Tesseract from 'tesseract.js'

export async function ocrImage(file: File){
  const worker = await Tesseract.createWorker()
  // @ts-ignore
  await worker.loadLanguage('chi_sim')
  // @ts-ignore
  await worker.initialize('chi_sim')
  const { data } = await worker.recognize(file)
  await worker.terminate()
  return data.text
}
