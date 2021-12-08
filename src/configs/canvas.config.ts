import { CanvasConfigDefaults } from '../definitions';

export const defaults: CanvasConfigDefaults = {
  globalAlpha: 1,
  particleNumberMultiplier: 15,
  velocityMultiplier: 3.5,
  sizeMultiplier: 1.5,
  backgroundColor: 'black',
  removeBlackArea: true,
  drawer: {
    type: 'text',
    textOptions: ['0', '1'],
  },
};
