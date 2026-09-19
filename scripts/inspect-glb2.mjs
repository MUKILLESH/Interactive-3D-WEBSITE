import { readFileSync, writeFileSync } from 'node:fs'

const path = 'D:/Test/public/models/bedroom.glb'
const buf = readFileSync(path)
const jsonLen = buf.readUInt32LE(12)
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'))

function getExt(m) {
  return {
    name: m.name,
    color: m.pbrMetallicRoughness?.baseColorFactor,
    tex: m.pbrMetallicRoughness?.baseColorTexture,
    ext: m.extensions ? Object.keys(m.extensions) : [],
    extras: m.extras,
  }
}

const names = ['bed', 'Material.005', 'room_old_house_MSH8_takht_room_obj_pasted__lambert5', 'ofis_cher.002', 'choti table', 'fridge', 'white', 'wall']
names.forEach((n) => {
  const m = json.materials.find((x) => x.name === n)
  console.log('\nMAT', n, JSON.stringify(getExt(m), null, 2))
})

// bounding boxes of bed meshes
function applyTRS(t = [0,0,0], r = [0,0,0,1], s = [1,1,1], p) {
  // quaternion rotate
  const [x,y,z,w] = r
  let vx = p[0]*s[0], vy = p[1]*s[1], vz = p[2]*s[2]
  const ix = w*vx + y*vz - z*vy
  const iy = w*vy + z*vx - x*vz
  const iz = w*vz + x*vy - y*vx
  const iw = -x*vx - y*vy - z*vz
  const rx = ix*w + iw*-x + iy*-z - iz*-y
  const ry = iy*w + iw*-y + iz*-x - ix*-z
  const rz = iz*w + iw*-z + ix*-y - iy*-x
  return [rx+t[0], ry+t[1], rz+t[2]]
}

const targets = new Set(['bed','bed.001','bed.002','bed.003','chairCombined.highPoly','Cube.006','Cube.010','Cube.007','Cube.008','Plane.018','Cube.087'])
json.nodes.forEach((n, ni) => {
  if (!targets.has(n.name) && n.mesh == null) return
  if (!targets.has(n.name)) return
  const mesh = json.meshes[n.mesh]
  mesh.primitives.forEach((p, pi) => {
    const acc = json.accessors[p.attributes.POSITION]
    const mat = json.materials[p.material]
    const corners = [
      [acc.min[0], acc.min[1], acc.min[2]],
      [acc.max[0], acc.max[1], acc.max[2]],
    ].map((pt) => applyTRS(n.translation, n.rotation, n.scale, pt))
    console.log(n.name, 'prim', pi, 'mat', mat?.name, 'accMin', acc.min, 'accMax', acc.max, 'worldApprox', corners)
  })
})
