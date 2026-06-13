
const products = [
    {
        id: "reishi",
        name: "Reishi Capsules",
        keywords: /reishi|lingzhi|ganoderma|immune|fatigue/i,
        image: "assets/img/product/Reishi.png",
        description: "The 'Mushroom of Immortality'. Boosts immune system, reduces fatigue, and supports cardiovascular health.",
        price: "₦35,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "re-vive",
        name: "Re-Vive Capsules",
        keywords: /re-vive|revive|sexual health|stamina|libido|erection/i,
        image: "assets/img/product/Revive.png",
        description: "Premier herbal formula for male vitality, sexual performance, and lasting stamina.",
        price: "₦44,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "cordy-active",
        name: "Cordy Active Capsules",
        keywords: /cordy active|stamina|athletic|respiratory|lung/i,
        image: "assets/img/product/Cordy Active.png",
        description: "Combines Cordyceps and Zinc. Excellent for respiratory health, stamina, and anti-aging.",
        price: "₦25,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "golden-six",
        name: "Golden Six Capsules",
        keywords: /golden six|hormonal|kidney|liver|diabetes|menopause/i,
        image: "assets/img/product/Golden six.png",
        description: "Classic formula for kidney and liver health. Balances hormones and supports blood sugar levels.",
        price: "₦15,500",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "magilim",
        name: "Magilim Capsules",
        keywords: /magilim|weight|fat|slimming|detox/i,
        image: "assets/img/product/Magilim.png",
        description: "Effective weight management solution. Promotes fat burning and controls appetite naturally.",
        price: "₦30,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "gastrifort",
        name: "Gastrifort Capsules",
        keywords: /gastrifort|stomach|ulcer|digestion|gastritis/i,
        image: "assets/img/product/Gastrifort.png",
        description: "Premium herbal tonic for gastrointestinal health. Relieves ulcers, gastritis, and chronic indigestion.",
        price: "₦35,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "cello-q10",
        name: "Cello Q10 Capsules",
        keywords: /cello q10|heart|cardio|energy|coq10/i,
        image: "assets/img/product/CELLO Q10.jpg",
        description: "Vital for heart health. Supports cellular energy, cardiovascular function, and antioxidant protection.",
        price: "₦45,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "jointeez",
        name: "Jointeez Capsules",
        keywords: /jointeez|joint|arthritis|bone|inflammation/i,
        image: "assets/img/product/Jointeez.png",
        description: "Fast-acting relief for joint pain and inflammation. Promotes bone density and flexibility.",
        price: "₦28,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "colon-cleanse",
        name: "Colon Cleanse Tea",
        keywords: /colon cleanse|tea|gut|detox|bowel/i,
        image: "assets/img/product/Colon Cleanse.png",
        description: "Natural detoxification for the digestive system. Clears the colon and improves nutrient absorption.",
        price: "₦22,000",
        type: "Tea",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "golden-hypha",
        name: "Golden Hypha Capsules",
        keywords: /golden hypha|immune|cancer|fibroid|hepatitis/i,
        image: "assets/img/product/Golden hypha.png",
        description: "Advanced immune booster. Specifically targets abnormal growths, fibroids, and liver issues.",
        price: "₦42,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "lycovite",
        name: "Lycovite Capsules",
        keywords: /lycovite|prostate|sperm|male fertility/i,
        image: "assets/img/product/Lycovite.png",
        description: "Formulated for prostate health and male fertility. Improves sperm quality and concentration.",
        price: "₦18,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "diawell",
        name: "Diawell Capsules",
        keywords: /diawell|diabetes|sugar|pancreas/i,
        image: "assets/img/product/Diawell.png",
        description: "Specifically designed for blood sugar regulation and pancreatic health support.",
        price: "₦32,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "vigor-essential",
        name: "Vigor Essential Capsules",
        keywords: /vigor|stamina|sperm|male vitality/i,
        image: "assets/img/product/Vigor Essential.png",
        description: "Natural energy booster for men. Improves sperm count and overall physical vigor.",
        price: "₦16,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "gynapharm",
        name: "Gynapharm Capsules",
        keywords: /gynapharm|female|infertility|infection|tubal/i,
        image: "assets/img/product/Gynapharm.png",
        description: "Supports female reproductive health. Treats infections and supports tubal openness.",
        price: "₦38,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "constilease",
        name: "Constilease Capsules",
        keywords: /constilease|constipation|hemorrhoid|piles/i,
        image: "assets/img/product/Constilease.png",
        description: "Effective relief for chronic constipation and hemorrhoids. Softens stool naturally.",
        price: "₦15,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "sanitary-pad",
        name: "7 Layer Sanitary Pad",
        keywords: /sanitary|pad|menstrual|period|hygiene/i,
        image: "assets/img/product/sanitary-pad.png",
        description: "Premium herbal-infused 7-layer protection. Anti-bacterial, breathable, and provides superior absorption and comfort during menstruation.",
        price: "₦4,500",
        type: "Hygiene",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "gum-care",
        name: "Kedi Gum Care",
        keywords: /gum care|teeth|breath|oral|tooth/i,
        image: "assets/img/product/gum-care.png",
        description: "Natural herbal formula for strong gums, fresh breath, and tooth protection. Prevents bleeding and plaque buildup.",
        price: "₦8,500",
        type: "Oral Care",
        buyNowLink: "https://wa.me/2349015092132"
    },
    {
        id: "cardibetter",
        name: "Cardibetter Capsules",
        keywords: /cardibetter|heart|blood pressure|cardiovascular|hypertension/i,
        image: "assets/img/product/CARDIBETTER222.png",
        description: "Advanced cardiac prime formula. Supports healthy blood pressure, heart muscle strength, and improved circulation.",
        price: "₦35,000",
        type: "Capsules",
        buyNowLink: "https://wa.me/2349015092132"
    }
];

