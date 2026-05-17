import fitz  # PyMuPDF
import os
import glob

public_dir = r"d:\My_Portfolio\public"
out_dir = os.path.join(public_dir, "certificates")

os.makedirs(out_dir, exist_ok=True)

pdfs = glob.glob(os.path.join(public_dir, "*.pdf"))

for pdf_path in pdfs:
    print(f"Converting {pdf_path}...")
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)  # first page
    pix = page.get_pixmap(dpi=150)
    
    base_name = os.path.basename(pdf_path).replace(".pdf", ".png")
    out_path = os.path.join(out_dir, base_name)
    pix.save(out_path)
    print(f"Saved {out_path}")

print("Done!")
