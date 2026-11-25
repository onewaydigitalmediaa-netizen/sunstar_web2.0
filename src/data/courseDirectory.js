const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const categoryLabels = {
  'MEDICAL': 'Medical',
  'ENGINEERING (B.E. / B.TECH)': 'Engineering',
  'ENGINEERING (M.E. / M.TECH)': 'Engineering',
  'ARTS & SCIENCE': 'Arts & Science',
  'MANAGEMENT': 'Management',
  'ALLIED HEALTH SCIENCES': 'Allied Health Sciences',
  'NURSING': 'Nursing',
  'PHARMACY': 'Pharmacy',
  'AGRICULTURE & HORTICULTURE': 'Agriculture & Horticulture',
  'LAW': 'Law'
};
export const COURSE_CATEGORY_LABELS=categoryLabels;
export const COURSE_GROUPS = [
    {
        "level":  "UG",
        "name":  "MEDICAL",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "MBBS",
                                           "BDS",
                                           "B.V.Sc. \u0026 A.H."
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "ENGINEERING (B.E. / B.TECH)",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "B.Tech Computer Science Engineering (CSE)",
                                           "B.Tech AI \u0026 ML",
                                           "B.Tech AI \u0026 DS",
                                           "B.Tech Cyber Security",
                                           "B.Tech EEE",
                                           "B.Tech ECE",
                                           "B.Tech Mechanical Engineering",
                                           "B.Tech Information Technology (IT)",
                                           "B.Tech Cloud Computing",
                                           "B.Tech Robotics and Automation",
                                           "B.Tech Aeronautical Engineering",
                                           "B.Tech Aerospace Engineering"
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "ARTS \u0026 SCIENCE",
        "groups":  [
                       {
                           "name":  "Arts Courses",
                           "courses":  [
                                           "BA English",
                                           "BA Tamil / Hindi / Telugu / Malayalam / Kannada",
                                           "BA History",
                                           "BA Political Science",
                                           "BA Economics",
                                           "BA Sociology",
                                           "BA Psychology",
                                           "BA Philosophy",
                                           "BA Geography",
                                           "BA Public Administration",
                                           "BA Journalism and Mass Communication",
                                           "BA Sanskrit",
                                           "BA Anthropology",
                                           "BA Social Work (BSW)",
                                           "BA Criminology",
                                           "BA Tourism and Travel Management",
                                           "BA Liberal Arts",
                                           "BA Foreign Languages (French / German / Japanese / Spanish)"
                                       ]
                       },
                       {
                           "name":  "Science Courses",
                           "courses":  [
                                           "B.Sc. Physics",
                                           "B.Sc. Chemistry",
                                           "B.Sc. Mathematics",
                                           "B.Sc. Statistics",
                                           "B.Sc. Computer Science",
                                           "B.Sc. Information Technology",
                                           "B.Sc. Data Science",
                                           "B.Sc. Artificial Intelligence",
                                           "B.Sc. Cyber Security",
                                           "B.Sc. Electronics",
                                           "B.Sc. Botany",
                                           "B.Sc. Zoology",
                                           "B.Sc. Biotechnology",
                                           "B.Sc. Microbiology",
                                           "B.Sc. Biochemistry",
                                           "B.Sc. Genetics",
                                           "B.Sc. Environmental Science",
                                           "B.Sc. Forensic Science",
                                           "B.Sc. Geology",
                                           "B.Sc. Nutrition and Dietetics",
                                           "B.Sc. Psychology",
                                           "B.Sc. Visual Communication",
                                           "B.Sc. Animation and VFX",
                                           "B.Sc. Aviation Science",
                                           "B.Sc. Hotel Management",
                                           "B.Sc. Food Science and Technology",
                                           "B.Sc. Fashion Design",
                                           "B.Sc. Home Science"
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "MANAGEMENT",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "BBA",
                                           "B.Com",
                                           "BBA (Hons.)",
                                           "B.Com (Hons.)",
                                           "BMS",
                                           "BBM",
                                           "BBA Business Analytics",
                                           "BBA International Business",
                                           "BBA Digital Marketing",
                                           "B.Com Computer Applications"
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "ALLIED HEALTH SCIENCES",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "B.Sc. Medical Laboratory Technology (MLT)",
                                           "B.Sc. Medical Imaging Technology",
                                           "B.Sc. Cardiac Care Technology",
                                           "B.Sc. Operation Theatre Technology (OTT)",
                                           "B.Sc. Anaesthesia Technology",
                                           "B.Sc. Renal Dialysis Technology",
                                           "B.Sc. Respiratory Care Technology",
                                           "B.Sc. Optometry",
                                           "B.Sc. Perfusion Technology",
                                           "B.Sc. Emergency and Trauma Care Technology"
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "NURSING",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "B.Sc. Nursing",
                                           "GNM",
                                           "ANM",
                                           "B.Sc. Nursing (Post Basic)"
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "PHARMACY",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "B.Pharm",
                                           "Pharm.D",
                                           "B.Pharm Lateral Entry"
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "AGRICULTURE \u0026 HORTICULTURE",
        "groups":  [
                       {
                           "name":  "Agriculture",
                           "courses":  [
                                           "B.Sc. (Hons.) Agriculture",
                                           "B.Sc. (Hons.) Agriculture – Tamil Medium",
                                           "B.Sc. (Hons.) Agri-Business Management",
                                           "B.Sc. (Hons.) Forestry",
                                           "B.Sc. (Hons.) Sericulture",
                                           "B.Tech Agricultural Engineering",
                                           "B.Tech Agricultural Information Technology",
                                           "B.Tech Food Technology",
                                           "B.Tech Biotechnology",
                                           "B.Tech Bioinformatics",
                                           "B.Tech Energy and Environmental Engineering",
                                           "B.Sc. (Hons.) Food, Nutrition and Dietetics",
                                           "B.Sc. (Hons.) Natural Farming"
                                       ]
                       },
                       {
                           "name":  "Horticulture",
                           "courses":  [
                                           "B.Sc. (Hons.) Horticulture",
                                           "B.Sc. (Hons.) Horticulture – Tamil Medium"
                                       ]
                       }
                   ]
    },
    {
        "level":  "UG",
        "name":  "LAW",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "BA LL.B.",
                                           "BBA LL.B.",
                                           "B.Com LL.B.",
                                           "B.Sc. LL.B.",
                                           "LL.B."
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "MEDICAL",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "MD General Medicine",
                                           "MD Paediatrics",
                                           "MD Dermatology",
                                           "MD Anaesthesiology",
                                           "MD Radiodiagnosis",
                                           "MD Pathology",
                                           "MD Psychiatry",
                                           "MD Microbiology",
                                           "MS General Surgery",
                                           "MS Orthopaedics",
                                           "MS Obstetrics \u0026 Gynaecology",
                                           "MS Ophthalmology",
                                           "MS ENT"
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "ENGINEERING (M.E. / M.TECH)",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "M.E. Computer Science and Engineering",
                                           "M.Tech. Information Technology",
                                           "M.E. Software Engineering",
                                           "M.Tech. AI \u0026 Data Science",
                                           "M.Tech. Data Science",
                                           "M.E. VLSI Design",
                                           "M.E. Embedded Systems",
                                           "M.E. Structural Engineering",
                                           "M.E. Power Systems Engineering",
                                           "M.Tech. Biotechnology",
                                           "M.E. Communication Systems",
                                           "M.E. Mechanical Engineering"
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "ARTS \u0026 SCIENCE",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "M.A. English",
                                           "M.A. Tamil",
                                           "M.A. Economics",
                                           "M.A. History",
                                           "M.Com.",
                                           "M.Sc. Computer Science",
                                           "M.Sc. Mathematics",
                                           "M.Sc. Physics",
                                           "M.Sc. Chemistry",
                                           "M.Sc. Biotechnology",
                                           "M.Sc. Microbiology",
                                           "M.Sc. Data Science",
                                           "M.Sc. Psychology",
                                           "M.Sc. Statistics"
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "MANAGEMENT",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "MBA",
                                           "MBA Finance",
                                           "MBA Marketing",
                                           "MBA Human Resource Management",
                                           "MBA Business Analytics",
                                           "MBA International Business",
                                           "MBA Operations Management",
                                           "MBA Logistics \u0026 Supply Chain Management",
                                           "MBA Hospital Administration",
                                           "MBA Agri-Business Management",
                                           "MBA Digital Marketing",
                                           "MBA Banking \u0026 Finance",
                                           "MBA Healthcare Management",
                                           "MBA Tourism \u0026 Hospitality Management",
                                           "MCA"
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "ALLIED HEALTH SCIENCES",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "M.Sc. Medical Laboratory Science",
                                           "M.Sc. Medical Imaging Technology",
                                           "M.Sc. Anaesthesia Technology",
                                           "M.Sc. Renal Science \u0026 Dialysis Technology",
                                           "M.Sc. Respiratory Care Technology",
                                           "M.Sc. Cardiac Care Technology",
                                           "M.Sc. Critical Care Technology",
                                           "M.Sc. Neuroscience Technology",
                                           "M.Sc. Nuclear Medicine Technology",
                                           "M.Sc. Medical Biochemistry",
                                           "M.Sc. Medical Microbiology",
                                           "M.Sc. Clinical Embryology",
                                           "Master of Physiotherapy (MPT)",
                                           "Master of Occupational Therapy (MOT)",
                                           "Master of Optometry (M.Optom)",
                                           "MASLP"
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "NURSING",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "M.Sc. Medical-Surgical Nursing",
                                           "M.Sc. Obstetrics \u0026 Gynaecological Nursing",
                                           "M.Sc. Paediatric Nursing",
                                           "M.Sc. Psychiatric / Mental Health Nursing",
                                           "M.Sc. Community Health Nursing",
                                           "M.Sc. Critical Care Nursing"
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "PHARMACY",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "M.Pharm Pharmaceutics",
                                           "M.Pharm Pharmacology",
                                           "M.Pharm Pharmaceutical Chemistry",
                                           "M.Pharm Pharmaceutical Analysis",
                                           "M.Pharm Pharmacognosy",
                                           "M.Pharm Pharmacy Practice",
                                           "M.Pharm Pharmaceutical Biotechnology",
                                           "M.Pharm Industrial Pharmacy",
                                           "M.Pharm Quality Assurance",
                                           "Pharm.D (Post Baccalaureate)"
                                       ]
                       }
                   ]
    },
    {
        "level":  "PG",
        "name":  "AGRICULTURE \u0026 HORTICULTURE",
        "groups":  [
                       {
                           "name":  "",
                           "courses":  [
                                           "M.Sc. (Agri.) Agronomy",
                                           "M.Sc. (Agri.) Horticulture",
                                           "M.Sc. (Agri.) Genetics \u0026 Plant Breeding",
                                           "M.Sc. (Agri.) Soil Science",
                                           "M.Sc. (Agri.) Agricultural Economics",
                                           "M.Sc. (Agri.) Plant Pathology",
                                           "M.Sc. (Agri.) Agricultural Entomology",
                                           "M.Sc. (Agri.) Agricultural Microbiology",
                                           "M.Sc. (Agri.) Seed Science \u0026 Technology",
                                           "M.Sc. (Agri.) Plant Physiology",
                                           "M.Sc. (Hort.) Fruit Science",
                                           "M.Sc. (Hort.) Vegetable Science",
                                           "M.Sc. (Hort.) Floriculture \u0026 Landscaping",
                                           "M.Sc. (Hort.) Plantation, Spices, Medicinal \u0026 Aromatic Crops"
                                       ]
                       }
                   ]
    }
];

export const COURSE_DIRECTORY = COURSE_GROUPS.flatMap(category => category.groups.flatMap(group => group.courses.map(name => ({
 id:`${category.level.toLowerCase()}-${slugify(category.name)}-${slugify(name)}`,
 name,
 level:category.level,
 category:category.name,
 categoryLabel:categoryLabels[category.name]||category.name,
 subcategory:group.name||null,
 duration:null,
 eligibility:{qualification:null,subjects:[],minimumMarks:null,entranceExamination:null},
 fees:null,
 collegeIds:[],
 source:null
}))));
