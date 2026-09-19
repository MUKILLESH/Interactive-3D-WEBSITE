import { readFileSync, writeFileSync } from 'node:fs'

const path = 'D:/Test/public/models/bedroom.glb'
const buf = readFileSync(path)
const jsonLen = buf.readUInt32LE(12)
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'))

const materials = json.materials.map((m, i) => ({
  i,
  name: m.name,
  color: m.pbrMetallicRoughness?.baseColorFactor,
  metallic: m.pbrMetallicRoughness?.metallicFactor,
  roughness: m.pbrMetallicRoughness?.roughnessFactor,
  baseColorTexture: m.pbrMetallicRoughness?.baseColorTexture?.index ?? null,
  normalTexture: m.normalTexture?.index ?? null,
  extras: m.extras,
}))

function nodeWorldish(idx, nodes) {
  const n = nodes[idx]
  return {
    name: n.name,
    mesh: n.mesh,
    translation: n.translation,
    rotation: n.rotation,
    scale: n.scale,
  }
}

const meshRecords = json.meshes.map((mesh, mi) => {
  const usedBy = []
  json.nodes.forEach((n, ni) => {
    if (n.mesh === mi) usedBy.push({ node: n.name, ni, t: n.translation, s: n.scale, r: n.rotation })
  })
  return {
    mi,
    name: mesh.name,
    primitives: mesh.primitives.map((p) => ({
      material: p.material,
      materialName: json.materials[p.material]?.name,
      attributes: Object.keys(p.attributes),
      hasCOLOR: p.attributes.COLOR_0 != null,
    })),
    usedBy,
  }
})

const matUse = new Map()
meshRecords.forEach((m) => {
  m.primitives.forEach((p) => {
    const key = p.material
    const rec = matUse.get(key) || { name: p.materialName, meshes: [] }
    rec.meshes.push(m.name || `mesh_${m.mi}`)
    rec.nodes = rec.nodes || []
    rec.nodes.push(...m.usedBy.map((u) => u.node))
    matUse.set(key, rec)
  })
})

const shared = [...matUse.entries()]
  .map(([i, v]) => ({ i, ...v, uniqueMeshes: [...new Set(v.meshes)], uniqueNodes: [...new Set(v.nodes)] }))
  .filter((v) => v.uniqueNodes.length > 1 || v.uniqueMeshes.length > 1)

const interest = /bed|chair|cher|fridge|choti|white|pot|clay|wall|Material\.005|lambert|Cube006|Cube007|Cube008|Cube010|Plane019|stool|bench/i

const report = {
  materials,
  shared,
  interestMeshes: meshRecords.filter((m) => interest.test(m.name || '') || m.usedBy.some((u) => interest.test(u.node || '')) || m.primitives.some((p) => interest.test(p.materialName || ''))),
}

writeFileSync('D:/Test/scripts/glb-inspect.json', JSON.stringify(report, null, 2))
console.log('MATERIALS:')
materials.forEach((m) => {
  console.log(`${m.i} ${m.name} color=${JSON.stringify(m.color)} tex=${m.baseColorTexture} metal=${m.metallic} rough=${m.roughness}`)
})
console.log('\nSHARED:')
shared.forEach((s) => console.log(`${s.name} nodes=${s.uniqueNodes.join('|')}`))
console.log('\nINTEREST MESHES:')
report.interestMeshes.forEach((m) => {
  console.log(m.name, m.primitives.map((p) => p.materialName).join(','), 'nodes', m.usedBy.map((u) => `${u.node}@${(u.t||[]).map(n=>n.toFixed?.(2)||n).join(',')}`).join(' ; '))
})
