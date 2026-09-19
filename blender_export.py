import bpy
import sys
import os

print("=== SCENE INSPECTION ===")
meshes = 0
tris = 0
verts = 0

print("Objects in scene:")
for obj in bpy.context.scene.objects:
    print(f"  - {obj.name} ({obj.type})")
    if obj.type == 'MESH':
        meshes += 1
        depsgraph = bpy.context.evaluated_depsgraph_get()
        eval_obj = obj.evaluated_get(depsgraph)
        try:
            mesh = eval_obj.to_mesh()
            mesh.calc_loop_triangles()
            tris += len(mesh.loop_triangles)
            verts += len(mesh.vertices)
            eval_obj.to_mesh_clear()
        except:
            pass

print(f"Total Meshes: {meshes}")
print(f"Total Triangles: {tris}")
print(f"Total Vertices: {verts}")

print("=== EXPORTING GLB ===")
os.makedirs(r"D:\Test\public\models", exist_ok=True)

# Clean up hidden objects or non-mesh objects if needed
# For now, export everything visible
bpy.ops.export_scene.gltf(
    filepath=r"D:\Test\public\models\bedroom.glb",
    export_format='GLB',
    use_selection=False,
    export_apply=True,
    export_materials='EXPORT',
    export_cameras=False,
    export_lights=False,
    export_yup=True
)
print("=== EXPORT COMPLETE ===")