const healthConditions = [
    // Cardiovascular
    { name: "Hypertension", recommendedProducts: ["Cello Q10", "Golden Six", "Reishi"], description: "Chronic high blood pressure leading to heart stress.", prescription: "Take Cello Q10 twice daily with Golden Six." },
    { name: "Arteriosclerosis", recommendedProducts: ["Cello Q10", "Cordy Active"], description: "Hardening and narrowing of the arteries.", prescription: "Cello Q10 (2x daily) + Cordy Active (2x daily)." },
    { name: "Angina Pectoris", recommendedProducts: ["Cello Q10"], description: "Chest pain due to reduced blood flow to the heart.", prescription: "Maintain Cello Q10 dosage for 3-6 months." },
    { name: "High Cholesterol", recommendedProducts: ["Colon Cleanse", "Magilim"], description: "Excess fats in the blood.", prescription: "Colon Cleanse Tea daily + Magilim before meals." },
    { name: "Poor Circulation", recommendedProducts: ["Cello Q10", "Reishi"], description: "Numbness or coldness in extremities.", prescription: "Reishi daily for improved micro-circulation." },
    { name: "Heart Palpitations", recommendedProducts: ["Cello Q10", "Reishi"], description: "Irregular or forceful heartbeats.", prescription: "Cello Q10 for heart rhythm support." },
    { name: "Stroke Recovery", recommendedProducts: ["Golden Six", "Cello Q10", "Reishi"], description: "Regaining function after a stroke.", prescription: "Golden Six (2x daily) + Cello Q10 (1x daily)." },
    { name: "Varicose Veins", recommendedProducts: ["Cello Q10", "Reishi"], description: "Swollen, twisted veins.", prescription: "Supportive cardio therapy with Cello Q10." },
    { name: "Anemia", recommendedProducts: ["Reishi", "Cordy Active"], description: "Lack of healthy red blood cells.", prescription: "Reishi (2x daily) for blood replenishment." },
    { name: "Low Blood Pressure", recommendedProducts: ["Cordy Active", "Reishi"], description: "Hypotension causing dizziness.", prescription: "Cordy Active for energy and pressure balance." },

    // Respiratory
    { name: "Asthma", recommendedProducts: ["Cordy Active", "Golden Hypha"], description: "Chronic inflammation of the airways.", prescription: "Cordy Active (2x daily) + Golden Hypha." },
    { name: "Bronchitis", recommendedProducts: ["Cordy Active", "Reishi"], description: "Inflammation of the bronchial tube lining.", prescription: "Cordy Active (3x daily) + Reishi for immunity." },
    { name: "Chronic Cough", recommendedProducts: ["Cordy Active"], description: "Persistent cough lasting over 8 weeks.", prescription: "Cordy Active morning and night." },
    { name: "Tuberculosis Support", recommendedProducts: ["Golden Hypha", "Cordy Active"], description: "Bacterial infection of the lungs.", prescription: "Golden Hypha (3x daily) + Cordy Active." },
    { name: "Shortness of Breath", recommendedProducts: ["Cordy Active", "Cello Q10"], description: "Dyspnea or difficulty breathing.", prescription: "Cordy Active + Cello Q10 for lung/heart support." },
    { name: "Sinusitis", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Inflammation of the sinuses.", prescription: "Reishi (2x daily) + Golden Hypha for 2 weeks." },
    { name: "Pneumonia Recovery", recommendedProducts: ["Cordy Active", "Reishi"], description: "Lungs inflammation caused by infection.", prescription: "Cordy Active (3x daily) + Reishi." },
    { name: "Smoker's Lung", recommendedProducts: ["Cordy Active", "Colon Cleanse"], description: "Damage from long-term smoking.", prescription: "Cordy Active (3x daily) + Colon Cleanse Tea." },
    { name: "Pleural Effusion", recommendedProducts: ["Golden Hypha", "Cordy Active"], description: "Fluid buildup around the lungs.", prescription: "Supportive therapy with Golden Hypha." },
    { name: "Hay Fever", recommendedProducts: ["Reishi", "Cordy Active"], description: "Allergic response to pollen.", prescription: "Reishi for immune modulation." },

    // Digestive
    { name: "Peptic Ulcer", recommendedProducts: ["Gastrifort", "Reishi"], description: "Sores in the stomach lining or duodenum.", prescription: "Gastrifort (2x daily before meals) + Reishi." },
    { name: "Chronic Gastritis", recommendedProducts: ["Gastrifort"], description: "Inflammation of the stomach lining.", prescription: "Gastrifort (2x daily) for 1 month." },
    { name: "Acid Reflux / GERD", recommendedProducts: ["Gastrifort"], description: "Stomach acid flowing back into the esophagus.", prescription: "Gastrifort after every meal." },
    { name: "Constipation", recommendedProducts: ["Constilease", "Colon Cleanse"], description: "Difficulty in bowel movements.", prescription: "Constilease (2 capsules at night) + Tea." },
    { name: "Hemorrhoids (Piles)", recommendedProducts: ["Constilease", "Colon Cleanse", "Golden Hypha"], description: "Swollen veins in the lower rectum.", prescription: "Constilease (2x daily) + Colon Cleanse Tea." },
    { name: "Indigestion / Bloating", recommendedProducts: ["Gastrifort", "Colon Cleanse"], description: "Discomfort in the upper abdomen.", prescription: "Gastrifort + Colon Cleanse Tea after meals." },
    { name: "Irritable Bowel Syndrome", recommendedProducts: ["Gastrifort", "Reishi"], description: "Functional gastrointestinal disorder.", prescription: "Gastrifort (2x daily) + Reishi for stress." },
    { name: "Food Poisoning", recommendedProducts: ["Reishi", "Colon Cleanse"], description: "Illness from contaminated food.", prescription: "Reishi (double dose) + Colon Cleanse Tea." },
    { name: "Liver Cirrhosis", recommendedProducts: ["Golden Hypha", "Golden Six"], description: "Scarring of the liver.", prescription: "Golden Hypha (3x daily) + Golden Six." },
    { name: "Hepatitis A/B/C", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Inflammation of the liver due to virus.", prescription: "Golden Hypha (3x daily) + Reishi (2x daily)." },
    { name: "Fatty Liver", recommendedProducts: ["Golden Six", "Magilim"], description: "Excess fat buildup in liver cells.", prescription: "Golden Six (2x daily) + Magilim (2x daily)." },
    { name: "Gallstones", recommendedProducts: ["Golden Six", "Colon Cleanse"], description: "Hardened deposits in the gallbladder.", prescription: "Golden Six + Colon Cleanse Tea." },
    { name: "Typhoid Fever", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Bacterial infection from contaminated food.", prescription: "Reishi (3x daily) + Golden Hypha." },

    // Reproductive (Male)
    { name: "Weak Erection", recommendedProducts: ["Re-vive", "Vigor Essential"], description: "Inability to maintain a firm erection.", prescription: "Re-vive (1 capsule 2 hours before) + Vigor (daily)." },
    { name: "Premature Ejaculation", recommendedProducts: ["Re-vive", "Golden Six"], description: "Ejaculating sooner than desired.", prescription: "Re-vive + Golden Six for hormonal balance." },
    { name: "Low Sperm Count", recommendedProducts: ["Vigor Essential", "Lycovite", "Golden Six"], description: "Oligospermia or low sperm density.", prescription: "Vigor (2x daily) + Lycovite (1x daily)." },
    { name: "Prostate Enlargement (BPH)", recommendedProducts: ["Lycovite", "Golden Six", "Reishi"], description: "Non-cancerous growth of the prostate.", prescription: "Lycovite (2x daily) + Golden Six (2x daily)." },
    { name: "Prostatitis", recommendedProducts: ["Lycovite", "Golden Hypha"], description: "Inflammation of the prostate gland.", prescription: "Lycovite (2x daily) + Golden Hypha." },
    { name: "Low Libido (Male)", recommendedProducts: ["Re-vive", "Cordy Active"], description: "Reduced sexual desire in men.", prescription: "Re-vive + Cordy Active for stamina." },
    { name: "Male Infertility", recommendedProducts: ["Lycovite", "Vigor Essential", "Re-vive"], description: "Inability to conceive due to male factors.", prescription: "Full 3-month course of Lycovite and Vigor." },

    // Reproductive (Female)
    { name: "Female Infertility", recommendedProducts: ["Gynapharm", "Golden Hypha", "Golden Six"], description: "Difficulty conceiving due to female factors.", prescription: "Gynapharm (2x daily) + Golden Six." },
    { name: "Fibroids", recommendedProducts: ["Golden Hypha", "Reishi", "Gynapharm"], description: "Non-cancerous growths in the uterus.", prescription: "Golden Hypha (3x daily) + Reishi (2x daily)." },
    { name: "Ovarian Cysts", recommendedProducts: ["Golden Hypha", "Gynapharm"], description: "Fluid-filled sacs in an ovary.", prescription: "Golden Hypha (3x daily) + Gynapharm." },
    { name: "Endometriosis", recommendedProducts: ["Gynapharm", "Golden Hypha"], description: "Tissue growing outside the uterus.", prescription: "Gynapharm (2x daily) + Golden Hypha." },
    { name: "Irregular Menstruation", recommendedProducts: ["Golden Six", "Reishi"], description: "Inconsistent menstrual cycles.", prescription: "Golden Six (2x daily) + Reishi." },
    { name: "Painful Menstruation (Dysmenorrhea)", recommendedProducts: ["Golden Six", "Reishi"], description: "Severe cramps during periods.", prescription: "Golden Six (start 1 week before period)." },
    { name: "Menopause Symptoms", recommendedProducts: ["Golden Six", "Cordy Active"], description: "Hot flashes, mood swings, night sweats.", prescription: "Golden Six (2x daily) + Cordy Active." },
    { name: "Vaginal Discharge / Yeast Infection", recommendedProducts: ["Gynapharm", "Reishi"], description: "Abnormal discharge or fungal growth.", prescription: "Gynapharm (3x daily) + Reishi." },
    { name: "Pelvic Inflammatory Disease (PID)", recommendedProducts: ["Gynapharm", "Golden Hypha"], description: "Infection of female reproductive organs.", prescription: "Gynapharm (3x daily) + Golden Hypha." },
    { name: "Blocked Fallopian Tubes", recommendedProducts: ["Gynapharm", "Golden Hypha"], description: "Obstruction in reproductive tubes.", prescription: "Intensive 3-month course of Gynapharm." },

    // Metabolic / Endocrine
    { name: "Diabetes Type 2", recommendedProducts: ["Diawell", "Golden Six", "Magilim"], description: "High blood sugar due to insulin resistance.", prescription: "Diawell (2x daily) + Golden Six (2x daily)." },
    { name: "Obesity / Weight Gain", recommendedProducts: ["Magilim", "Colon Cleanse"], description: "Excessive body fat accumulation.", prescription: "Magilim (3 capsules 30 mins before meals)." },
    { name: "Thyroid Issues (Hypothyroid)", recommendedProducts: ["Golden Six", "Cordy Active"], description: "Underactive thyroid gland.", prescription: "Golden Six + Cordy Active for metabolism." },
    { name: "Gout", recommendedProducts: ["Jointeez", "Colon Cleanse"], description: "Uric acid buildup in joints.", prescription: "Jointeez (2x daily) + Colon Cleanse Tea." },
    { name: "Chronic Fatigue", recommendedProducts: ["Cordy Active", "Reishi"], description: "Extreme tiredness that doesn't improve with rest.", prescription: "Cordy Active (2x daily) + Reishi." },

    // Bone / Joint
    { name: "Arthritis", recommendedProducts: ["Jointeez", "Reishi"], description: "Joint inflammation causing pain/stiffness.", prescription: "Jointeez (2x daily) + Reishi." },
    { name: "Rheumatism", recommendedProducts: ["Jointeez", "Cordy Active"], description: "Chronic pain in joints or connective tissue.", prescription: "Jointeez (2x daily) + Cordy Active." },
    { name: "Osteoporosis", recommendedProducts: ["Jointeez", "Golden Six"], description: "Brittle and weak bones.", prescription: "Jointeez + Golden Six for bone density." },
    { name: "Back Pain", recommendedProducts: ["Jointeez", "Golden Six"], description: "Discomfort in the lumbar or spinal area.", prescription: "Jointeez + Golden Six." },
    { name: "Cervical Spondylosis", recommendedProducts: ["Jointeez", "Cello Q10"], description: "Age-related wear in neck discs.", prescription: "Jointeez + Cello Q10 for circulation." },

    // Neurological
    { name: "Insomnia", recommendedProducts: ["Reishi", "Golden Six"], description: "Difficulty falling or staying asleep.", prescription: "Reishi (2 capsules before bed) + Golden Six." },
    { name: "Memory Loss / Poor Focus", recommendedProducts: ["Cordy Active", "Cello Q10"], description: "Cognitive decline or brain fog.", prescription: "Cordy Active (2x daily) + Cello Q10." },
    { name: "Migraine / Chronic Headache", recommendedProducts: ["Reishi", "Cello Q10"], description: "Severe recurring headaches.", prescription: "Reishi (2x daily) + Cello Q10." },
    { name: "Epilepsy Support", recommendedProducts: ["Reishi", "Cello Q10"], description: "Supportive care for seizure disorders.", prescription: "Reishi for nervous system stabilization." },
    { name: "Parkinson's Support", recommendedProducts: ["Cello Q10", "Reishi"], description: "Support for motor system disorders.", prescription: "Cello Q10 for cellular energy." },

    // Immune / General
    { name: "Malaria", recommendedProducts: ["Qinghao", "Reishi"], description: "Parasitic infection from mosquito bites.", prescription: "Qinghao (as directed) + Reishi for recovery." },
    { name: "Immune Deficiency", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Weakened immune system.", prescription: "Reishi (2x daily) + Golden Hypha." },
    { name: "Cancer Support", recommendedProducts: ["Golden Hypha", "Reishi", "Cordy Active"], description: "Complementary herbal support for patients.", prescription: "Golden Hypha (3x daily) + Reishi (3x daily)." },
    { name: "HIV/AIDS Support", recommendedProducts: ["Reishi", "Golden Hypha", "Cordy Active"], description: "Boosting CD4 count and general immunity.", prescription: "Reishi (3x daily) + Golden Hypha + Cordy Active." },
    { name: "Skin Infections / Eczema", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Inflammatory skin conditions.", prescription: "Reishi (2x daily) + Golden Hypha." },
    { name: "Premature Aging", recommendedProducts: ["Cordy Active", "Reishi"], description: "Early appearance of aging signs.", prescription: "Cordy Active (2x daily) + Reishi." },
    { name: "Kidney Stones", recommendedProducts: ["Golden Six", "Colon Cleanse"], description: "Hard deposits of minerals in kidneys.", prescription: "Golden Six (3x daily) + Lots of water." },
    { name: "Tinnitus", recommendedProducts: ["Golden Six", "Reishi"], description: "Ringing in the ears.", prescription: "Golden Six for kidney/ear meridian support." },
    { name: "Night Sweats", recommendedProducts: ["Golden Six"], description: "Excessive sweating during sleep.", prescription: "Golden Six (2x daily) for 2 weeks." },
    { name: "Dizziness / Vertigo", recommendedProducts: ["Golden Six", "Cello Q10"], description: "Feeling off-balance or spinning.", prescription: "Golden Six + Cello Q10." },

    // Adding more to reach closer to 200...
    { name: "Atherosclerosis", recommendedProducts: ["Cello Q10"], description: "Plaque buildup in arteries.", prescription: "Cello Q10 (2x daily)." },
    { name: "Edema", recommendedProducts: ["Golden Six", "Reishi"], description: "Swelling caused by fluid trapped in tissues.", prescription: "Golden Six for fluid balance." },
    { name: "Glaucoma Support", recommendedProducts: ["Golden Six", "Reishi"], description: "Optic nerve damage.", prescription: "Golden Six + Reishi." },
    { name: "Cataracts Support", recommendedProducts: ["Cordy Active", "Reishi"], description: "Clouding of the eye lens.", prescription: "Cordy Active (2x daily)." },
    { name: "Dental Issues / Weak Gums", recommendedProducts: ["Reishi"], description: "Gum inflammation or weak teeth.", prescription: "Reishi for inflammation." },
    { name: "General Body Pain", recommendedProducts: ["Reishi", "Jointeez"], description: "Aching muscles or joints.", prescription: "Reishi + Jointeez." },
    { name: "Loss of Appetite", recommendedProducts: ["Gastrifort", "Reishi"], description: "Anorexia or reduced hunger.", prescription: "Gastrifort before meals." },
    { name: "Sleep Apnea Support", recommendedProducts: ["Cordy Active", "Cello Q10"], description: "Breathing stops during sleep.", prescription: "Cordy Active for lung capacity." },
    { name: "Lupus Support", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Autoimmune disease support.", prescription: "Golden Hypha for immune modulation." },
    { name: "E. Coli Infection", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Bacterial infection.", prescription: "Golden Hypha + Reishi." },
    { name: "Staphylococcus", recommendedProducts: ["Golden Hypha", "Gynapharm", "Reishi"], description: "Stubborn bacterial infection.", prescription: "Intensive Golden Hypha + Gynapharm course." },
    { name: "Gonorrhea Support", recommendedProducts: ["Gynapharm", "Golden Hypha"], description: "STI support.", prescription: "Gynapharm (3x daily) + Golden Hypha." },
    { name: "Syphilis Support", recommendedProducts: ["Golden Hypha", "Reishi"], description: "STI support.", prescription: "Golden Hypha + Reishi." },
    { name: "Kidney Failure Support", recommendedProducts: ["Golden Six", "Reishi"], description: "Advanced kidney dysfunction support.", prescription: "Consult doctor, Golden Six for support." },
    { name: "Low Stamina", recommendedProducts: ["Cordy Active", "Re-vive"], description: "Quick exhaustion.", prescription: "Cordy Active daily." },
    { name: "High Uric Acid", recommendedProducts: ["Jointeez", "Colon Cleanse"], description: "Precursor to gout.", prescription: "Jointeez + Colon Cleanse Tea." },
    { name: "Joint Stiffness", recommendedProducts: ["Jointeez"], description: "Difficulty moving joints after rest.", prescription: "Jointeez (2x daily)." },
    { name: "Knee Pain", recommendedProducts: ["Jointeez"], description: "Localized pain in knee joints.", prescription: "Jointeez (2x daily)." },
    { name: "Shoulder Pain", recommendedProducts: ["Jointeez"], description: "Frozen shoulder or joint pain.", prescription: "Jointeez + Reishi." },
    { name: "Neck Pain", recommendedProducts: ["Jointeez", "Cello Q10"], description: "Stiffness or ache in the neck.", prescription: "Jointeez + Cello Q10." },
    { name: "Waist Pain", recommendedProducts: ["Jointeez", "Golden Six"], description: "Lower back or lumbar pain.", prescription: "Jointeez + Golden Six." },
    { name: "Sciatica Support", recommendedProducts: ["Jointeez", "Golden Six"], description: "Pain radiating along the sciatic nerve.", prescription: "Jointeez + Golden Six." },
    { name: "Bone Fracture Support", recommendedProducts: ["Jointeez", "Reishi"], description: "Aiding bone healing.", prescription: "Jointeez for bone density." },
    { name: "General Weakness", recommendedProducts: ["Cordy Active", "Reishi"], description: "Lack of strength.", prescription: "Cordy Active + Reishi." },
    { name: "Stress", recommendedProducts: ["Reishi", "Golden Six"], description: "Mental or emotional strain.", prescription: "Reishi (2x daily)." },
    { name: "Anxiety", recommendedProducts: ["Reishi"], description: "Feeling of worry or unease.", prescription: "Reishi (2x daily)." },
    { name: "Depression Support", recommendedProducts: ["Reishi", "Cordy Active"], description: "Mood disorder support.", prescription: "Reishi + Cordy Active." },
    { name: "Hyperactivity", recommendedProducts: ["Reishi"], description: "Excessive activity or restlessness.", prescription: "Reishi to calm nerves." },
    { name: "Cold Hands and Feet", recommendedProducts: ["Cello Q10", "Reishi"], description: "Poor peripheral circulation.", prescription: "Cello Q10." },
    { name: "Frequent Urination", recommendedProducts: ["Golden Six", "Lycovite"], description: "Urge to urinate often.", prescription: "Golden Six (2x daily)." },
    { name: "Incontinence", recommendedProducts: ["Golden Six"], description: "Loss of bladder control.", prescription: "Golden Six (3x daily)." },
    { name: "Urinary Tract Infection (UTI)", recommendedProducts: ["Gynapharm", "Golden Hypha"], description: "Infection in the urinary system.", prescription: "Gynapharm (3x daily)." },
    { name: "Candidiasis", recommendedProducts: ["Gynapharm", "Reishi"], description: "Fungal infection.", prescription: "Gynapharm + Reishi." },
    { name: "Oral Thrush", recommendedProducts: ["Reishi"], description: "Fungal infection in the mouth.", prescription: "Reishi capsules (open and apply)." },
    { name: "Bad Breath (Halitosis)", recommendedProducts: ["Colon Cleanse", "Gastrifort"], description: "Unpleasant breath odor.", prescription: "Colon Cleanse Tea + Gastrifort." },
    { name: "Mouth Ulcers", recommendedProducts: ["Reishi", "Gastrifort"], description: "Small, painful sores in the mouth.", prescription: "Reishi + Gastrifort." },
    { name: "Sore Throat", recommendedProducts: ["Reishi", "Cordy Active"], description: "Pain or irritation in the throat.", prescription: "Reishi (3x daily)." },
    { name: "Laryngitis", recommendedProducts: ["Cordy Active", "Reishi"], description: "Inflammation of the voice box.", prescription: "Cordy Active." },
    { name: "Tonsillitis", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Inflammation of the tonsils.", prescription: "Golden Hypha + Reishi." },
    { name: "Ear Infection", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Inflammation or infection in the ear.", prescription: "Golden Hypha + Reishi." },
    { name: "Dermatitis", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Skin irritation/inflammation.", prescription: "Golden Hypha + Reishi." },
    { name: "Psoriasis Support", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Skin cells building up into scales.", prescription: "Golden Hypha + Reishi." },
    { name: "Acne", recommendedProducts: ["Golden Six", "Colon Cleanse"], description: "Skin condition with pimples.", prescription: "Golden Six + Colon Cleanse Tea." },
    { name: "Skin Rashes", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Noticeable change in skin texture/color.", prescription: "Reishi + Golden Hypha." },
    { name: "Boils", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Painful, pus-filled bumps.", prescription: "Golden Hypha." },
    { name: "Ringworm", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Fungal skin infection.", prescription: "Golden Hypha + Reishi." },
    { name: "Athlete's Foot", recommendedProducts: ["Reishi"], description: "Fungal infection between toes.", prescription: "Reishi (topical & oral)." },
    { name: "Hair Loss (Premature)", recommendedProducts: ["Golden Six", "Reishi"], description: "Thinning hair or balding.", prescription: "Golden Six for kidney health." },
    { name: "Brittle Nails", recommendedProducts: ["Reishi", "Golden Six"], description: "Nails that split or break easily.", prescription: "Reishi + Golden Six." },
    { name: "Excessive Sweating", recommendedProducts: ["Golden Six"], description: "Hyperhidrosis.", prescription: "Golden Six." },
    { name: "Body Odor", recommendedProducts: ["Colon Cleanse", "Magilim"], description: "Unpleasant smell from the body.", prescription: "Colon Cleanse Tea." },
    { name: "Allergies (Skin)", recommendedProducts: ["Reishi"], description: "Skin reaction to allergens.", prescription: "Reishi (2x daily)." },
    { name: "Hives (Urticaria)", recommendedProducts: ["Reishi"], description: "Itchy welts on the skin.", prescription: "Reishi (3x daily)." },
    { name: "Sunburn Recovery", recommendedProducts: ["Reishi"], description: "Skin damage from UV rays.", prescription: "Reishi for healing." },
    { name: "Wound Healing (Slow)", recommendedProducts: ["Reishi", "Cordy Active"], description: "Delayed recovery from injuries.", prescription: "Reishi + Cordy Active." },
    { name: "Burn Recovery Support", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Healing skin after burns.", prescription: "Reishi + Golden Hypha." },
    { name: "Amenorrhea", recommendedProducts: ["Golden Six", "Gynapharm"], description: "Absence of menstruation.", prescription: "Golden Six + Gynapharm." },
    { name: "Menorrhagia", recommendedProducts: ["Golden Six", "Reishi"], description: "Heavy or prolonged periods.", prescription: "Golden Six + Reishi." },
    { name: "Tubal Blockage", recommendedProducts: ["Gynapharm", "Golden Hypha"], description: "Obstruction in fallopian tubes.", prescription: "Intensive Gynapharm course." },
    { name: "Polycystic Ovary Syndrome (PCOS)", recommendedProducts: ["Golden Six", "Magilim", "Golden Hypha"], description: "Hormonal disorder in women.", prescription: "Golden Six + Magilim + Hypha." },
    { name: "Pelvic Pain", recommendedProducts: ["Gynapharm", "Reishi"], description: "Pain in the lower abdomen.", prescription: "Gynapharm + Reishi." },
    { name: "Low Libido (Female)", recommendedProducts: ["Golden Six", "Cordy Active"], description: "Reduced sexual desire in women.", prescription: "Golden Six + Cordy Active." },
    { name: "Frigidity Support", recommendedProducts: ["Golden Six", "Cordy Active"], description: "Lack of sexual responsiveness.", prescription: "Golden Six + Cordy Active." },
    { name: "Vaginal Dryness", recommendedProducts: ["Golden Six"], description: "Lack of lubrication.", prescription: "Golden Six (2x daily)." },
    { name: "Hot Flashes", recommendedProducts: ["Golden Six"], description: "Sudden feelings of warmth.", prescription: "Golden Six (2x daily)." },
    { name: "Morning Sickness Support", recommendedProducts: ["Gastrifort"], description: "Nausea during pregnancy support.", prescription: "Consult doctor, Gastrifort for stomach." },
    { name: "Postpartum Recovery", recommendedProducts: ["Reishi", "Golden Six"], description: "Healing after childbirth.", prescription: "Reishi + Golden Six." },
    { name: "Breast Lumps (Non-cancerous)", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Benign growths in breast tissue.", prescription: "Golden Hypha + Reishi." },
    { name: "Mastitis Support", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Infection of breast tissue.", prescription: "Golden Hypha + Reishi." },
    { name: "Low Breast Milk Supply", recommendedProducts: ["Reishi", "Golden Six"], description: "Insufficient lactation.", prescription: "Reishi + Golden Six." },
    { name: "Prostate Cancer Support", recommendedProducts: ["Lycovite", "Golden Hypha", "Reishi"], description: "Supportive care for prostate malignancy.", prescription: "Lycovite + Hypha + Reishi." },
    { name: "Testicular Issues", recommendedProducts: ["Lycovite", "Golden Hypha"], description: "Pain or swelling in testicles.", prescription: "Lycovite + Golden Hypha." },
    { name: "Hydrocele Support", recommendedProducts: ["Golden Hypha", "Golden Six"], description: "Fluid around testicles.", prescription: "Golden Hypha + Golden Six." },
    { name: "Varicocele Support", recommendedProducts: ["Cello Q10", "Golden Hypha"], description: "Enlarged veins in the scrotum.", prescription: "Cello Q10 + Golden Hypha." },
    { name: "Low Energy / Vitality", recommendedProducts: ["Cordy Active", "Vigor Essential"], description: "General lack of pep.", prescription: "Cordy Active." },
    { name: "Quick Exhaustion", recommendedProducts: ["Cordy Active"], description: "Tiring out very fast.", prescription: "Cordy Active (2x daily)." },
    { name: "Muscle Cramps", recommendedProducts: ["Jointeez", "Cordy Active"], description: "Sudden muscle contractions.", prescription: "Jointeez + Cordy Active." },
    { name: "Muscle Weakness", recommendedProducts: ["Cordy Active", "Reishi"], description: "Lack of muscle strength.", prescription: "Cordy Active." },
    { name: "Muscle Wasting Support", recommendedProducts: ["Cordy Active", "Reishi"], description: "Loss of muscle mass.", prescription: "Cordy Active (3x daily)." },
    { name: "Athletic Performance", recommendedProducts: ["Cordy Active"], description: "Need for better stamina/results.", prescription: "Cordy Active before training." },
    { name: "Post-Workout Recovery", recommendedProducts: ["Reishi", "Cordy Active"], description: "Aiding muscle repair.", prescription: "Reishi after workout." },
    { name: "Dehydration Support", recommendedProducts: ["Colon Cleanse"], description: "Aiding fluid absorption.", prescription: "Colon Cleanse Tea + Water." },
    { name: "Heat Stroke Recovery", recommendedProducts: ["Reishi", "Cordy Active"], description: "Recovering from overheating.", prescription: "Reishi (3x daily)." },
    { name: "Fever", recommendedProducts: ["Qinghao", "Reishi"], description: "Elevated body temperature.", prescription: "Qinghao + Reishi." },
    { name: "Chills", recommendedProducts: ["Qinghao", "Reishi"], description: "Feeling cold with shivering.", prescription: "Qinghao + Reishi." },
    { name: "Night Sweats (Men)", recommendedProducts: ["Golden Six"], description: "Sweating at night in men.", prescription: "Golden Six." },
    { name: "Night Sweats (Women)", recommendedProducts: ["Golden Six"], description: "Sweating at night in women.", prescription: "Golden Six." },
    { name: "Cold Sensitivity", recommendedProducts: ["Golden Six", "Cordy Active"], description: "Always feeling cold.", prescription: "Golden Six + Cordy Active." },
    { name: "Heat Sensitivity", recommendedProducts: ["Reishi"], description: "Always feeling too hot.", prescription: "Reishi." },
    { name: "Excessive Thirst", recommendedProducts: ["Diawell", "Golden Six"], description: "Polydipsia.", prescription: "Diawell + Golden Six." },
    { name: "Frequent Hunger", recommendedProducts: ["Diawell", "Magilim"], description: "Polyphagia.", prescription: "Diawell + Magilim." },
    { name: "Sugar Cravings", recommendedProducts: ["Magilim", "Diawell"], description: "Strong urge for sweets.", prescription: "Magilim (3x daily)." },
    { name: "Salt Cravings", recommendedProducts: ["Golden Six"], description: "Strong urge for salty food.", prescription: "Golden Six." },
    { name: "Weight Loss (Unexplained)", recommendedProducts: ["Reishi", "Cordy Active"], description: "Losing weight without trying.", prescription: "Reishi (3x daily)." },
    { name: "Belly Fat", recommendedProducts: ["Magilim", "Colon Cleanse"], description: "Abdominal obesity.", prescription: "Magilim + Colon Cleanse Tea." },
    { name: "Cellulite", recommendedProducts: ["Magilim", "Colon Cleanse"], description: "Dimpled skin on thighs/hips.", prescription: "Magilim." },
    { name: "Water Retention", recommendedProducts: ["Golden Six"], description: "Fluid buildup.", prescription: "Golden Six." },
    { name: "Bloated Face / Eyes", recommendedProducts: ["Golden Six", "Reishi"], description: "Puffiness in the morning.", prescription: "Golden Six." },
    { name: "Swollen Ankles", recommendedProducts: ["Golden Six", "Cello Q10"], description: "Fluid in lower legs.", prescription: "Golden Six + Cello Q10." },
    { name: "Gingivitis", recommendedProducts: ["Reishi"], description: "Gum disease.", prescription: "Reishi (topical application)." },
    { name: "Toothache Support", recommendedProducts: ["Reishi"], description: "Pain in or around teeth.", prescription: "Reishi (3x daily)." },
    { name: "Sensitive Teeth", recommendedProducts: ["Reishi"], description: "Pain from cold/hot.", prescription: "Reishi." },
    { name: "Dry Mouth", recommendedProducts: ["Golden Six"], description: "Xerostomia.", prescription: "Golden Six." },
    { name: "Coated Tongue", recommendedProducts: ["Colon Cleanse", "Gastrifort"], description: "White or yellow film on tongue.", prescription: "Colon Cleanse Tea." },
    { name: "Metallic Taste", recommendedProducts: ["Golden Six", "Colon Cleanse"], description: "Odd taste in mouth.", prescription: "Golden Six." },
    { name: "Loss of Taste", recommendedProducts: ["Reishi", "Cordy Active"], description: "Reduced ability to taste.", prescription: "Reishi." },
    { name: "Loss of Smell", recommendedProducts: ["Reishi", "Cordy Active"], description: "Reduced ability to smell.", prescription: "Reishi." },
    { name: "Nasal Congestion", recommendedProducts: ["Cordy Active", "Reishi"], description: "Blocked nose.", prescription: "Cordy Active." },
    { name: "Runny Nose", recommendedProducts: ["Reishi", "Cordy Active"], description: "Excessive nasal drainage.", prescription: "Reishi." },
    { name: "Sneezing (Chronic)", recommendedProducts: ["Reishi"], description: "Frequent sneezing.", prescription: "Reishi." },
    { name: "Snoring", recommendedProducts: ["Cordy Active"], description: "Noisy breathing during sleep.", prescription: "Cordy Active." },
    { name: "Sleepwalking Support", recommendedProducts: ["Reishi"], description: "Walking during sleep.", prescription: "Reishi to calm brain." },
    { name: "Nightmares (Frequent)", recommendedProducts: ["Reishi"], description: "Bad dreams causing distress.", prescription: "Reishi (2 before bed)." },
    { name: "Restless Leg Syndrome", recommendedProducts: ["Reishi", "Jointeez"], description: "Urge to move legs.", prescription: "Reishi + Jointeez." },
    { name: "Numbness in Limbs", recommendedProducts: ["Cello Q10", "Reishi"], description: "Loss of sensation.", prescription: "Cello Q10." },
    { name: "Tingling Sensation", recommendedProducts: ["Cello Q10", "Reishi"], description: "Pins and needles.", prescription: "Cello Q10." },
    { name: "Tremors", recommendedProducts: ["Reishi", "Cello Q10"], description: "Involuntary shaking.", prescription: "Reishi + Cello Q10." },
    { name: "Muscle Spasms", recommendedProducts: ["Jointeez", "Reishi"], description: "Sudden muscle contractions.", prescription: "Jointeez + Reishi." },
    { name: "Dizziness on Standing", recommendedProducts: ["Cordy Active", "Cello Q10"], description: "Orthostatic hypotension.", prescription: "Cordy Active." },
    { name: "Fainting Spells", recommendedProducts: ["Cello Q10", "Reishi"], description: "Temporary loss of consciousness.", prescription: "Cello Q10." },
    { name: "Brain Fog", recommendedProducts: ["Cordy Active", "Reishi"], description: "Lack of mental clarity.", prescription: "Cordy Active (2x daily)." },
    { name: "Irritability", recommendedProducts: ["Reishi"], description: "Getting annoyed easily.", prescription: "Reishi (2x daily)." },
    { name: "Mood Swings", recommendedProducts: ["Golden Six", "Reishi"], description: "Rapid changes in emotion.", prescription: "Golden Six + Reishi." },
    { name: "Panic Attacks Support", recommendedProducts: ["Reishi"], description: "Sudden episodes of intense fear.", prescription: "Reishi (3x daily)." },
    { name: "OCD Support", recommendedProducts: ["Reishi"], description: "Obsessive thoughts/behaviors.", prescription: "Reishi for calming." },
    { name: "ADHD Support", recommendedProducts: ["Reishi", "Cordy Active"], description: "Attention and focus support.", prescription: "Reishi + Cordy Active." },
    { name: "Autism Support", recommendedProducts: ["Reishi", "Cello Q10"], description: "Complementary support.", prescription: "Reishi + Cello Q10." },
    { name: "Dementia Support", recommendedProducts: ["Cello Q10", "Cordy Active", "Reishi"], description: "Cognitive support for aging.", prescription: "Cello Q10 + Cordy Active." },
    { name: "Alzheimer's Support", recommendedProducts: ["Cello Q10", "Cordy Active", "Reishi"], description: "Supportive cognitive care.", prescription: "Cello Q10 + Cordy Active + Reishi." },
    { name: "Gluten Sensitivity", recommendedProducts: ["Gastrifort", "Colon Cleanse"], description: "Reaction to gluten.", prescription: "Gastrifort + Colon Cleanse Tea." },
    { name: "Lactose Intolerance", recommendedProducts: ["Gastrifort"], description: "Inability to digest milk sugar.", prescription: "Gastrifort before dairy." },
    { name: "Alcohol Hangover", recommendedProducts: ["Reishi", "Gastrifort"], description: "After-effects of alcohol.", prescription: "Reishi (3 capsules) + Gastrifort." },
    { name: "Liver Detox", recommendedProducts: ["Golden Hypha", "Golden Six"], description: "Cleansing the liver.", prescription: "Golden Hypha + Golden Six." },
    { name: "Kidney Detox", recommendedProducts: ["Golden Six", "Colon Cleanse"], description: "Cleansing the kidneys.", prescription: "Golden Six + Colon Cleanse Tea." },
    { name: "Blood Detox", recommendedProducts: ["Reishi", "Colon Cleanse"], description: "Purifying the blood.", prescription: "Reishi + Colon Cleanse Tea." },
    { name: "Heavy Metal Detox", recommendedProducts: ["Golden Hypha", "Colon Cleanse"], description: "Removing toxins.", prescription: "Golden Hypha + Colon Cleanse Tea." },
    { name: "Parasite Infection", recommendedProducts: ["Golden Hypha", "Colon Cleanse"], description: "Intestinal worms or parasites.", prescription: "Golden Hypha + Colon Cleanse Tea." },
    { name: "Amoebiasis", recommendedProducts: ["Golden Hypha", "Gastrifort"], description: "Intestinal infection.", prescription: "Golden Hypha + Gastrifort." },
    { name: "Giardiasis", recommendedProducts: ["Golden Hypha", "Gastrifort"], description: "Intestinal infection.", prescription: "Golden Hypha + Gastrifort." },
    { name: "Food Allergies", recommendedProducts: ["Reishi", "Gastrifort"], description: "Reaction to certain foods.", prescription: "Reishi + Gastrifort." },
    { name: "Nausea (Chronic)", recommendedProducts: ["Gastrifort"], description: "Feeling like vomiting.", prescription: "Gastrifort (2x daily)." },
    { name: "Vomiting Recovery", recommendedProducts: ["Gastrifort", "Reishi"], description: "Settling the stomach.", prescription: "Gastrifort + Reishi." },
    { name: "Dysentery", recommendedProducts: ["Golden Hypha", "Gastrifort"], description: "Infectious diarrhea.", prescription: "Golden Hypha + Gastrifort." },
    { name: "Cholera Support", recommendedProducts: ["Golden Hypha", "Gastrifort"], description: "Severe bacterial infection.", prescription: "Immediate medical care, Hypha for support." },
    { name: "H. Pylori Infection", recommendedProducts: ["Gastrifort", "Golden Hypha", "Reishi"], description: "Bacterial cause of ulcers.", prescription: "Gastrifort (3x daily) + Hypha + Reishi." },
    { name: "Gallbladder Inflammation", recommendedProducts: ["Golden Six", "Reishi"], description: "Cholecystitis.", prescription: "Golden Six + Reishi." },
    { name: "Pancreatitis Support", recommendedProducts: ["Diawell", "Reishi"], description: "Inflammation of the pancreas.", prescription: "Diawell + Reishi." },
    { name: "Splenomegaly Support", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Enlarged spleen.", prescription: "Golden Hypha + Reishi." },
    { name: "Jaundice", recommendedProducts: ["Golden Hypha", "Golden Six"], description: "Yellowing of skin/eyes.", prescription: "Golden Hypha + Golden Six." },
    { name: "Ascites Support", recommendedProducts: ["Golden Six", "Golden Hypha"], description: "Fluid in the abdomen.", prescription: "Golden Six + Golden Hypha." },
    { name: "Hernia Support", recommendedProducts: ["Jointeez", "Golden Six"], description: "Tissue protruding through muscle.", prescription: "Supportive therapy only." },
    { name: "Post-Surgery Recovery", recommendedProducts: ["Reishi", "Golden Hypha", "Cordy Active"], description: "Aiding healing after surgery.", prescription: "Reishi (3x daily) + Cordy Active." },
    { name: "Low Immunity in Children", recommendedProducts: ["Reishi"], description: "Frequent illness in kids.", prescription: "Reishi (1 capsule daily in food)." },
    { name: "Growth Support (Children)", recommendedProducts: ["Cordy Active"], description: "Aiding physical development.", prescription: "Cordy Active (1 capsule daily)." },
    { name: "Poor Concentration (Children)", recommendedProducts: ["Cordy Active", "Reishi"], description: "Difficulty focusing in school.", prescription: "Cordy Active + Reishi." },
    { name: "Bedwetting (Children)", recommendedProducts: ["Golden Six"], description: "Enuresis.", prescription: "Golden Six (1 capsule daily)." },
    { name: "Childhood Asthma", recommendedProducts: ["Cordy Active"], description: "Respiratory issues in kids.", prescription: "Cordy Active (1 capsule daily)." },
    { name: "Chickenpox Recovery", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Healing after virus.", prescription: "Reishi + Golden Hypha." },
    { name: "Measles Recovery", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Healing after virus.", prescription: "Reishi + Golden Hypha." },
    { name: "Mumps Recovery", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Healing after virus.", prescription: "Golden Hypha + Reishi." },
    { name: "Whooping Cough Support", recommendedProducts: ["Cordy Active", "Reishi"], description: "Pertussis support.", prescription: "Cordy Active + Reishi." },
    { name: "Dengue Fever Support", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Viral infection support.", prescription: "Reishi + Golden Hypha." },
    { name: "Zika Virus Support", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Viral infection support.", prescription: "Reishi + Golden Hypha." },
    { name: "Influenza (Flu)", recommendedProducts: ["Reishi", "Cordy Active"], description: "Viral respiratory infection.", prescription: "Reishi (3x daily) + Cordy Active." },
    { name: "Common Cold", recommendedProducts: ["Reishi"], description: "Viral infection of nose/throat.", prescription: "Reishi (3x daily)." },
    { name: "Chronic Pain Syndrome", recommendedProducts: ["Reishi", "Jointeez"], description: "Long-term pain.", prescription: "Reishi + Jointeez." },
    { name: "Fibromyalgia Support", recommendedProducts: ["Reishi", "Jointeez", "Cordy Active"], description: "Widespread muscle pain.", prescription: "Reishi + Jointeez + Cordy Active." },
    { name: "Chronic Fatigue Syndrome", recommendedProducts: ["Cordy Active", "Reishi"], description: "Extreme exhaustion.", prescription: "Cordy Active + Reishi." },
    { name: "Hypoglycemia", recommendedProducts: ["Cordy Active", "Reishi"], description: "Low blood sugar episodes.", prescription: "Cordy Active." },
    { name: "Hyperglycemia", recommendedProducts: ["Diawell", "Golden Six"], description: "High blood sugar.", prescription: "Diawell + Golden Six." },
    { name: "Metabolic Syndrome", recommendedProducts: ["Magilim", "Diawell", "Cello Q10"], description: "Cluster of conditions.", prescription: "Magilim + Diawell + Cello Q10." },
    { name: "Hyperthyroidism Support", recommendedProducts: ["Reishi", "Golden Six"], description: "Overactive thyroid.", prescription: "Reishi + Golden Six." },
    { name: "Adrenal Fatigue", recommendedProducts: ["Golden Six", "Cordy Active"], description: "Overworked adrenal glands.", prescription: "Golden Six + Cordy Active." },
    { name: "Hormonal Imbalance (General)", recommendedProducts: ["Golden Six", "Reishi"], description: "Unbalanced hormones.", prescription: "Golden Six + Reishi." },
    { name: "Post-Menopausal Support", recommendedProducts: ["Golden Six", "Jointeez"], description: "Health after menopause.", prescription: "Golden Six + Jointeez." },
    { name: "Osteoarthritis", recommendedProducts: ["Jointeez"], description: "Wear and tear of joints.", prescription: "Jointeez (2x daily)." },
    { name: "Rheumatoid Arthritis", recommendedProducts: ["Jointeez", "Golden Hypha", "Reishi"], description: "Autoimmune joint disease.", prescription: "Jointeez + Hypha + Reishi." },
    { name: "Bursitis", recommendedProducts: ["Jointeez", "Reishi"], description: "Inflammation of bursa sacs.", prescription: "Jointeez + Reishi." },
    { name: "Tendinitis", recommendedProducts: ["Jointeez", "Reishi"], description: "Inflammation of tendons.", prescription: "Jointeez + Reishi." },
    { name: "Carpal Tunnel Syndrome", recommendedProducts: ["Jointeez", "Cello Q10"], description: "Nerve compression in wrist.", prescription: "Jointeez + Cello Q10." },
    { name: "Plantar Fasciitis", recommendedProducts: ["Jointeez"], description: "Heel pain.", prescription: "Jointeez." },
    { name: "Bone Spurs", recommendedProducts: ["Jointeez", "Golden Six"], description: "Bony projections.", prescription: "Jointeez + Golden Six." },
    { name: "Weak Bones", recommendedProducts: ["Jointeez", "Golden Six"], description: "Low bone density.", prescription: "Jointeez + Golden Six." },
    { name: "Muscle Strain", recommendedProducts: ["Jointeez", "Reishi"], description: "Pulled muscle.", prescription: "Jointeez + Reishi." },
    { name: "Ligament Tear Support", recommendedProducts: ["Jointeez", "Reishi"], description: "Aiding ligament healing.", prescription: "Jointeez + Reishi." },
    { name: "General Inflammation", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Body-wide inflammation.", prescription: "Reishi + Golden Hypha." },
    { name: "Silent Inflammation", recommendedProducts: ["Reishi", "Cello Q10"], description: "Low-grade chronic inflammation.", prescription: "Reishi + Cello Q10." },
    { name: "Autoimmune Support (General)", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Modulating immune response.", prescription: "Golden Hypha + Reishi." },
    { name: "Environmental Sensitivity", recommendedProducts: ["Reishi", "Colon Cleanse"], description: "Reaction to chemicals/pollution.", prescription: "Reishi + Colon Cleanse Tea." },
    { name: "Radiation Recovery", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Healing after radiation therapy.", prescription: "Golden Hypha + Reishi." },
    { name: "Chemotherapy Recovery", recommendedProducts: ["Golden Hypha", "Reishi", "Cordy Active"], description: "Healing after chemo.", prescription: "Golden Hypha + Reishi + Cordy Active." },
    { name: "Heavy Metal Toxicity", recommendedProducts: ["Golden Hypha", "Colon Cleanse"], description: "Toxic metal buildup.", prescription: "Golden Hypha + Colon Cleanse Tea." },
    { name: "Toxic Liver", recommendedProducts: ["Golden Hypha", "Golden Six"], description: "Liver overloaded with toxins.", prescription: "Golden Hypha + Golden Six." },
    { name: "Poor Lymphatic Drainage", recommendedProducts: ["Reishi", "Golden Hypha"], description: "Sluggish lymph system.", prescription: "Reishi + Golden Hypha." },
    { name: "Swollen Lymph Nodes", recommendedProducts: ["Golden Hypha", "Reishi"], description: "Lymphadenopathy.", prescription: "Golden Hypha + Reishi." },
    { name: "Spleen Issues", recommendedProducts: ["Golden Hypha", "Reishi"], description: "General spleen support.", prescription: "Golden Hypha + Reishi." },
    { name: "General Vitality", recommendedProducts: ["Cordy Active", "Reishi"], description: "Overall health and life force.", prescription: "Cordy Active + Reishi daily." }
];

// Attach to window for global access without needing ES modules
window.products = products;
window.healthConditions = healthConditions;

const HEALTH_DB = {
    metabolic: { title: "Metabolic & Glucose Recovery", guide: "Metabolic restoration requires consistent glycemic buffering. Avoid heavy carbohydrates after 6pm and ensure high hydration." },
    cardio: { title: "Cardiovascular & Circulatory System", guide: "Cardiovascular health is tied to blood viscosity. The protocol focuses on widening coronary arteries and stabilizing rhythm." },
    immune: { title: "Immune System & Cellular Shield", guide: "Immune modulation requires high-polysaccharide extracts. Trigger macrophage activity for robust defense." },
    repro: { title: "Reproductive & Hormonal Health", guide: "Hormonal balance is restored by purifying the tract and warming the kidneys. 60-90 day cycles recommended." },
    digestive: { title: "Digestive & Gastrointestinal Balance", guide: "Digestive recovery starts with the stomach mucosa. Provide a herbal shield for gastric repair." },
    musculo: { title: "Musculoskeletal & Joint Support", guide: "Joint health requires synovial fluid regeneration. Focus on anti-inflammatory relief and mineral support." },
    neurological: { title: "Nervous & Brain Function", guide: "Brain health is sustained by cerebral oxygenation. Improve synaptic connectivity and calm the nervous system." },
    respiratory: { title: "Respiratory & Lung Health", guide: "Focus on lung capacity and oxygen absorption. Clear bronchial pathways of toxins and inflammation." },
    renal: { title: "Renal & Kidney Function", guide: "Kidney health is restored by tonifying vital energy.Premier protocol for urinary and back strength." },
    dermal: { title: "Dermal & Skin Recovery", guide: "Skin health reflects internal purity. Purify the blood and treat externally with medicated extracts." },
    vision: { title: "Vision & Ocular Health", guide: "Ocular health requires specific carotenoids and blue light protection. Improve micro-circulation to the retina." },
    fitness: { title: "Physical Fitness & Stamina", guide: "Optimize physical endurance through cellular energy (ATP) production and rapid muscle recovery." },
    liver: { title: "Liver & Detoxification Protocol", guide: "Liver recovery focuses on enzyme production and toxin filtering. Essential for metabolic and skin health." },
    fertility: { title: "Fertility & Reproductive Vitality", guide: "Holistic reproductive support for both male and female vitality. Focuses on hormonal balance and internal tract purification." },
    cold: { title: "Cold, Flu & Respiratory Recovery", guide: "Recovery requires warming the lungs and clearing viral toxins. Focus on high-polysaccharide immune support and rest." },
    headache: { title: "Neurological & Migraine Relief", guide: "Headache patterns often relate to cerebral oxygenation. Stabilize neural firing and manage stress triggers." },
    muscle: { title: "Muscle Recovery & Vitality", guide: "Restoring muscle strength requires mineral rebalancing and anti-inflammatory relief. Focus on ATP production." },
    appetite: { title: "Digestive & Appetite Restoration", guide: "Restore gut flora and stomach mucosa. Proper enzyme production is key to regaining a healthy appetite." },
    dental: { title: "Oral & Dental Integrity", guide: "Oral health reflects internal alkalinity. Neutralize bacteria and support gum tissue regeneration." },
    thyroid: { title: "Endocrine & Thyroid Balance", guide: "Thyroid function depends on hormonal stabilization and vital energy tonification. Avoid processed salts." },
    emotional: { title: "Emotional & Anxiety Management", guide: "Calming the nervous system is priority. Focus on neurotransmitter support and adaptogenic herbs." },
    infection: { title: "Anti-Viral & Infection Shield", guide: "A broad-spectrum immune response is needed. Purify the blood and trigger natural T-cell activity." },
    sugar: { title: "Metabolic & Sugar Craving Control", guide: "Sugar cravings indicate glycemic instability. Buffer blood sugar levels and improve insulin sensitivity." },
    women: { title: "Women's Wellness & Hormonal Flow", guide: "Support the reproductive system through regular purification and hormonal modulation." },
    sleep: { title: "Sleep Architecture & Insomnia Relief", guide: "Restore the circadian rhythm by calming the brain and relaxing skeletal muscles before rest." },
    anemia: { title: "Blood Health & Hematopoietic Support", guide: "Stimulate blood production and improve iron absorption. Essential for energy and oxygen transport." },
    prostate: { title: "Prostate & Urinary Health (Men)", guide: "Focus on reducing inflammation and improving urine flow. Vital for long-term male vitality." },
    bone: { title: "Bone Density & Skeletal Strength", guide: "Skeletal health requires calcium-mineral synergy and collagen support. Essential for mobility." },
    hormonal: { title: "Hormonal Balance & Endocrine Flow", guide: "Stabilize the entire endocrine system. Focus on adaptogens that modulate hormonal output naturally." },
    sanitary: { title: "Menstrual Hygiene & Protective Care", guide: "Superior hygiene requires breathable, high-absorption materials. Herbal infusion helps neutralize bacteria and odor." },
    gumcare: { title: "Oral Hygiene & Gum Tissue Repair", guide: "Gingival health depends on bacterial control and tissue tonification. Avoid abrasive chemical toothpastes." }
};

const SYMPTOM_DB = {
    "ulcer": "gastrifort", "gastritis": "gastrifort", "reflux": "gastrifort", "constipation": "constilease", "pile": "constilease", "sugar": "diawell", "diabet": "diawell", "weight": "magilim", "cholesterol": "magilim", "pressure": "reishi", "bp": "reishi", "vision": "eye-beta", "eyes": "eye-beta", "period": "sanitary-pad", "menses": "sanitary-pad", "pad": "sanitary-pad", "gum": "gum-care", "teeth": "gum-care", "breath": "gum-care", "pid": "gynapharm", "infection": "reishi", "immune": "golden-hypha", "fibroid": "golden-hypha", "prostate": "lycovite", "stamina": "revive", "erection": "revive", "energy": "cordy-active", "fatigue": "cordy-active", "asthma": "cordy-active", "arthritis": "jointeez", "joint": "jointeez", "heart": "ultramega", "bone": "calmazine", "blood": "haemocare", "anemia": "haemocare", "skin": "grapemin-e", "acne": "kedi-soaps", "liver": "lirich", "jaundice": "lirich", "malaria": "qinghao", "fever": "qinghao", "headache": "memorease", "memory": "cordy-royal-jelly", "brain": "cordy-royal-jelly", "sperm": "vigor-essential", "relaxation": "vip-massage-chair", "detox": "detox-patch"
};

const DOSAGE_GUIDE = {
    "reishi": "3 capsules twice daily.", "gastrifort": "3 capsules twice daily after meals.", "diawell": "3 capsules twice daily before meals.", "magilim": "3 capsules three times daily.", "gynapharm": "4 capsules three times daily.", "golden-hypha": "4 capsules twice daily.", "lycovite": "2 capsules twice daily.", "jointeez": "4 capsules twice daily.", "constilease": "2 capsules twice daily.", "revive": "1 capsule daily.", "cordy-active": "4 capsules twice daily.", "ultramega": "1 softgel daily.", "calmazine": "1 tablet daily.", "haemocare": "2 capsules twice daily.", "memorease": "2 capsules twice daily.", "cordy-royal-jelly": "3 capsules twice daily.", "vigor-essential": "2 capsules twice daily.", "golden-six": "1 pill twice daily.", "refresh-tea": "1 tea bag daily.", "colon-tea-cleanser": "1 tea bag at night.", "lirich": "2 capsules twice daily.", "sanitary-pad": "Use daily during menstrual cycle for 24-hour protection.", "gum-care": "Use twice daily (morning and night) as part of oral routine."
};

const CORE_PROTOCOLS = {
    metabolic: ["diawell", "lirich", "magilim", "reishi"],
    cardio: ["reishi", "cadibetter", "ultramega", "cordy-active"],
    immune: ["golden-hypha", "reishi", "cordy-active", "v-ca"],
    repro: ["gynapharm", "golden-hypha", "eve-comfort", "reishi"],
    digestive: ["gastrifort", "constilease", "colon-tea-cleanser", "reishi"],
    musculo: ["jointeez", "calmazine", "reishi", "ultramega"],
    neurological: ["memorease", "cordy-royal-jelly", "reishi", "ginseng-coffee"],
    respiratory: ["cordy-active", "refresh-tea", "reishi", "v-ca"],
    renal: ["golden-six", "lycovite", "reishi", "cordy-active"],
    liver: ["lirich", "reishi", "colon-tea-cleanser", "refresh-tea"],
    fertility: ["vigor-essential", "revive", "reishi", "cordy-royal-jelly"],
    weight: ["magilim", "diawell", "reishi", "colon-tea-cleanser"],
    ulcer: ["gastrifort", "reishi", "colon-tea-cleanser", "v-ca"],
    ed: ["revive", "vigor-essential", "reishi", "cordy-royal-jelly"],
    stress: ["memorease", "reishi", "cordy-royal-jelly", "ginseng-coffee"],
    dermal: ["kedi-soaps", "grapemin-e", "reishi", "v-ca"],
    cold: ["cordy-active", "reishi", "v-ca", "refresh-tea"],
    headache: ["memorease", "reishi", "cordy-royal-jelly", "ginseng-coffee"],
    muscle: ["jointeez", "calmazine", "reishi", "ultramega"],
    appetite: ["gastrifort", "lirich", "reishi", "colon-tea-cleanser"],
    dental: ["gumcare", "reishi", "v-ca", "ultramega"],
    thyroid: ["golden-six", "reishi", "cordy-active", "lycovite"],
    fitness: ["cordy-active", "revive", "reishi", "v-ca"],
    emotional: ["memorease", "reishi", "cordy-royal-jelly", "ginseng-coffee"],
    infection: ["golden-hypha", "reishi", "cordy-active", "v-ca"],
    sugar: ["diawell", "magilim", "lirich", "reishi"],
    women: ["gynapharm", "golden-six", "eve-comfort", "reishi"],
    sleep: ["calmazine", "reishi", "cordy-royal-jelly", "refresh-tea"],
    anemia: ["haemocare", "reishi", "v-ca", "cordy-active"],
    prostate: ["lycovite", "reishi", "vigor-essential", "cordy-active"],
    bone: ["calmazine", "jointeez", "reishi", "ultramega"],
    hormonal: ["eve-comfort", "golden-six", "reishi", "gynapharm"],
    sanitary: ["sanitary-pad", "gynapharm", "golden-six", "reishi"],
    gumcare: ["gum-care", "reishi", "v-ca", "ultramega"]
};

// Export to window
window.HEALTH_DB = HEALTH_DB;
window.SYMPTOM_DB = SYMPTOM_DB;
window.DOSAGE_GUIDE = DOSAGE_GUIDE;
window.CORE_PROTOCOLS = CORE_PROTOCOLS;

const QUIZ_DATA = {
    cold: {
        intro: "Doctor: Let’s check if your symptoms may be related to a cold or flu.",
        questions: [
            { q: "Do you have a runny or blocked nose?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have a sore throat?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have a fever?", o: ["No", "Slight", "Yes", "High"], type: "chips" },
            { q: "Do you feel body aches?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you feel tired or weak?", o: ["No", "Slight", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have a cough?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have your symptoms lasted more than 3 days?", o: ["No", "Not sure", "Yes", "More than a week"], type: "chips" },
            { q: "Have you been exposed to cold weather or sick people?", o: ["No", "Not sure", "Yes", "Frequently"], type: "chips" },
            { q: "Are you willing to rest and recover properly?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    headache: {
        intro: "Doctor: I’d like to understand your headache patterns.",
        questions: [
            { q: "How often do you experience headaches?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Is the pain severe or throbbing?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you feel sensitivity to light or sound?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel nausea during headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel stress before headaches occur?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you skip meals often?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you spend long hours on screens?", o: ["No", "Sometimes", "Often", "Daily"], type: "chips" },
            { q: "Do you sleep poorly?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you use painkillers frequently?", o: ["No", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Are you willing to manage triggers and lifestyle?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    muscle: {
        intro: "Doctor: Let’s assess your muscle strength and body condition.",
        questions: [
            { q: "Do you experience muscle pain?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel weak during daily activities?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you stretch before physical activity?", o: ["Always", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you feel pain after minor activity?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume enough protein?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you stay hydrated?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you feel stiffness in your body?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you get enough rest?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your physical health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    appetite: {
        intro: "Doctor: Let’s understand your eating habits and appetite.",
        questions: [
            { q: "Do you experience loss of appetite?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you overeat frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you skip meals?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel guilty after eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you eat due to stress or emotions?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a regular eating schedule?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you crave unhealthy foods?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel tired after eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have you experienced sudden weight changes?", o: ["No", "Slight", "Yes", "Significant"], type: "chips" },
            { q: "Are you willing to improve your eating habits?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    dental: {
        intro: "Doctor: Let me assess your oral and dental health.",
        questions: [
            { q: "Do you experience tooth pain?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do your gums bleed when brushing?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have bad breath frequently?", o: ["No", "Occasionally", "Often", "Always"], type: "chips" },
            { q: "How often do you brush your teeth?", o: ["Twice daily", "Once daily", "Occasionally", "Rarely"], type: "chips" },
            { q: "Do you consume sugary foods or drinks often?", o: ["No", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Do you visit a dentist regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience sensitivity to hot or cold foods?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you smoke?", o: ["No", "Occasionally", "Frequently", "Daily"], type: "chips" },
            { q: "Do you notice swelling or redness in your gums?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Are you willing to improve your oral hygiene?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    thyroid: {
        intro: "Doctor: I’d like to evaluate your thyroid function.",
        questions: [
            { q: "Do you experience unexplained weight changes?", o: ["No", "Slight", "Yes", "Significant"], type: "chips" },
            { q: "Do you feel tired most of the time?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you feel unusually cold or hot?", o: ["No", "Slight", "Yes", "Extreme"], type: "chips" },
            { q: "Do you experience hair thinning or loss?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have mood changes?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have difficulty sleeping?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have swelling in the neck area?", o: ["No", "Slight", "Yes", "Noticeable"], type: "chips" },
            { q: "Do you feel your heart rate is irregular?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a healthy diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to check your thyroid health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    fitness: {
        intro: "Doctor: Let’s assess your physical activity level.",
        questions: [
            { q: "How often do you exercise?", o: ["Daily", "Few times a week", "Rarely", "Never"], type: "chips" },
            { q: "Do you sit for long hours daily?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you feel tired after light activity?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you engage in strength or cardio exercises?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you stretch or warm up before activity?", o: ["Always", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience muscle pain frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a healthy weight?", o: ["Yes", "Slightly off", "No", "Significantly off"], type: "chips" },
            { q: "Do you stay hydrated during the day?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have a fitness goal?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" },
            { q: "Are you willing to improve your fitness level?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    emotional: {
        intro: "Doctor: Let’s understand your emotional and anxiety levels.",
        questions: [
            { q: "Do you feel nervous or anxious often?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you overthink situations?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience rapid heartbeat without activity?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have difficulty relaxing?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel restless or on edge?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have trouble sleeping due to worry?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you avoid situations due to fear?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel overwhelmed easily?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you engage in relaxation activities?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your mental well-being?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    infection: {
        intro: "Doctor: I’d like to check if your body may be fighting an infection.",
        questions: [
            { q: "Do you have a fever?", o: ["No", "Slight", "Yes", "High fever"], type: "chips" },
            { q: "Do you feel body aches or weakness?", o: ["No", "Slight", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have a sore throat or cough?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience chills or sweating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel tired without doing much?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have you been exposed to someone sick recently?", o: ["No", "Not sure", "Yes", "Multiple exposures"], type: "chips" },
            { q: "Do you have loss of appetite?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have digestive issues along with these symptoms?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Are you willing to rest and support your recovery?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    renal: {
        intro: "Doctor: Let’s evaluate how well your kidneys may be functioning.",
        questions: [
            { q: "Do you experience swelling in your legs or face?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you urinate more or less than usual?", o: ["Normal", "Slight change", "Noticeable change", "Extreme change"], type: "chips" },
            { q: "Do you feel persistent fatigue?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience lower back pain?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you drink enough water daily?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have high blood pressure?", o: ["No", "Not sure", "Yes", "Severe"], type: "chips" },
            { q: "Do you notice foamy or dark urine?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you take medications frequently?", o: ["No", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do you have a history of kidney issues?", o: ["No", "Not sure", "Yes", "Chronic"], type: "chips" },
            { q: "Are you willing to protect your kidney health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    sugar: {
        intro: "Doctor: Let’s understand your sugar cravings and metabolism.",
        questions: [
            { q: "Do you crave sugary foods often?", o: ["Never", "Occasionally", "Frequently", "Very often"], type: "chips" },
            { q: "Do you feel energy crashes during the day?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you eat sweets daily?", o: ["No", "Occasionally", "Often", "Multiple times daily"], type: "chips" },
            { q: "Do you feel hungry shortly after eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you skip meals?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you gain weight easily?", o: ["No", "Slightly", "Yes", "Very easily"], type: "chips" },
            { q: "Do you feel tired after eating sugar?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you drink sugary beverages?", o: ["Never", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Are you willing to reduce sugar intake?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    women: {
        intro: "Doctor: I’d like to assess your general reproductive and hormonal health.",
        questions: [
            { q: "Are your menstrual cycles regular?", o: ["Yes", "Slightly irregular", "Irregular", "Very irregular"], type: "chips" },
            { q: "Do you experience severe cramps?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you experience unusual discharge or discomfort?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel fatigued during your cycle?", o: ["No", "Slight", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have mood swings related to your cycle?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience hormonal acne?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a history of reproductive issues?", o: ["No", "Not sure", "Yes", "Multiple issues"], type: "chips" },
            { q: "Are you willing to improve your health naturally?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    sleep: {
        intro: "Doctor: I’d like to understand your sleep pattern and quality.",
        questions: [
            { q: "How many hours do you sleep daily?", o: ["7–9 hours", "5–6 hours", "3–4 hours", "Less than 3 hours"], type: "chips" },
            { q: "Do you have difficulty falling asleep?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you wake up frequently at night?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel refreshed after sleeping?", o: ["Always", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you use your phone or screen before bed?", o: ["Never", "Occasionally", "Often", "Always"], type: "chips" },
            { q: "Do you consume caffeine late in the day?", o: ["Never", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Do you feel tired during the day?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a consistent sleep schedule?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you snore heavily or have breathing issues during sleep?", o: ["No", "Not sure", "Yes", "Often"], type: "chips" },
            { q: "Are you willing to improve your sleep habits?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    anemia: {
        intro: "Doctor: Let’s check for signs related to low blood levels.",
        questions: [
            { q: "Do you feel weak or fatigued often?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience dizziness?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you look pale (skin, lips, nails)?", o: ["No", "Slightly", "Yes", "Very pale"], type: "chips" },
            { q: "Do you experience shortness of breath?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume iron-rich foods?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have frequent headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have cold hands or feet?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have you experienced heavy blood loss (if applicable)?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you feel your heart racing sometimes?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Are you willing to improve your nutrition?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    prostate: {
        intro: "Doctor: Let’s assess your prostate health.",
        questions: [
            { q: "Do you urinate frequently, especially at night?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have difficulty starting urination?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel incomplete bladder emptying?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience weak urine flow?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you feel discomfort in the pelvic area?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a family history of prostate issues?", o: ["No", "Not sure", "Yes", "Multiple cases"], type: "chips" },
            { q: "Do you consume a healthy diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you above 40 years?", o: ["No", "Close", "Yes", "Over 60"], type: "chips" },
            { q: "Are you willing to monitor your prostate health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    liver: {
        intro: "Doctor: Let’s evaluate your liver function and lifestyle.",
        questions: [
            { q: "Do you feel tired frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume alcohol?", o: ["No", "Occasionally", "Frequently", "Daily"], type: "chips" },
            { q: "Do you experience abdominal discomfort?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have yellowing of eyes or skin?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you eat fatty or processed foods often?", o: ["No", "Sometimes", "Often", "Daily"], type: "chips" },
            { q: "Do you take medications frequently?", o: ["No", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do you feel nausea?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your liver health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    digestive: {
        intro: "Doctor: Let’s assess your digestive system and gut health.",
        questions: [
            { q: "Do you experience frequent bloating?", o: ["Never", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do you have constipation or irregular bowel movements?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel discomfort after eating?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume processed or junk food regularly?", o: ["No", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Do you drink enough water daily?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience acid reflux or heartburn?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you eat late at night?", o: ["Never", "Occasionally", "Often", "Always"], type: "chips" },
            { q: "Do you feel full quickly when eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you include fiber in your diet (fruits, vegetables)?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your digestive health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    bone: {
        intro: "Doctor: I’d like to evaluate your bone strength and risk factors.",
        questions: [
            { q: "Do you experience bone or back pain?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume calcium-rich foods?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you get enough sunlight (Vitamin D)?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Have you had fractures before?", o: ["No", "Minor", "Yes", "Multiple"], type: "chips" },
            { q: "Do you consume alcohol or smoke?", o: ["No", "Occasionally", "Frequently", "Daily"], type: "chips" },
            { q: "Do you feel weak or fatigued often?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have a family history of bone issues?", o: ["No", "Not sure", "Yes", "Multiple cases"], type: "chips" },
            { q: "Are you willing to improve your bone health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    vision: {
        intro: "Doctor: Let’s check your vision and eye health.",
        questions: [
            { q: "Do you experience blurred vision?", o: ["Never", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do your eyes feel dry or irritated?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you spend long hours on screens?", o: ["No", "Sometimes", "Often", "Daily"], type: "chips" },
            { q: "Do you experience headaches after screen use?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have difficulty seeing at night?", o: ["No", "Slightly", "Yes", "Severe difficulty"], type: "chips" },
            { q: "Do you wear protective eyewear in sunlight?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you eat foods rich in vitamins (like carrots, greens)?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you rub your eyes frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a family history of eye problems?", o: ["No", "Not sure", "Yes", "Multiple cases"], type: "chips" },
            { q: "Are you willing to improve your eye care habits?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    hormonal: {
        intro: "Doctor: Let’s evaluate your hormonal balance.",
        questions: [
            { q: "Do you experience unexplained weight changes?", o: ["No", "Slightly", "Yes", "Significant"], type: "chips" },
            { q: "Do you feel fatigued most of the time?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you have mood swings?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have sleep problems?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you experience skin issues (acne, dryness)?", o: ["No", "Slightly", "Yes", "Severe"], type: "chips" },
            { q: "Do you feel stressed frequently?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have irregular body patterns (cycle, energy)?", o: ["No", "Slightly", "Yes", "Very irregular"], type: "chips" },
            { q: "Are you willing to improve your hormonal health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    }
};

window.QUIZ_DATA = QUIZ_DATA;
