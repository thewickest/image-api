import * as sharp from 'sharp'
import { writeFileSync, mkdirSync, existsSync, readFileSync} from 'node:fs'
import { extname, basename } from 'node:path'
import { createHash } from 'crypto'
import axios from 'axios';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

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
  
  try {
    if (!existsSync(outputPath)) {
      mkdirSync(outputPath, { recursive: true });
    }
  } catch (error) {
    throw new InternalServerErrorException()
  }
  
  const imageBuffer = await getImage(inputPath)
  
  try {
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
  } catch (error) {
    throw new InternalServerErrorException()
  }
}

const getImage = async (path: string): Promise<Buffer> => {
  try {
    if(path.startsWith('https://')) {
      const response = await axios.get(path, { responseType: 'arraybuffer' })
      return Buffer.from(response.data)
    } else {
      return readFileSync(path)
    }
  } catch (error) {
    throw new BadRequestException('Something bad happened', {
      cause: error,
      description: error.toString()
    })
  }
}