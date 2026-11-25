import json,re,unicodedata
from pathlib import Path
root=Path(__file__).resolve().parents[1]
rows='''Paavai Educational Institutions|1|Namakkal|Multi-disciplinary
Mahendra Educational Institutions|4|Namakkal|Multi-disciplinary
Excel Group Institutions|7|Namakkal|Multi-disciplinary
The Kavery Educational Institutions|13|Salem|Multi-disciplinary
Karpagam Group of Institutions|15|Coimbatore|Multi-disciplinary
Hindustan Group of Institutions|18|Chennai|Multi-disciplinary
Erode Sengunthar Engineering College|22|Erode|Engineering
Shree Venkateshwara Group of Institutions|23|Erode|Multi-disciplinary
Sengunthar Group of Institution (Tiruchengode)|26|Namakkal|Multi-disciplinary
Gnanamani College of Technology|28|Namakkal|Engineering
Muthayammal Engineering College|29|Namakkal|Engineering
Sri Lakshmi Group of Institutions|30|Coimbatore|Healthcare
Selvam College of Technology|31|Namakkal|Engineering
J.K.K. Munirajah Group of Institutions (TN Palayam)|32|Erode|Multi-disciplinary
Al-Ameen Engineering College (Autonomous)|35|Erode|Engineering
Annapoorana Engineering College (Autonomous)|36|Salem|Engineering
Shree Sakthi Engineering College (Autonomous)|37|Coimbatore|Engineering
Kathir College of Engineering|38|Coimbatore|Multi-disciplinary
Study World College of Engineering|40|Coimbatore|Engineering
Sri Ranganathar Institute of Engineering & Technology|41|Coimbatore|Engineering
PPG Group of Institutions|42|Coimbatore|Multi-disciplinary
Nehru Group of Institutions|44|Coimbatore|Multi-disciplinary
M.P. Nachimuthu M. Jaganathan Engineering College|46|Erode|Engineering
EASA College of Engineering and Technology|47|Coimbatore|Engineering
INFO Institute of Engineering|48|Coimbatore|Engineering
Dhanalakshmi Srinivasan College of Engineering|49|Coimbatore|Engineering
Coimbatore Institute of Engineering and Technology|50|Coimbatore|Engineering
Builders Engineering College|51|Tiruppur|Engineering
Sri Sai Ranganathan Engineering College|52|Coimbatore|Multi-disciplinary
Vinayaga Mission Kirupananda Variyar Engineering College|53|Salem|Engineering
KIT - Kalaignarkarunanidhi Institute of Technology|55|Coimbatore|Engineering
Nandha Educational Institutions|56|Erode|Multi-disciplinary
Adithya Institute of Technology|59|Coimbatore|Engineering
Sasurie College of Engineering (Autonomous)|61|Tiruppur|Multi-disciplinary
Sri Shanmugha Educational Institutions|63|Salem|Multi-disciplinary
JKK Nataraja Educational Institutions|64|Namakkal|Multi-disciplinary
RVS Group of Institutions|66|Coimbatore|Multi-disciplinary
R.P. Sarathy Institute of Technology|68|Salem|Engineering
Ganesh College of Engineering|69|Salem|Engineering
United Educational Institutions|70|Tamil Nadu|Multi-disciplinary
Vivekanandha Educational Institutions|76|Namakkal|Multi-disciplinary
Deepthi College of Nursing|79|Namakkal|Nursing
Dhanvantri College of Nursing|80|Namakkal|Nursing
JCT Institutions|81|Coimbatore|Multi-disciplinary
SSM College of Engineering|84|Namakkal|Engineering
SSM College of Pharmacy|85|Erode|Pharmacy
Mother Theresa Group of Institutions|86|Pudukkottai|Multi-disciplinary
Kongunadu College of Engineering & Technology|88|Tiruchirappalli|Engineering
Thittakudi Sengunthar Group of Institutions|89|Cuddalore|Multi-disciplinary
Revathi College of Nursing|91|Coimbatore|Nursing
Tagore Engineering College|92|Chennai|Engineering
CMS College of Engineering|93|Namakkal|Engineering
Christ the King Engineering College|94|Coimbatore|Engineering
Mahabharathi Engineering College|95|Villupuram|Engineering
AVS Engineering College|96|Salem|Engineering
Vellalar Group of Institutions|97|Erode|Pharmacy
Shivani Engineering College|98|Tiruchirappalli|Engineering
Sri Rengeswarar College of Nursing|98|Namakkal|Nursing
Dhaanish Ahmed Institute of Technology|99|Coimbatore|Engineering
Varuvan Vadivelan Institute of Technology|100|Dharmapuri|Engineering
JKK Munirajah College of Pharmacy|101|Namakkal|Pharmacy
Shreenivasa Engineering College|102|Dharmapuri|Engineering
Bharathiyar Institute of Engineering for Women|104|Salem|Engineering
Sri Sakthi Institute of Engineering & Technology|104|Coimbatore|Engineering
Hindusthan College of Engineering (Perundurai)|105|Erode|Engineering
Avinashilingam Institute for Home Science and Higher Education for Women|106|Coimbatore|Engineering
Vidyaa Vikas College of Engineering & Technology|107|Namakkal|Engineering
V.S.B. College of Engineering Technical Campus|108|Tamil Nadu|Engineering
Erode Arts and Science College|109|Erode|Arts & Science
KSR Educational Institutions|110|Namakkal|Multi-disciplinary
PGP Group of Institution|114|Namakkal|Multi-disciplinary'''
parsed=[line.split('|') for line in rows.strip().splitlines()]
assert len(parsed)==71,len(parsed)
streamOverride={
 'Paavai Educational Institutions':['Engineering','Arts & Science','Healthcare','Polytechnic','Education'],
 'Mahendra Educational Institutions':['Engineering','Arts & Science','Healthcare'],
 'Excel Group Institutions':['Engineering','Arts & Science','Healthcare','Polytechnic'],
 'The Kavery Educational Institutions':['Engineering','Arts & Science','Healthcare','Polytechnic'],
 'Karpagam Group of Institutions':['Engineering','Arts & Science','Healthcare'],
 'Hindustan Group of Institutions':['Engineering','Arts & Science','Healthcare','Polytechnic'],
 'Shree Venkateshwara Group of Institutions':['Engineering','Arts & Science','Healthcare','Polytechnic'],
 'Sengunthar Group of Institution (Tiruchengode)':['Engineering','Nursing','Pharmacy','Healthcare'],
 'Sri Lakshmi Group of Institutions':['Healthcare','Nursing','Pharmacy'],
 'J.K.K. Munirajah Group of Institutions (TN Palayam)':['Engineering','Pharmacy','Healthcare','Polytechnic','Education'],
 'Kathir College of Engineering':['Engineering','Arts & Science'],
 'PPG Group of Institutions':['Engineering','Arts & Science','Healthcare','Nursing','Pharmacy'],
 'Nehru Group of Institutions':['Engineering','Healthcare','Nursing'],
 'Sri Sai Ranganathan Engineering College':['Engineering','Nursing','Pharmacy'],
 'Nandha Educational Institutions':['Engineering','Healthcare','Pharmacy','Polytechnic'],
 'Sasurie College of Engineering (Autonomous)':['Engineering','Healthcare','Education','Arts & Science'],
 'Sri Shanmugha Educational Institutions':['Engineering','Healthcare','Pharmacy'],
 'JKK Nataraja Educational Institutions':['Engineering','Arts & Science','Nursing','Healthcare','Pharmacy'],
 'RVS Group of Institutions':['Engineering','Healthcare','Nursing','Pharmacy','Polytechnic'],
 'United Educational Institutions':['Engineering','Healthcare','Nursing','Pharmacy'],
 'Vivekanandha Educational Institutions':['Engineering','Arts & Science','Nursing','Pharmacy','Healthcare'],
 'JCT Institutions':['Engineering','Arts & Science','Polytechnic'],
 'Mother Theresa Group of Institutions':['Engineering','Arts & Science','Healthcare'],
 'Thittakudi Sengunthar Group of Institutions':['Engineering','Arts & Science','Polytechnic'],
 'KSR Educational Institutions':['Engineering','Arts & Science','Nursing','Pharmacy'],
 'PGP Group of Institution':['Engineering','Arts & Science','Nursing','Healthcare','Pharmacy','Polytechnic'],
}
# Individually verified representative fee rows from the uploaded booklet.
# These are NOT blanket starting prices; other fee categories/add-ons appear in the source.
# Format: college index (1-based): [program / cohort, rupees, quota or column, notes]
fees={
1:['Engineering CSE, AI&DS, IT – first year',138000,'BC/MBC/OC · Government quota','Autonomous engineering college; annual fee, printed p.1'],
2:['NKL-1 Engineering EEE/AERO/Civil – first year',90000,'BC/MBC/OC · Government quota','NKL-1; annual fee, printed p.4'],
3:['B.E. / B.Tech CSE – first year',130000,'Management tuition fee','Admission and other fees are listed separately, printed p.7'],
4:['Engineering CSE / AI&DS – first year',90000,'BC/MBC/OC · Government quota','Autonomous engineering college; printed p.13'],
5:['Engineering CSE / AI&DS / IT – first year',225000,'BC/MBC/OC · Management quota','Engineering (Autonomous); printed p.15'],
6:['B.E. Aeronautical Engineering',126000,'Annual fee – column I','College/column conditions in printed p.18'],
7:['B.E. CSE / IT / AI&DS – first year',110000,'BC/MBC/OC · Government quota','Annual fee, printed p.22'],
8:['B.Tech CSE – first year',100000,'Management tuition fee','Other charges/FG may apply, printed p.23'],
10:['CSE / AI&DS / IT / ECE – first year',108000,'BC/MBC/OC · Government quota','Annual fee, printed p.28'],
11:['AI&DS / CSE / IT – first year',130000,'BC/MBC/OC · Government quota','Annual fee, printed p.29'],
13:['B.Tech AI&DS – first year',100000,'Management tuition fee','Scholarships/other charges in printed p.31'],
15:['CSE / AI&DS / IT – first year',60000,'BC/MBC/OC · Government quota','Other fees listed separately, printed p.35'],
16:['CSE / AI&DS / IT – first year',100000,'BC/MBC/OC · Government quota','Annual fee, printed p.36'],
17:['AI&ML / CSE / Cyber Security – first year',125000,'BC/MBC/OC · Government quota','Additional fees in printed p.37'],
18:['AI&DS / CSE / AI&ML – first year',90000,'BC/MBC/OC · Government quota','Additional fees in printed p.38'],
19:['AI&DS / IT / CSE / AI&ML – first year',90000,'BC/MBC/OC · Government quota','Annual fee, printed p.40'],
20:['CSE / AI&DS / IT – first year',110000,'BC/MBC/OC · Government quota','Annual fee, printed p.41'],
21:['AI&DS / CSE / IT / AI&ML – first year',110000,'BC/MBC/OC · Government quota','Autonomous engineering, printed p.42'],
23:['CSE / IT / ECE – first year',60000,'BC/MBC/OC · Government quota','Annual fee, printed p.46'],
24:['CSE / IT / AI&DS – first year',120000,'BC/MBC/OC · Government quota','Annual fee, printed p.47'],
25:['CSE / AI&DS / IT – first year',110000,'BC/MBC/OC · Government quota','Annual fee, printed p.48'],
26:['AI&DS / CSE – first year',135000,'BC/MBC/OC · Government quota','Annual fee, printed p.49'],
27:['Cyber Security / CSE / IT – first year',90000,'BC/MBC/OC · Government quota','Annual fee, printed p.50'],
28:['Cyber Security / AI&DS – first year',90000,'BC/MBC/OC · Government quota','Annual fee, printed p.51'],
30:['AI&DS / CSE / IT / AI&ML – first year',120000,'Yearly fee','See printed p.53 for separate additional charges'],
31:['CSE / AI&DS / CSBS / AI&ML – first year',110000,'BC/MBC/OC · Government quota','Annual fee, printed p.55'],
32:['AI&DS / CSE / IT / Cyber Security – first year',120000,'BC/MBC/OC · Government quota','Engineering college, printed p.56'],
33:['CSE / IT – first year',120000,'BC/MBC/OC · Government quota','Annual fee, printed p.59'],
34:['B.E. CSE – regular programme',150000,'Management tuition fee','Additional admission fee, printed p.61'],
35:['B.E. CSE – first year',105000,'Management tuition fee','Additional charges may apply, printed p.63'],
36:['CSE / IT – first year',65000,'BC/MBC/OC · Government quota','Engineering college, printed p.64'],
37:['AI&DS / CSE – first year',125000,'BC/MBC/OC · Government quota','Annual fee, printed p.66'],
38:['IT / Cyber Security / ECE – first year',105000,'BC/MBC/OC · Government quota','Annual fee, printed p.68'],
39:['AI&DS / CSE / IT – first year',85000,'BC/MBC/OC · Government quota','Annual fee, printed p.69'],
40:['B.E. CSE – first year',120000,'Government quota','Additional training/placement and admission fees, printed p.70'],
41:['CSE / AI&ML / IT / AI&DS – first year',123000,'BC/MBC/OC · Government quota','Annual fee, printed p.77'],
42:['Nursing tuition including hostel',200000,'Published package','Admission, book/uniform separate; printed p.79'],
43:['B.Sc. Nursing – first year (girls/boys)',186000,'Published first-year tuition/hostel package','See additional uniform/book charges, printed p.80'],
47:['CSE / ECE / AI&DS – first year',65000,'BC/MBC/OC · Government quota','Engineering, printed p.86'],
48:['Agricultural Engineering – first year',95000,'BC/MBC/OC · Government quota','Annual fee, printed p.88'],
49:['B.Tech AI&DS / IT / CSE – first year',60000,'BC/MBC/OC · Government quota','Annual fee, printed p.89'],
50:['B.Sc. OTAT / CT – first year',250000,'Published first-year fee','Subsequent year fees differ; printed p.91'],
51:['AI&DS / CSE / IT – first year',70000,'BC/MBC/OC · Government quota','Annual fee, printed p.92'],
52:['CSE / AI&ML / ECE / Cyber Security',80000,'BC/MBC/OC · Annual college fee','Other expenses, printed p.93'],
53:['B.Tech CSE – first year',105000,'Management tuition fee','See government quota, discounts and hostel fees, printed p.94'],
54:['CSE / AI&DS – first year',70000,'BC/MBC/OC · Government quota','Annual fee, printed p.95'],
55:['CSE / AI&ML / AI – first year',110000,'BC/MBC/OC · Government quota','Annual fee, printed p.96'],
56:['B.Pharm',140000,'GQ / MQ yearly fee','Published pharmacy fee, printed p.97'],
57:['AI&DS / IT / CSE – first year',65000,'BC/MBC/OC · Government quota','Annual fee, printed p.98'],
58:['Nursing tuition including hostel',180000,'Published yearly package','Admission fee separate, printed p.98'],
59:['AI&DS / IT / CSE / AI&ML – first year',100000,'BC/MBC/OC · Government quota','Annual fee, printed p.99'],
60:['AI&DS / IT / CSE – first year',65000,'BC/MBC/OC · Government quota','Annual fee, printed p.100'],
61:['B.Pharm',110000,'Published annual fee','Admission/registration extras, printed p.101'],
62:['B.E. CSE – first year',90000,'Management tuition fee','One-time fees/other charges, printed p.102'],
63:['CSE / IT / AI&DS – first year',75000,'BC/MBC/OC · Government quota','Annual fee, printed p.104'],
64:['CSE / AI&DS – first year',300000,'Management quota','Government quota differs, printed p.104'],
65:['CSE / IT / AI&DS / ECE – first year',80000,'BC/MBC/OC · Government quota','Annual fee, printed p.105'],
66:['B.E. CSE – first year',125000,'Published annual fee','Semester amounts listed; printed p.106'],
67:['B.E. CSE – first year',60000,'OC / BC / MBC / BCM college fee','Hostel and other fees separate, printed p.107'],
70:['CSE – first year',130000,'Government quota','KSR CE 2nd College, printed p.110'],
71:['CSE / IT / AI&DS – first year',90000,'BC/MBC/OC · Government quota','Engineering college, printed p.114'],
}
# Present a few additional course labels only where the fee booklet explicitly shows them.
courseOverrides={
1:['CSE','AI & Data Science','IT','Cyber Security','ECE','Biomedical','Agriculture'],
2:['CSE','IT','Cyber Security','AI & Data Science','ECE','Mechanical','Civil'],
3:['CSE','Artificial Intelligence & Data Science','ECE','Mechanical','MCA','MBA'],
4:['CSE','Artificial Intelligence & Data Science','IT','Biomedical','Civil'],
5:['CSE','AI & Data Science','IT','Cyber Security','ECE','Mechanical'],
7:['CSE','IT','AI & Data Science','AI & Machine Learning','ECE','Civil'],
10:['CSE','AI & Data Science','IT','ECE','Mechanical'],
11:['AI & Data Science','CSE','IT','ECE','Cyber Security'],
15:['CSE','AI & Data Science','IT','ECE','EEE','Mechanical'],
16:['CSE','AI & Data Science','IT','Automobile','Civil','ECE'],
17:['AI & Machine Learning','CSE','Cyber Security','ECE','IT','AI & Data Science'],
18:['AI & Data Science','CSE','AI & Machine Learning','ECE','Civil','Mechanical'],
19:['CSE','AI & Data Science','IT','AI & Machine Learning','ECE'],
20:['CSE','AI & Data Science','IT','Cyber Security','ECE','Mechanical'],
21:['AI & Data Science','CSE','IT','AI & Machine Learning','ECE'],
23:['CSE','IT','ECE','Mechanical','Civil','EEE'],
24:['CSE','IT','AI & Data Science','Cyber Security','AI & Machine Learning','ECE'],
25:['CSE','AI & Data Science','IT','ECE','EEE','Mechanical'],
26:['AI & Data Science','CSE','ECE','Biomedical','Food Technology','Cyber Security'],
27:['Cyber Security','CSE','IT','AI & Data Science','ECE','AI & Machine Learning'],
28:['Cyber Security','AI & Data Science','CSE','IT','ECE','Mechanical'],
31:['CSE','AI & Data Science','Computer Science & Business Systems','AI & Machine Learning','Cyber Security'],
32:['AI & Data Science','CSE','IT','Cyber Security','ECE','Civil'],
33:['CSE','IT','AI & Data Science','ECE','EEE','Civil'],
38:['IT','Cyber Security','ECE','CSE','AI & Data Science','EEE'],
41:['CSE','AI & Machine Learning','IT','AI & Data Science','Biotechnology'],
42:['B.Sc. Nursing'],
43:['B.Sc. Nursing','B.Sc. Accident & Emergency Care','Operation Theatre & Anaesthesia'],
44:['CSE','AI & Data Science','Biomedical','Petroleum Engineering','Arts & Science'],
46:['B.Pharm','Pharm.D','D.Pharm','BPT'],
50:['B.Sc. Nursing','BPT','OTAT','RIT','MLT'],
56:['B.Pharm','D.Pharm','BPT','Pharm.D','M.Pharm'],
58:['B.Sc. Nursing'],
61:['B.Pharm','D.Pharm','M.Pharm','B.Sc. Nursing','Physiotherapy'],
66:['CSE','AI & Data Science','AI & Machine Learning','ECE','Food Technology'],
70:['CSE','AI & Data Science','ECE','IT','Cyber Security','MBA'],
71:['CSE','IT','AI & Data Science','ECE','Mechanical','Civil','B.Sc. Nursing']
}
# Fee pages 108 and 109 are indexed but missing in the 115-page supplied document.
def pdfpage(p):
    if p<=53:return p+3
    if 55<=p<=107:return p+2
    if p>=110:return p
    return None
items=[]
for i,(name,printed,city,kind) in enumerate(parsed,1):
    printed=int(printed)
    page=pdfpage(printed)
    slug=re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',name).lower()).strip('-')
    streams=streamOverride.get(name,[kind] if kind!='Multi-disciplinary' else ['Engineering','Arts & Science'])
    item=dict(id=i,slug=slug,name=name,city=city,state='Tamil Nadu',type=kind,streams=streams,
              printedPage=printed,pdfPage=page,availableInFile=page is not None,
              bookletYear='2026',courses=courseOverrides.get(i,[]),feeExample=None)
    if i in fees:
        program,amt,quota,note=fees[i]
        item['feeExample']=dict(program=program,amount=amt,category=quota,note=note)
    items.append(item)
(root/'src/data/colleges.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
(root/'src/data/catalog-summary.json').write_text(json.dumps({'count':len(items),'hasFeeExample':len(fees),'missingPages':[{'college':x['name'],'printedPage':x['printedPage']} for x in items if not x['availableInFile']],'source':'SUN STAR FEES STRUCTURE 2026, user-uploaded 115-page booklet'},indent=2))
print('catalog count',len(items),'feeExamples',len(fees),'missing pages', [x['printedPage'] for x in items if not x['availableInFile']])
