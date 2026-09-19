import re

filepath = r"d:\Test\src\scene\RoomGLB.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "<mesh geometry={nodes.GA_cactus001.geometry} material={materials.cactus_gasteria} />",
    "<mesh geometry={nodes.GA_cactus001.geometry} material={coloured.cactusMat} />"
)
content = content.replace(
    "<mesh geometry={nodes.GA_stones001.geometry} material={materials.stones} />",
    "<mesh geometry={nodes.GA_stones001.geometry} material={coloured.stonesMat} />"
)

content = content.replace(
    "<mesh geometry={nodes.GA_cactus002.geometry} material={materials.cactus_gasteria} />",
    "<mesh geometry={nodes.GA_cactus002.geometry} material={coloured.cactusMat} />"
)
content = content.replace(
    "<mesh geometry={nodes.GA_stones002.geometry} material={materials.stones} />",
    "<mesh geometry={nodes.GA_stones002.geometry} material={coloured.stonesMat} />"
)

content = content.replace(
    "<mesh geometry={nodes.Sphere005_1.geometry} material={materials.lamp} />",
    "<mesh geometry={nodes.Sphere005_1.geometry} material={coloured.floorLampShade} />"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
