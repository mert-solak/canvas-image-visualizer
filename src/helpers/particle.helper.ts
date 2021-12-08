import { Drawer, MappedImage, Particle } from '../definitions';

/**
 * creates particles with initial values
 * @param image @type HTMLImageElement
 * @param particleNumberMultiplier @type number
 * @param velocityMultiplier @type number
 * @param sizeMultiplier @type number
 * @param drawer @type Drawer
 * @returns Particle[]
 */
export const createParticles = (
  image: HTMLImageElement,
  particleNumberMultiplier: number,
  velocityMultiplier: number,
  sizeMultiplier: number,
  drawer: Drawer,
) => {
  const particles: Particle[] = [];

  for (let index = 0; index < image.width * particleNumberMultiplier; index += 1) {
    const x = Math.random() * image.width;
    let text: string;

    if (drawer.type === 'text') {
      text = drawer.textOptions[Math.floor(Math.random() * drawer.textOptions.length)];
    }

    particles.push({
      x,
      y: 0,
      text,
      speed: 0,
      size: Math.random() * sizeMultiplier + 1,
      velocity: Math.random() * velocityMultiplier,
    });
  }

  return particles;
};

/**
 * updates particle positioning for the animation
 * @param particles @type Particle[]
 * @param imageParam  @type HTMLImageElement
 * @param mappedImage  @type MappedImage
 * @returns Particle[]
 */
export const updateParticles = (
  particles: Particle[],
  imageParam: HTMLImageElement,
  mappedImage: MappedImage,
) =>
  particles.map((particle) => {
    const speed = mappedImage[Math.floor(particle.y)][Math.floor(particle.x)].brightness;
    const movement = 2.75 - speed + particle.velocity;

    let y = particle.y + movement;
    if (y > imageParam.height) {
      y = 0;
    }

    return {
      ...particle,
      y,
      speed,
    };
  });
