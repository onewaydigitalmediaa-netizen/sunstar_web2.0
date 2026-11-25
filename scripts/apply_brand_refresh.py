"""Non-destructive SUN STAR brand normalization for existing styles."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
styles=root/'src'/'styles.css'
s=styles.read_text()
s=s.replace('--primary:#079fc4;--primary-dark:#057fa4;--primary-darker:#075670;--yellow:#ffca28;--yellow-soft:#fff4bf;--navy:#103041;--ink:#142b3b;--muted:#697b87;--line:#e3edf1;--surface:#f4f9fb;', '--primary:#0DA3CE;--primary-dark:#076B8A;--primary-darker:#076B8A;--yellow:#FDC21E;--yellow-soft:#FFF6D6;--navy:#076B8A;--ink:#1E1E1E;--muted:#5F6B73;--line:#E5E9EC;--surface:#F8FBFC;')
styles.write_text(s)
p=root/'src/styles/premium.css';s=p.read_text().replace('--sunstar-blue:#099ec2','--sunstar-blue:#0DA3CE').replace('--sunstar-blue-deep:#075b79','--sunstar-blue-deep:#076B8A').replace('--sunstar-navy:#0d2c40','--sunstar-navy:#076B8A').replace('--sunstar-yellow:#ffcb28','--sunstar-yellow:#FDC21E')
p.write_text(s)
# Orange was used by an unrelated design module; normalize those accents to the SUN STAR theme.
p=root/'src/styles/about-career.css';s=p.read_text().replace('#f58220','#076B8A').replace('#ff9a45','#FDC21E').replace('#ffd0a7','#FFF6D6').replace('#f1f3f7','#E6F6FB').replace('#172b49','#076B8A').replace('#102d4d','#076B8A')
p.write_text(s)
# Browser chrome matches the canonical logo color.
p=root/'index.html';s=p.read_text().replace('content="#079cc3"','content="#0DA3CE"');p.write_text(s)
