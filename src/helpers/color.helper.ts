import { colorHelper } from '.';
import { MappedImage } from '../definitions';

export const calculateRelativeBrightness = (red: number, green: number, blue: number) =>
  Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) / 100;

export const createMappedImage = (pixels: ImageData, image: HTMLImageElement) => {
  const mappedImage: MappedImage = [];

  for (let heightIndex = 0; heightIndex < image.height; heightIndex += 1) {
    const row = [];
    for (let widthIndex = 0; widthIndex < image.width; widthIndex += 1) {
      const red = pixels.data[heightIndex * 4 * pixels.width + widthIndex * 4];
      const green = pixels.data[heightIndex * 4 * pixels.width + (widthIndex * 4 + 1)];
      const blue = pixels.data[heightIndex * 4 * pixels.width + (widthIndex * 4 + 2)];
      const brightness = colorHelper.calculateRelativeBrightness(red, green, blue);
      const color = `rgb(${red},${green},${blue})`;
      row.push({ brightness, color });
    }
    mappedImage.push(row);
  }

  return mappedImage;
};
