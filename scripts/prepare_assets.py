from PIL import Image,ImageDraw
from pathlib import Path
import fitz,io,os
root=Path(__file__).resolve().parents[1]
assets=root/'public/assets'
assets.mkdir(parents=True,exist_ok=True)
# Set SUNSTAR_SOURCE_DIR to the folder containing your original uploaded files.
# The generated assets are already included in the ZIP, so rerunning is optional.
original=Path(os.environ.get('SUNSTAR_SOURCE_DIR', '/mnt/data'))
Image.open(original/'brocher sun star.jpeg').save(assets/'sunstar-brochure.jpg',quality=90)
Image.open(original/'visiting card.jpeg').save(assets/'visiting-card.jpg',quality=90)
# Faithful brand logo cropped from supplied flyer. The user owns these brand files.
flyer=Image.open(original/'brocher sun star.jpeg').convert('RGB')
print('flyer dims',flyer.size,flush=True)
logo=flyer.crop((42,18,520,232))
logo.save(assets/'sunstar-logo.png')
portrait=flyer.crop((650,165,1230,785)).resize((700,750),Image.Resampling.LANCZOS)
portrait.save(assets/'student-portrait.jpg',quality=86)
logo_alt=Image.open(original/'hii 11.jpeg').convert('RGB')
logo_alt.save(assets/'logo-original.jpg',quality=92)
# Create small fee page previews directly from the owner's PDF without OCR or inferred data.
source=fitz.open(original/'SUN STAR FEES STRUCTURE 2026-2027.pdf')
print('start page previews',len(source),flush=True)
for i,page in enumerate(source):
    pix=page.get_pixmap(matrix=fitz.Matrix(1.25,1.25),alpha=False)
    pil=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    pil.save(assets/'fee-pages'/f'{i+1}.webp','WEBP',quality=76,method=4)
    if (i+1)%25==0: print('previews done',i+1,flush=True)
# Compressed but complete 115-page PDF readable at document zoom.
compressed=root/'public/documents/SUN-STAR-FEES-2026-27.pdf'
out=fitz.open()
for i,page in enumerate(source):
    pix=page.get_pixmap(matrix=fitz.Matrix(1.8,1.8),alpha=False)
    pil=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    buff=io.BytesIO(); pil.save(buff,'JPEG',quality=82,optimize=True)
    p=out.new_page(width=page.rect.width,height=page.rect.height)
    p.insert_image(page.rect,stream=buff.getvalue())
    if (i+1)%30==0: print('pdf optimized',i+1,flush=True)
out.save(compressed,garbage=4,deflate=True)
out.close();source.close()
print('compressed_pdf_mb',round(compressed.stat().st_size/1024/1024,1),flush=True)
