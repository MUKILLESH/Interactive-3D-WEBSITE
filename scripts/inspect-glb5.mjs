import { readFileSync } from 'node:fs'
const buf = readFileSync('D:/Test/public/models/bedroom.glb')
const jsonLen = buf.readUInt32LE(12)
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'))

json.nodes.forEach((n) => {
  const t = n.translation || [0,0,0]
  const s = n.scale || [1,1,1]
  if (t[2] < -1.8 && t[2] > -2.8 && Math.abs(s[0]*s[1]*s[2]) > 0.01) {
    const mesh = n.mesh != null ? json.meshes[n.mesh] : null
    const mats = mesh ? mesh.primitives.map(p => json.materials[p.material]?.name || 'DEFAULT') : []
    console.log(n.name, 't', t.map(v=>+v.toFixed(2)), 's', s.map(v=>+v.toFixed(2)), mats.join(','))
  }
})
