import * as THREE from 'three';

function asStandard(material: THREE.Material | undefined) {
  return material as THREE.MeshStandardMaterial | undefined;
}

export function polishSceneMaterials(materials: Record<string, THREE.Material>) {
  const screens = ['moniter', 'eye back.001', 'eye back.002'];
  screens.forEach((name) => {
    const material = asStandard(materials[name]);
    if (!material) return;
    material.emissive = new THREE.Color('#9ecbff');
    material.emissiveIntensity = 0.85;
    material.toneMapped = false;
    material.roughness = 0.22;
    material.metalness = 0.08;
  });

  const laptop = asStandard(materials['white computer']);
  if (laptop) {
    laptop.emissive = new THREE.Color('#d7e8ff');
    laptop.emissiveIntensity = 0.35;
    laptop.roughness = 0.28;
  }

  ;['Glass', 'Glass.001'].forEach((name) => {
    const material = materials[name] as THREE.MeshPhysicalMaterial | undefined;
    if (!material) return;
    material.transparent = true;
    material.opacity = 0.22;
    material.roughness = 0.06;
    material.metalness = 0.02;
    material.envMapIntensity = 1.4;
    // Transmission removed for performance. Standard transparency is used instead.
  });

  const bulb = asStandard(materials.bulb);
  if (bulb) {
    bulb.emissive = new THREE.Color('#fff1c2');
    bulb.emissiveIntensity = 1.6;
    bulb.toneMapped = false;
  }

  const rug = materials['broewn riug'] as THREE.MeshPhysicalMaterial | undefined;
  if (rug) {
    rug.roughness = 0.92;
    rug.metalness = 0;
    if ('sheen' in rug) {
      rug.sheen = 0.35;
      rug.sheenRoughness = 0.7;
      rug.sheenColor = new THREE.Color('#c9a07a');
    }
  }
}

export function setLampGlow(targets: Array<THREE.Material | undefined>, on: boolean, delta: number) {
  targets.forEach((material) => {
    const standard = material as THREE.MeshStandardMaterial | undefined;
    if (!standard?.isMeshStandardMaterial) return;
    if (!standard.emissive) standard.emissive = new THREE.Color('#ffd9a8');
    standard.emissive.set('#ffd9a8');
    standard.emissiveIntensity = THREE.MathUtils.damp(standard.emissiveIntensity, on ? 1.15 : 0.04, 3.2, delta);
  });
}
