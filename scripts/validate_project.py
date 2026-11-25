from pathlib import Path
import json,re,fitz
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'src/data/colleges.json').read_text())
assert len(data)==71,'expected 71 colleges'
assert len(set(d['slug'] for d in data))==len(data),'duplicate slugs'
assert sum(bool(d['feeExample']) for d in data)==61,'fee samples count changed'
assert {d['printedPage'] for d in data if not d['availableInFile']}=={108,109},'unexpected missing pages'
for college in data:
    page=college['pdfPage']
    if page:
        assert (root/'public/assets/fee-pages'/f'{page}.webp').is_file(),college['name']
    if college['feeExample']:
        assert college['feeExample']['amount']>0
pdf=fitz.open(root/'public/documents/SUN-STAR-FEES-2026-27.pdf')
assert len(pdf)==115,len(pdf)
print(f"OK: {len(data)} colleges, 61 sample fees, all page previews exist, {len(pdf)} PDF pages")
