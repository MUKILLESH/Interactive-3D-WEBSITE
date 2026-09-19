import { readFileSync } from 'node:fs'
const buf = readFileSync('D:/Test/public/models/bedroom.glb')
const jsonLen = buf.readUInt32LE(12)
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'))

function dumpNode(name) {
  const n = json.nodes.find((x) => x.name === name)
  console.log('\n=== NODE', name, JSON.stringify({ t: n.translation, r: n.rotation, s: n.scale, mesh: n.mesh }))
  const mesh = json.meshes[n.mesh]
  console.log('mesh name', mesh.name, 'prims', mesh.primitives.length)
  mesh.primitives.forEach((p, i) => {
    console.log(' prim', i, 'material index', p.material, 'mat', json.materials[p.material])
  })
}

;['Cube.007','Cube.008','Cube.071','Cube.006','Cube.010','bed','bed.001','bed.002','bed.003'].forEach(dumpNode)

console.log('\n\nNodes with no material or default:')
json.meshes.forEach((m, mi) => {
  m.primitives.forEach((p, pi) => {
    if (p.material == null) {
      const nodes = json.nodes.filter((n) => n.mesh === mi).map((n) => n.name)
      console.log('NO MATERIAL mesh', m.name, 'nodes', nodes)
    }
  })
})

// bookshelf: white cubes at x=-0.4 z=-2.72
;['Cube.097','Cube.098','Cube.095','Cube.024'].forEach(dumpNode)
