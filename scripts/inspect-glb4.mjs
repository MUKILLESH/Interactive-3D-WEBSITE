import { readFileSync } from 'node:fs'
const buf = readFileSync('D:/Test/public/models/bedroom.glb')
const jsonLen = buf.readUInt32LE(12)
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'))
const binStart = 20 + jsonLen + 8
const bin = buf.subarray(binStart)

function getAcc(i) {
  const acc = json.accessors[i]
  const view = json.bufferViews[acc.bufferView]
  const start = (view.byteOffset || 0) + (acc.byteOffset || 0)
  return { acc, view, start }
}

function dumpMesh(nodeName) {
  const n = json.nodes.find((x) => x.name === nodeName)
  const mesh = json.meshes[n.mesh]
  console.log('\n', nodeName, 'primitives', mesh.primitives.length)
  mesh.primitives.forEach((p, i) => {
    console.log(' prim', i, 'attrs', p.attributes, 'mode', p.mode, 'indices', p.indices, 'material', p.material, 'targets', p.targets)
    const pos = json.accessors[p.attributes.POSITION]
    console.log('  pos count', pos.count, 'min', pos.min, 'max', pos.max)
    if (p.attributes.COLOR_0 != null) console.log('  HAS VERTEX COLOR', json.accessors[p.attributes.COLOR_0])
  })
}

dumpMesh('chairCombined.highPoly')
dumpMesh('Cube.008')
dumpMesh('Cube.007')
dumpMesh('bed.003')
dumpMesh('bed.002')

// bookshelf structure - find white furniture at back wall
const whiteNodes = json.nodes.filter((n) => {
  if (n.mesh == null) return false
  const m = json.meshes[n.mesh]
  return m.primitives.some((p) => json.materials[p.material]?.name === 'white')
})
console.log('\nWHITE MATERIAL NODES:')
whiteNodes.forEach((n) => {
  console.log(n.name, 't', n.translation, 's', n.scale)
})

// choti table metallicRoughnessTexture - does it have base color in that?
console.log('\ntextures', json.textures?.length, 'images', json.images?.map(i => i.name || i.mimeType || i.uri))
console.log('choti table full', JSON.stringify(json.materials.find(m => m.name==='choti table')))
console.log('ofis full', JSON.stringify(json.materials.find(m => m.name==='ofis_cher.002')))
console.log('bed full', JSON.stringify(json.materials.find(m => m.name==='bed')))
console.log('lambert full', JSON.stringify(json.materials.find(m => m.name==='room_old_house_MSH8_takht_room_obj_pasted__lambert5')))
