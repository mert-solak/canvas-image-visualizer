import { MappedImage, Particle } from '../definitions';

export const createParticles = (
  image: HTMLImageElement,
  particleNumberMultiplier: number,
  velocityMultiplier: number,
  sizeMultiplier: number,
) => {
  const particles: Particle[] = [];

  for (let index = 0; index < image.width * particleNumberMultiplier; index += 1) {
    const x = Math.random() * image.width;
    particles.push({
      x,
      y: 0,
      speed: 0,
      velocity: Math.random() * velocityMultiplier,
      size: Math.random() * sizeMultiplier + 1,
    });
  }

  return particles;
};

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
