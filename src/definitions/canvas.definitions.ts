export interface Props {
  src: string;
  particleNumberMultiplier?: number;
  velocityMultiplier?: number;
  backgroundColor?: string;
  sizeMultiplier?: number;
  className?: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Particle {
  x: number;
  y: number;
  speed: number;
  velocity: number;
  size: number;
}

export type MappedImage = { color: string; brightness: number }[][];
