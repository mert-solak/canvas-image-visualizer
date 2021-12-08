export interface Props {
  src: string;
  particleNumberMultiplier?: number;
  velocityMultiplier?: number;
  backgroundColor?: string;
  sizeMultiplier?: number;
  removeBlackArea?: boolean;
  className?: string;
  drawer?: Drawer;
  drawerColor?: string | undefined;
}

export type Drawer =
  | {
      type: 'text';
      textOptions: string[];
    }
  | {
      type: 'dot';
    };

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
  text: string;
}

export type MappedImage = { color: string; brightness: number }[][];

export interface CanvasConfigDefaults {
  globalAlpha: number;
  particleNumberMultiplier: number;
  velocityMultiplier: number;
  sizeMultiplier: number;
  backgroundColor: string;
  removeBlackArea: boolean;
  drawer: Drawer;
}
