import * as sharp from 'sharp'
import { writeFileSync, mkdirSync, existsSync, readFileSync} from 'node:fs'
import { extname, basename } from 'node:path'
import { createHash } from 'crypto'
import axios from 'axios';

/**
 * A functions that resize an image given a folde path or URL and saves it in the output folder.
 * @param inputPath 
 * @param outputFolder 
 * @param size 
 * @returns Returns and object containing the path and the md5 of the resized image
 */
export const resizeImage = async (inputPath: string, outputFolder: string, size: number) => {
  const extImage = extname(inputPath)
  const imageName = basename(inputPath, extImage)
  const outputPath = `${outputFolder}/${imageName}/${size}`
  const imageBuffer = await getImage(inputPath)
  
  if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true });
  }
  
  return sharp(imageBuffer)
    .resize({width: size})
    .toBuffer()
    .then(data => {
      const hash = createHash('md5')
      hash.update(data)
      const md5 = hash.digest('hex')
      const fullPath = `${outputPath}/${md5}${extImage}`
      writeFileSync(`${fullPath}`, data)
      return { md5, path: fullPath}
    })
}

export const getImage = async (path: string): Promise<Buffer> => {
  if(path?.startsWith('https://')) {
    const response = await axios.get(path, { responseType: 'arraybuffer' })
    return Buffer.from(response.data)
  } else {
    const buffer = readFileSync(path)
    return buffer
  }
}