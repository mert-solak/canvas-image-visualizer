import { colorHelper } from '.';
import { MappedImage } from '../definitions';

/**
 * Calculates brightness of the pixel from colors
 * @param red @type number
 * @param green @type number
 * @param blue @type number
 * @returns number
 */
export const calculateRelativeBrightness = (red: number, green: number, blue: number) =>
  Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) / 100;

/**
 * creates an array that contains
 * color and brightness for the each pixels
 * @param pixels @type ImageData
 * @param image @type HTMLImageElement
 * @param removeBlackArea @type boolean
 * @param drawerColor @type string
 * @returns MappedImage
 */
export const createMappedImage = (
  pixels: ImageData,
  image: HTMLImageElement,
  removeBlackArea: boolean,
  drawerColor: string,
) => {
  const mappedImage: MappedImage = [];

  for (let heightIndex = 0; heightIndex < image.height; heightIndex += 1) {
    const row = [];
    for (let widthIndex = 0; widthIndex < image.width; widthIndex += 1) {
      const red = pixels.data[heightIndex * 4 * pixels.width + widthIndex * 4];
      const green = pixels.data[heightIndex * 4 * pixels.width + (widthIndex * 4 + 1)];
      const blue = pixels.data[heightIndex * 4 * pixels.width + (widthIndex * 4 + 2)];
      const brightness = colorHelper.calculateRelativeBrightness(red, green, blue);
      let color = `rgb(${red},${green},${blue})`;
      if (drawerColor) {
        color = drawerColor;
      }
      if (removeBlackArea && brightness === 0) {
        color = 'rgb(0, 0, 0)';
      }
      row.push({ brightness, color });
    }
    mappedImage.push(row);
  }

  return mappedImage;
};
