import os
import zipfile
import sys

def make_zip():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dist_dir = os.path.join(root, 'dist')
    backend_dir = os.path.join(root, 'backend')
    out_zip = os.path.join(root, 'version2.0.zip')

    print(f"Creating {out_zip}...")
    with zipfile.ZipFile(out_zip, 'w', compression=zipfile.ZIP_DEFLATED) as zf:
        # Add dist files at root of zip
        for dirpath, _, filenames in os.walk(dist_dir):
            for fn in filenames:
                full_path = os.path.join(dirpath, fn)
                rel_path = os.path.relpath(full_path, dist_dir)
                zf.write(full_path, rel_path)
                
        # Add backend folder under backend/
        for dirpath, _, filenames in os.walk(backend_dir):
            for fn in filenames:
                full_path = os.path.join(dirpath, fn)
                rel_path = os.path.join('backend', os.path.relpath(full_path, backend_dir))
                zf.write(full_path, rel_path)

    size_mb = os.path.getsize(out_zip) / (1024 * 1024)
    print(f"Successfully packaged version2.0.zip ({size_mb:.2f} MB)")

if __name__ == '__main__':
    make_zip()
