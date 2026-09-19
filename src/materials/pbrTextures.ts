import * as THREE from 'three';

type Surface = 'plaster' | 'wood' | 'linen' | 'ceramic' | 'metal';

const SIZE = 512;

function repeatingNoise(x: number, y: number, scale: number, phase: number) {
  return (
    Math.sin((x * scale + phase) * Math.PI * 2) * 0.45 +
    Math.sin((y * scale * 0.73 - phase) * Math.PI * 2) * 0.25 +
    Math.sin(((x + y) * scale * 0.37 + phase * 2) * Math.PI * 2) * 0.3
  );
}

function detailField(x: number, y: number, surface: Surface) {
  if (surface === 'wood') {
    const grain = Math.sin((y * 110 + Math.sin(x * 7) * 3) * Math.PI * 2) * 0.42;
    return grain + repeatingNoise(x, y, 18, 0.14) * 0.25;
  }
  if (surface === 'linen') return repeatingNoise(x, y, 62, 0.35) * 0.7 + repeatingNoise(x, y, 18, 0.8) * 0.3;
  if (surface === 'plaster') return repeatingNoise(x, y, 9, 0.52) * 0.6 + repeatingNoise(x, y, 47, 0.08) * 0.14;
  if (surface === 'ceramic') return repeatingNoise(x, y, 92, 0.7) * 0.08;
  return repeatingNoise(x, y, 80, 0.2) * 0.06;
}

function wrap(value: number) {
  return value - Math.floor(value);
}

function makeDataTexture(data: Uint8Array, colorSpace = THREE.NoColorSpace) {
  const texture = new THREE.DataTexture(data, SIZE, SIZE, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = colorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

function makeMaps(surface: Surface) {
  const normal = new Uint8Array(SIZE * SIZE * 4);
  const roughness = new Uint8Array(SIZE * SIZE * 4);
  const height = new Uint8Array(SIZE * SIZE * 4);
  const roughBase = { plaster: 0.93, wood: 0.52, linen: 0.88, ceramic: 0.28, metal: 0.24 }[surface];
  const bump = { plaster: 0.65, wood: 0.8, linen: 0.9, ceramic: 0.1, metal: 0.08 }[surface];

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const x = col / SIZE;
      const y = row / SIZE;
      const center = detailField(x, y, surface);
      const dx = detailField(wrap(x + 1 / SIZE), y, surface) - detailField(wrap(x - 1 / SIZE), y, surface);
      const dy = detailField(x, wrap(y + 1 / SIZE), surface) - detailField(x, wrap(y - 1 / SIZE), surface);
      const n = new THREE.Vector3(-dx * 18 * bump, -dy * 18 * bump, 1).normalize();
      const index = (row * SIZE + col) * 4;
      normal[index] = (n.x * 0.5 + 0.5) * 255;
      normal[index + 1] = (n.y * 0.5 + 0.5) * 255;
      normal[index + 2] = 255;
      normal[index + 3] = 255;
      const variation = Math.max(0, Math.min(1, roughBase + center * 0.13));
      roughness[index] = roughness[index + 1] = roughness[index + 2] = variation * 255;
      roughness[index + 3] = 255;
      const value = Math.max(0, Math.min(1, 0.5 + center * 0.24));
      height[index] = height[index + 1] = height[index + 2] = value * 255;
      height[index + 3] = 255;
    }
  }

  return { normal: makeDataTexture(normal), roughness: makeDataTexture(roughness), height: makeDataTexture(height) };
}

const baseTexture = new THREE.TextureLoader().load('/textures/walnut-albedo.png');
baseTexture.wrapS = baseTexture.wrapT = THREE.RepeatWrapping;
baseTexture.repeat.set(2.4, 2.4);
baseTexture.colorSpace = THREE.SRGBColorSpace;
baseTexture.anisotropy = 16;
baseTexture.minFilter = THREE.LinearMipmapLinearFilter;
baseTexture.magFilter = THREE.LinearFilter;

const maps = {
  plaster: makeMaps('plaster'),
  wood: makeMaps('wood'),
  linen: makeMaps('linen'),
  ceramic: makeMaps('ceramic'),
  metal: makeMaps('metal'),
};

export function applyPbrMaps(material: THREE.Material, surface: Surface, repeat = 1) {
  const target = material as THREE.MeshStandardMaterial;
  if (!target.isMeshStandardMaterial) return;

  const setRepeat = (texture: THREE.Texture | null) => texture?.repeat.set(repeat, repeat);
  const source = maps[surface];
  setRepeat(source.normal);
  setRepeat(source.roughness);
  setRepeat(source.height);
  target.normalMap = source.normal;
  target.normalScale.setScalar(surface === 'wood' ? 0.55 : surface === 'linen' ? 0.32 : surface === 'plaster' ? 0.22 : 0.14);
  target.roughnessMap = source.roughness;
  target.bumpMap = source.height;
  target.bumpScale = surface === 'wood' ? 0.055 : surface === 'linen' ? 0.038 : 0.02;
  target.envMapIntensity = surface === 'metal' ? 1.55 : surface === 'ceramic' ? 0.95 : 0.42;
  target.roughness = { plaster: 0.88, wood: 0.46, linen: 0.8, ceramic: 0.22, metal: 0.18 }[surface];
  target.metalness = surface === 'metal' ? 0.9 : surface === 'ceramic' ? 0.04 : 0;

  if (surface === 'wood') {
    target.map = baseTexture;
    target.color.set('#b88a68');
  }
  target.needsUpdate = true;
}
