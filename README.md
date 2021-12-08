## Canvas Image Visualizer

It visualizes images with given texts or shapes

![npm](https://img.shields.io/npm/v/@mertsolak/canvas-image-visualizer)
![license](https://img.shields.io/npm/l/@mertsolak/canvas-image-visualizer)
![size](https://img.shields.io/bundlephobia/min/@mertsolak/canvas-image-visualizer)
![issue](https://img.shields.io/github/issues/mert-solak/canvas-image-visualizer)

## Installation

Use node package manager to install @mertsolak/canvas-image-visualizer.

```bash
npm i @mertsolak/canvas-image-visualizer
```

## Basic Usage

```typescript
import { CanvasImageVisualizer } from '@mertsolak/canvas-image-visualizer';

const App = () => (
  <div>
    <CanvasImageVisualizer
      src="/image.png"
      particleNumberMultiplier={15}
      drawerColor="#03A062"
      drawer={{ textOptions: ['0', '1'], type: 'text' }}
    />
  </div>
);
```
