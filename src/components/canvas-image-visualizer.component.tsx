import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useImmutableRef } from '@mertsolak/use-immutable-ref';

import { Props, Particle, MappedImage } from '../definitions';
import { colorHelper, particleHelper } from '../helpers';
import { canvasConfig } from '../configs';

export const CanvasImageVisualizer: React.FC<Props> = ({
  particleNumberMultiplier = canvasConfig.defaults.particleNumberMultiplier,
  velocityMultiplier = canvasConfig.defaults.velocityMultiplier,
  backgroundColor = canvasConfig.defaults.backgroundColor,
  sizeMultiplier = canvasConfig.defaults.sizeMultiplier,
  removeBlackArea = canvasConfig.defaults.removeBlackArea,
  drawer = canvasConfig.defaults.drawer,
  drawerColor,
  className,
  src,
}) => {
  const [canvas, setCanvas] = useImmutableRef<HTMLCanvasElement>();
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>();
  const [image, setImage] = useState<HTMLImageElement | undefined>();

  const mouseCoordinateRef = useRef({ x: 0, y: 0 });

  /**
   * draws particles recursively and updates
   * coordinates and velocities for the next frames
   * @param contextParam @type CanvasRenderingContext2D
   * @param imageParam @type HTMLImageElement
   * @param particles @type particles[]
   * @param mappedImage @type MappedImage
   */
  const draw = useCallback(
    (
      contextParam: CanvasRenderingContext2D,
      imageParam: HTMLImageElement,
      particles: Particle[],
      mappedImage: MappedImage,
    ) => {
      contextParam.fillStyle = backgroundColor;
      contextParam.globalAlpha = canvasConfig.defaults.globalAlpha;
      contextParam.fillRect(0, 0, imageParam.width, imageParam.height);

      particles.forEach((particle) => {
        contextParam.beginPath();
        contextParam.fillStyle = mappedImage[Math.floor(particle.y)][Math.floor(particle.x)].color;
        if (particle.text) {
          contextParam.font = `${particle.size}`;
          contextParam.fillText(particle.text, particle.x, particle.y);
        } else {
          contextParam.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          contextParam.fill();
        }
      });

      const updatedParticles = particleHelper.updateParticles(particles, imageParam, mappedImage);
      requestAnimationFrame(() => draw(contextParam, imageParam, updatedParticles, mappedImage));
    },
    [backgroundColor],
  );

  /**
   * sets given image height and width to canvas
   */
  useEffect(() => {
    if (!canvas || !image) {
      return;
    }

    canvas?.setAttribute('width', image.width.toString());
    canvas?.setAttribute('height', image.height.toString());
  }, [canvas, image]);

  /**
   * sets event listener to follow cursor
   * and sets context
   */
  useEffect(() => {
    if (!canvas) {
      return () => {};
    }

    const context2D = canvas?.getContext('2d');
    setContext(context2D);

    const mouseMove = (event: MouseEvent) => {
      mouseCoordinateRef.current = {
        x: event.offsetX,
        y: event.offsetY,
      };
    };

    document?.addEventListener('mousemove', mouseMove);
    return () => document?.removeEventListener('mousemove', mouseMove);
  }, [canvas]);

  /**
   * creates mappedImage, particles and
   * starts drawing
   */
  useEffect(() => {
    if (!context || !image) {
      return;
    }

    context.drawImage(image, 0, 0, image.width, image.height);
    const pixels = context.getImageData(0, 0, image.width, image.height);
    context.clearRect(0, 0, image.width, image.height);

    const mappedImage = colorHelper.createMappedImage(pixels, image, removeBlackArea, drawerColor);
    const particles = particleHelper.createParticles(
      image,
      particleNumberMultiplier,
      velocityMultiplier,
      sizeMultiplier,
      drawer,
    );

    draw(context, image, particles, mappedImage);
  }, [draw, context, image]);

  /**
   * sets image when it is loaded
   */
  useEffect(() => {
    if (!src) {
      return;
    }

    const newImage = new Image();
    newImage.src = src;
    newImage.onload = () => {
      setImage(newImage);
    };
  }, [src]);

  return (
    <canvas
      style={{ backgroundColor, margin: 0, padding: 0, display: 'block' }}
      className={className}
      ref={setCanvas}
    />
  );
};