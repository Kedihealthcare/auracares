/**
 * Aura Herbs Global Product Intelligence
 * Centralized Clinical Protocol Database - Updated Effective July 5, 2025
 */

const KEDI_PRODUCTS = [
    { id: 'p1', name: 'Reishi (Big/90c)', category: 'Immunity & Defence', price: 37800, member: 31500, img: 'assets/img/product/Reishi.png', desc: 'Premium Ganoderma Lucidum extract for advanced immune modulation.', rating: 4.9 },
    { id: 'p1s', name: 'Reishi (Small/30c)', category: 'Immunity & Defence', price: 15000, member: 12500, img: 'assets/img/product/Reishi.png', desc: 'Compact Ganoderma Lucidum protocol for immune baseline maintenance.', rating: 4.7 },
    { id: 'p2', name: 'Golden Six (Big/60c)', category: 'Organ Support', price: 16800, member: 14000, img: 'assets/img/product/Golden six.png', desc: 'Essential protocol for kidney health and hormonal baseline recovery.', rating: 4.8 },
    { id: 'p2s', name: 'Golden Six (Small/30c)', category: 'Organ Support', price: 10680, member: 8900, img: 'assets/img/product/Golden six.png', desc: 'Hormonal and kidney support in a compact dosage.', rating: 4.6 },
    { id: 'p3', name: 'Diawell (Big/90c)', category: 'Metabolic & Weight', price: 18000, member: 15000, img: 'assets/img/product/Diawell.png', desc: 'Advanced metabolic support for blood sugar optimization.', rating: 4.7 },
    { id: 'p3s', name: 'Diawell (Small/30c)', category: 'Metabolic & Weight', price: 10680, member: 8900, img: 'assets/img/product/Diawell.png', desc: 'Blood sugar management protocol in a travel-ready pack.', rating: 4.5 },
    { id: 'p4', name: 'Constilease (Big/60c)', category: 'Detox & Digestive', price: 28000, member: 24000, img: 'assets/img/product/CONSTILEASE.png', desc: 'Fast-acting digestive aid and toxin elimination protocol.', rating: 4.8 },
    { id: 'p4s', name: 'Constilease (Small/30c)', category: 'Detox & Digestive', price: 15000, member: 12500, img: 'assets/img/product/CONSTILEASE.png', desc: 'Digestive regularity support in a compact clinical dosage.', rating: 4.6 },
    { id: 'p5', name: 'Haemocare (Bottle)', category: 'Cardiovascular', price: 24000, member: 20000, img: 'assets/img/product/refresh-tea.png', desc: 'Blood enrichment and oxygen transport optimization.', rating: 4.6 },
    { id: 'p6', name: 'Magilim (Big/90c)', category: 'Metabolic & Weight', price: 31200, member: 26000, img: 'assets/img/product/Magilim.png', desc: 'Cellular weight management and metabolic reset.', rating: 4.9 },
    { id: 'p6s', name: 'Magilim (Small/30c)', category: 'Metabolic & Weight', price: 15000, member: 12500, img: 'assets/img/product/Magilim.png', desc: 'Metabolic optimization in a convenient 30-day format.', rating: 4.7 },
    { id: 'p7', name: 'Colon Tea', category: 'Detox & Digestive', price: 19200, member: 16000, img: 'assets/img/product/tooth-paste.jpg', desc: 'Gentle detoxification and gastrointestinal optimization.', rating: 4.7 },
    { id: 'p8', name: 'Vigor Essential (Big/60c)', category: 'Vitality & Vigour', price: 25000, member: 21000, img: 'assets/img/product/Vigor essential (1).jpg', desc: 'Ultimate male vitality and vigour enhancement.', rating: 4.9 },
    { id: 'p8s', name: 'Vigor Essential (Small/30c)', category: 'Vitality & Vigour', price: 15000, member: 12500, img: 'assets/img/product/Vigor essential (1).jpg', desc: 'Male energy support in a convenient daily format.', rating: 4.7 },
    { id: 'p9', name: 'Cardibetter Tablet', category: 'Cardiovascular', price: 34200, member: 28500, img: 'assets/img/product/Cardibetter.png', desc: 'Advanced circulatory optimization and oxidative stress reduction.', rating: 5.0 },
    { id: 'p10', name: 'V-CA (Bottle)', category: 'Bone & Joint', price: 12600, member: 10500, img: 'assets/img/product/img_10.png', desc: 'High-absorption calcium for bone density and joint health.', rating: 4.6 },
    { id: 'p11', name: '7-Layer Sanitary Pad (Night)', category: "Women's Health", price: 3240, member: 2700, img: 'assets/img/product/img_01.png', desc: 'Anion-infused clinical protection for women.', rating: 4.8 },
    { id: 'p12', name: 'Blood Circulatory Instrument', category: 'Medical Devices', price: 624000, member: 520000, img: 'assets/img/product/Blood-circulatory-machine.png', desc: 'Medical-grade bio-resonance circulatory stimulator.', rating: 4.9 },
    { id: 'p13', name: 'VIP Massage Chair', category: 'Medical Devices', price: 6500000, member: 5500000, img: 'assets/img/product/vip-massage_chair.jpg', desc: 'Full-body medical-grade clinical recovery system for homes, gyms, and offices.', rating: 5.0, featured: true },
    { id: 'p14', name: 'Calmazine (60s)', category: 'Bone & Joint', price: 24000, member: 20000, img: 'assets/img/product/CALMAZINE.png', desc: 'Calcium-Magnesium-Zinc clinical synergy.', rating: 4.7 },
    { id: 'p15', name: 'Cello Q10 (60s)', category: 'Cardiovascular', price: 36000, member: 30000, img: 'assets/img/product/img_05.png', desc: 'Coenzyme Q10 for heart muscle vitality.', rating: 4.8 },
    { id: 'p16', name: 'KEDI Ginseng Coffee (20s)', category: 'Vitality & Vigour', price: 30000, member: 25000, img: 'assets/img/product/kedi.jpg', desc: 'Premium therapeutic coffee for alertness and energy.', rating: 4.5 },
    { id: 'p17', name: 'Cordy Active (Big/60c)', category: 'Vitality & Vigour', price: 25000, member: 21000, img: 'assets/img/product/Cordy Active.png', desc: 'Cordyceps-based energy and respiratory support.', rating: 4.7 },
    { id: 'p17s', name: 'Cordy Active (Small/30c)', category: 'Vitality & Vigour', price: 15000, member: 12500, img: 'assets/img/product/Cordy Active.png', desc: 'Endurance and lung health in a compact clinical dose.', rating: 4.6 },
    { id: 'p18', name: 'Cordy Royal Jelly (Big/90c)', category: 'Immunity & Defence', price: 37800, member: 31500, img: 'assets/img/product/img_18.png', desc: 'Premium immune booster and longevity elixir.', rating: 4.9 },
    { id: 'p18s', name: 'Cordy Royal Jelly (Small/30c)', category: 'Immunity & Defence', price: 14400, member: 12000, img: 'assets/img/product/img_18.png', desc: 'Elite immunity and vitality support in a 30-day pack.', rating: 4.8 },
    { id: 'p19', name: "Eve's comfort Capsule", category: "Women's Health", price: 29880, member: 24900, img: 'assets/img/product/img_19.png', desc: 'Hormonal balance and cycle comfort protocol.', rating: 4.6 },
    { id: 'p20', name: 'Eye Beta (Big/30c)', category: 'Organ Support', price: 27600, member: 23000, img: 'assets/img/product/img_20.png', desc: 'Visual acuity and retinal protection formula.', rating: 4.8 },
    { id: 'p20s', name: 'Eye Beta (Small/10c)', category: 'Organ Support', price: 10680, member: 8900, img: 'assets/img/product/img_20.png', desc: 'Visual acuity support in a travel-ready clinical pack.', rating: 4.6 },
    { id: 'p21', name: 'Grapemin-E (60s)', category: 'Skin & Beauty', price: 33600, member: 28000, img: 'assets/img/product/img_21.png', desc: 'Powerful antioxidant for skin radiance and elasticity.', rating: 4.7 },
    { id: 'p22', name: 'Gynapharm Capsule', category: "Women's Health", price: 39600, member: 33000, img: 'assets/img/product/img_22.png', desc: 'Infection defense and reproductive health optimization.', rating: 4.8 },
    { id: 'p23', name: 'Gastrifort (Big/90c)', category: 'Detox & Digestive', price: 44400, member: 37000, img: 'assets/img/product/Gastrifort.png', desc: 'Gastric mucosal protection and ulcer relief protocol.', rating: 4.9 },
    { id: 'p23s', name: 'Gastrifort (Small/30c)', category: 'Detox & Digestive', price: 15000, member: 12500, img: 'assets/img/product/Gastrifort.png', desc: 'Gastrointestinal comfort and mucosal defense in a compact size.', rating: 4.7 },
    { id: 'p24', name: 'Golden Hypha (Big/90c)', category: 'Immunity & Defence', price: 51000, member: 42500, img: 'assets/img/product/Golden-Hypha.png', desc: 'Advanced fungal polysaccharide for tumor defense.', rating: 5.0 },
    { id: 'p24s', name: 'Golden Hypha (Small/30c)', category: 'Immunity & Defence', price: 20400, member: 17000, img: 'assets/img/product/Golden-Hypha.png', desc: 'Intensive immune modulation in a smaller format.', rating: 4.9 },
    { id: 'p25', name: 'Green Coffee with Ganoderma', category: 'Metabolic & Weight', price: 11500, member: 8500, img: 'assets/img/product/img_25.png', desc: 'Metabolic booster with Ganoderma lucidium.', rating: 4.4 },
    { id: 'p26', name: 'Hydrogen Water Cup', category: 'Medical Devices', price: 102000, member: 85000, img: 'assets/img/product/img_26.png', desc: 'Hydrogen-rich water generator for cellular health.', rating: 4.8 },
    { id: 'p27', name: 'Lirich Capsule', category: 'Organ Support', price: 22200, member: 18500, img: 'assets/img/product/LIRICH.png', desc: 'Liver detoxification and regenerative support.', rating: 4.7 },
    { id: 'p28', name: 'Lycovite (60s)', category: 'Vitality & Vigour', price: 26400, member: 22000, img: 'assets/img/product/LYCOVITE.jpg', desc: 'Prostate health and antioxidant protection.', rating: 4.8 },
    { id: 'p29', name: 'Memory 24/7 (Big/60c)', category: 'Organ Support', price: 33600, member: 28000, img: 'assets/img/product/MEMORY-247.png', desc: 'Cognitive enhancement and memory optimization.', rating: 4.9 },
    { id: 'p29s', name: 'Memory 24/7 (Small/30c)', category: 'Organ Support', price: 15000, member: 12500, img: 'assets/img/product/MEMORY-247.png', desc: 'Brain functionality support in a portable clinical dose.', rating: 4.7 },
    { id: 'p30', name: 'M & V Women (60s)', category: 'Vitality & Vigour', price: 31200, member: 26000, img: 'assets/img/product/MV-WOMEN.png', desc: 'Multi-vitamin optimized for female clinical needs.', rating: 4.6 },
    { id: 'p31', name: 'Multivitamin + Zinc', category: 'Immunity & Defence', price: 13200, member: 11000, img: 'assets/img/product/Multi-vitamin.jpg', desc: 'Broad-spectrum essential micronutrient protocol.', rating: 4.5 },
    { id: 'p32', name: 'Prosclick Prostate', category: 'Vitality & Vigour', price: 35500, member: 28500, img: 'assets/img/product/Prosclick prostate.jpg', desc: 'Premium prostate health maintenance formula.', rating: 4.8 },
    { id: 'p33', name: 'Qinghao (Bottle)', category: 'Immunity & Defence', price: 10680, member: 8900, img: 'assets/img/product/Qinghao-pack.jpg', desc: 'Anti-malarial and general fever defense protocol.', rating: 4.7 },
    { id: 'p34', name: 'Re-vive (Big/30c)', category: 'Vitality & Vigour', price: 48600, member: 40500, img: 'assets/img/product/Revive.png', desc: 'Premier libido and stamina recovery protocol.', rating: 4.9 },
    { id: 'p34s', name: 'Re-vive (Small/10c)', category: 'Vitality & Vigour', price: 17400, member: 14500, img: 'assets/img/product/Revive.png', desc: 'Fast-acting male performance support packet.', rating: 4.8 },
    { id: 'p35', name: 'Salud Herbal', category: 'Detox & Digestive', price: 19500, member: 14500, img: 'assets/img/product/Salud herbal.jpg', desc: 'Systemic detoxification and heavy metal removal.', rating: 4.7 },
    { id: 'p36', name: 'Ultramega (60s)', category: 'Cardiovascular', price: 21600, member: 18000, img: 'assets/img/product/ULTRAMEGA.jpg', desc: 'Omega-3 fatty acid clinical baseline support.', rating: 4.8 },
    { id: 'p37', name: 'Vitagent (60s)', category: 'Vitality & Vigour', price: 31200, member: 26000, img: 'assets/img/product/VITAGENT.png', desc: 'Comprehensive male health multivitamin.', rating: 4.6 },
    { id: 'p38', name: 'Vitaprego (60s)', category: 'Vitality & Vigour', price: 30000, member: 26000, img: 'assets/img/product/VITAPREGO-e1642367642371.png', desc: 'Prenatal and postpartum clinical nutritional support.', rating: 4.8 },
    { id: 'p39', name: 'Vitamin-C (Bottle)', category: 'Immunity & Defence', price: 14400, member: 12000, img: 'assets/img/product/Vitamin-C.jpg', desc: 'High-potency buffered Vitamin C for immune resilience.', rating: 4.5 },
    { id: 'p40', name: 'Pearl Whitening Soap', category: 'Skin & Beauty', price: 5400, member: 4500, img: 'assets/img/product/img_40.png', desc: 'TFM-enriched herbal cleansing soap.', rating: 4.4 },
    { id: 'p41', name: 'Men Coffee', category: 'Vitality & Vigour', price: 13500, member: 9500, img: 'assets/img/product/men coffee.jpg', desc: 'Performance-enhancing therapeutic coffee blend.', rating: 4.6 },
    { id: 'p42', name: 'Refresh Tea', category: 'Detox & Digestive', price: 15600, member: 13000, img: 'assets/img/product/refresh-tea.png', desc: 'Liver and eye health maintenance tea.', rating: 4.5 },
    { id: 'p43', name: 'Sulfur Anti-Acne Soap', category: 'Skin & Beauty', price: 4800, member: 4000, img: 'assets/img/product/sulphur anti-acne soap.jpeg', desc: 'Clinical-grade acne defense and pore clearing.', rating: 4.3 },
    { id: 'p44', name: 'Gum Care Toothpaste', category: 'Skin & Beauty', price: 7200, member: 6000, img: 'assets/img/product/tooth-paste.jpg', desc: 'Fluoride-free gum protection and enamel support.', rating: 4.7 },
    { id: 'p46', name: 'Jointeez (Big/100c)', category: 'Bone & Joint', price: 16800, member: 14000, img: 'assets/img/product/img_10.png', desc: 'Advanced joint recovery and mobility optimization.', rating: 4.8 },
    { id: 'p46s', name: 'Jointeez (Small/40c)', category: 'Bone & Joint', price: 15000, member: 12500, img: 'assets/img/product/img_10.png', desc: 'Bone and joint comfort in a compact clinical format.', rating: 4.7 },
    { id: 'p45', name: 'GrowBett Fertilizer', category: 'Stem Cell', price: 7800, member: 6500, img: 'assets/img/product/img_04.png', desc: 'Cellular rejuvenation and regenerative baseline support.', rating: 5.0 }
];

const KEDI_PROTOCOLS = [
    // IMMUNITY & DEFENCE (8 protocols)
    { id: 'cp1', name: 'Elite Immune Guard', category: 'Immunity & Defence', productIds: ['p1', 'p18', 'p24', 'p31'], desc: 'Advanced defense system combining Ganoderma, Royal Jelly, and essential micronutrients.' },
    { id: 'cp6', name: 'Full Clinical Immunity Stack', category: 'Immunity & Defence', productIds: ['p1', 'p18', 'p24', 'p31', 'p33', 'p39'], desc: 'The complete clinical stack for systemic defense and anti-pathogenic resilience.' },
    { id: 'cp8', name: 'Ganoderma Defense Alpha', category: 'Immunity & Defence', productIds: ['p1', 'p24', 'p25', 'p39'], desc: 'Polysaccharide-rich tumor defense and cellular protection protocol.' },
    { id: 'cp9', name: 'Antiviral Baseline', category: 'Immunity & Defence', productIds: ['p33', 'p39', 'p18', 'p1'], desc: 'Fast-acting anti-pathogenic and fever-recovery protocol.' },
    { id: 'cp10', name: 'Respiratory Recovery', category: 'Immunity & Defence', productIds: ['p17', 'p1', 'p18', 'p31'], desc: 'Lung function optimization and respiratory mucosal defense.' },
    { id: 'cp11', name: 'Tumor Defense Pro', category: 'Immunity & Defence', productIds: ['p24', 'p1', 'p18', 'p26'], desc: 'Hydrogen-enhanced cellular resilience and abnormal growth inhibition.' },
    { id: 'cp12', name: 'Seasonal Resilience', category: 'Immunity & Defence', productIds: ['p39', 'p31', 'p18', 'p33', 'p42'], desc: 'Broad-spectrum seasonal health maintenance and allergen defense.' },
    { id: 'cp13', name: 'Elderly Immune Support', category: 'Immunity & Defence', productIds: ['p1', 'p18', 'p31', 'p2', 'p10'], desc: 'Targeted immune modulation for senior clinical profiles.' },

    // METABOLIC & WEIGHT (8 protocols)
    { id: 'cp2', name: 'Metabolic Reset Bundle', category: 'Metabolic & Weight', productIds: ['p3', 'p6', 'p23', 'p7', 'p25'], desc: 'Complete metabolic optimization protocol for weight management and sugar balance.' },
    { id: 'cp14', name: 'Sugar Balance Pro', category: 'Metabolic & Weight', productIds: ['p3', 'p25', 'p6', 'p16'], desc: 'Advanced glucose transport and insulin sensitivity optimization.' },
    { id: 'cp15', name: 'Weight Loss Accelerator', category: 'Metabolic & Weight', productIds: ['p6', 'p7', 'p25', 'p35'], desc: 'Thermogenic and detox-driven clinical weight reduction.' },
    { id: 'cp16', name: 'Digestive Metabolic Pack', category: 'Metabolic & Weight', productIds: ['p23', 'p6', 'p7', 'p4'], desc: 'Metabolic support through gastrointestinal optimization.' },
    { id: 'cp17', name: 'Green Coffee Synergy', category: 'Metabolic & Weight', productIds: ['p25', 'p6', 'p16', 'p3'], desc: 'Antioxidant-rich metabolic stimulation and energy focus.' },
    { id: 'cp18', name: 'Cellular Fat Burner', category: 'Metabolic & Weight', productIds: ['p6', 'p21', 'p25', 'p16'], desc: 'Cellular-level adipose metabolism and oxidative support.' },
    { id: 'cp19', name: 'Endocrine Balance', category: 'Metabolic & Weight', productIds: ['p19', 'p3', 'p6', 'p25'], desc: 'Hormonal metabolic synchronization and systemic balance.' },
    { id: 'cp20', name: 'Total Metabolic Overhaul', category: 'Metabolic & Weight', productIds: ['p3', 'p6', 'p23', 'p7', 'p25', 'p35', 'p16', 'p26'], desc: 'The definitive 8-step clinical metabolic reset protocol.' },

    // VITALITY & VIGOUR (8 protocols)
    { id: 'cp3', name: 'Ultimate Vitality Protocol', category: 'Vitality & Vigour', productIds: ['p8', 'p34', 'p28', 'p29', 'p17', 'p37'], desc: 'The definitive clinical stack for energy, cognitive function, and systemic vigor.' },
    { id: 'cp7', name: 'Daily Vitality Duo+', category: 'Vitality & Vigour', productIds: ['p8', 'p34', 'p17', 'p30'], desc: 'Essential male and female vitality optimization for active clinical results.' },
    { id: 'cp21', name: 'Male Peak Performance', category: 'Vitality & Vigour', productIds: ['p8', 'p34', 'p32', 'p41', 'p16'], desc: 'Premier testosterone and stamina optimization stack.' },
    { id: 'cp22', name: 'Female Hormone Harmony', category: 'Vitality & Vigour', productIds: ['p19', 'p30', 'p22', 'p11'], desc: 'Comprehensive reproductive and endocrine vitality for women.' },
    { id: 'cp23', name: 'Cognitive Clarity Stack', category: 'Vitality & Vigour', productIds: ['p29', 'p20', 'p16', 'p17'], desc: 'Neuro-protective and memory enhancement clinical stack.' },
    { id: 'cp24', name: 'Stamina Booster Alpha', category: 'Vitality & Vigour', productIds: ['p34', 'p8', 'p17', 'p41'], desc: 'Focused endurance and physical power optimization.' },
    { id: 'cp25', name: 'Prostate Health Protocol', category: 'Vitality & Vigour', productIds: ['p32', 'p28', 'p8', 'p34'], desc: 'Targeted prostate maintenance and urinary health.' },
    { id: 'cp26', name: 'Total Life Vigour', category: 'Vitality & Vigour', productIds: ['p8', 'p34', 'p30', 'p29', 'p17', 'p37', 'p41', 'p21'], desc: 'Full-spectrum systemic rejuvenation and longevity stack.' },

    // CARDIOVASCULAR (8 protocols)
    { id: 'cp4', name: 'Cardio Baseline Pack', category: 'Cardiovascular', productIds: ['p9', 'p5', 'p15', 'p36'], desc: 'Essential circulatory support and heart muscle oxygenation protocol.' },
    { id: 'cp27', name: 'Heart Muscle Vitality', category: 'Cardiovascular', productIds: ['p15', 'p9', 'p5', 'p36'], desc: 'Coenzyme-driven heart muscle strengthening and ATP focus.' },
    { id: 'cp28', name: 'Circulation Pro', category: 'Cardiovascular', productIds: ['p12', 'p9', 'p5', 'p15'], desc: 'Mechanical and biological circulatory synchronization.' },
    { id: 'cp29', name: 'Blood Oxygenation Stack', category: 'Cardiovascular', productIds: ['p5', 'p9', 'p36', 'p17'], desc: 'Optimized hemoglobin support and aerobic capacity boost.' },
    { id: 'cp30', name: 'Hypertension Defense', category: 'Cardiovascular', productIds: ['p9', 'p5', 'p12', 'p15', 'p36'], desc: 'Multimodal approach to blood pressure and arterial health.' },
    { id: 'cp31', name: 'Omega Clinical Stack', category: 'Cardiovascular', productIds: ['p36', 'p15', 'p9', 'p5'], desc: 'High-purity lipid management and anti-inflammatory cardio support.' },
    { id: 'cp32', name: 'Vascular Protection', category: 'Cardiovascular', productIds: ['p9', 'p15', 'p5', 'p21'], desc: 'Endothelial lining protection and capillary strength.' },
    { id: 'cp33', name: 'Complete Cardio Recovery', category: 'Cardiovascular', productIds: ['p9', 'p15', 'p5', 'p36', 'p12', 'p26', 'p21', 'p1'], desc: 'Absolute total heart and circulatory regeneration protocol.' },

    // DETOX & DIGESTIVE (8 protocols)
    { id: 'cp5', name: 'Full System Detox', category: 'Detox & Digestive', productIds: ['p35', 'p42', 'p4', 'p43', 'p44'], desc: 'Complete internal and external toxin elimination and baseline recovery.' },
    { id: 'cp34', name: 'Liver Detox Alpha', category: 'Detox & Digestive', productIds: ['p27', 'p35', 'p42', 'p7'], desc: 'Focused hepatic cleansing and regenerative support.' },
    { id: 'cp35', name: 'Colon Cleanser Master', category: 'Detox & Digestive', productIds: ['p4', 'p7', 'p35', 'p42'], desc: 'Advanced gastrointestinal purge and microbiota focus.' },
    { id: 'cp36', name: 'Digestive Relief Stack', category: 'Detox & Digestive', productIds: ['p23', 'p4', 'p42', 'p7'], desc: 'Fast-acting gastric comfort and enzyme normalization.' },
    { id: 'cp37', name: 'Herbal Refresh Pack', category: 'Detox & Digestive', productIds: ['p42', 'p7', 'p44', 'p40'], desc: 'Daily therapeutic maintenance for eyes, liver, and gums.' },
    { id: 'cp38', name: 'Skin & System Purge', category: 'Detox & Digestive', productIds: ['p43', 'p40', 'p35', 'p21'], desc: 'Combination protocol for dermal clarity and internal purity.' },
    { id: 'cp39', name: 'Heavy Metal Elimination', category: 'Detox & Digestive', productIds: ['p35', 'p26', 'p42', 'p27'], desc: 'Hydrogen-driven chelation and toxic sediment removal.' },
    { id: 'cp40', name: 'Total Digestive Reset', category: 'Detox & Digestive', productIds: ['p4', 'p23', 'p35', 'p42', 'p27', 'p7', 'p43', 'p44'], desc: 'The definitive 8-step clinical detoxification masterpiece.' }
];

function addProtocolToCart(protocolId) {
    const protocol = KEDI_PROTOCOLS.find(p => p.id === protocolId);
    if (!protocol) return;

    const products = protocol.productIds.map(pid => KEDI_PRODUCTS.find(kp => kp.id === pid)).filter(Boolean);
    
    products.forEach(p => {
        if (typeof window.addToCart === 'function') {
            window.addToCart(p.id, p.name, p.price, p.img);
        }
    });

    if (window.showKediNotification) {
        window.showKediNotification(`Clinical Protocol: ${protocol.name} added to cart!`);
    } else {
        alert(`${protocol.name} added to clinical cart!`);
    }
}

window.addProtocolToCart = addProtocolToCart;
window.KEDI_PROTOCOLS = KEDI_PROTOCOLS;
window.KEDI_PRODUCTS = KEDI_PRODUCTS;

/**
 * Render trending protocol cards with integrated share buttons.
 */
function renderTrendingProducts() {
    const container = document.getElementById('dynamic-trending-content');
    if (!container) return;

    const categories = ['Immunity & Defence', 'Metabolic & Weight', 'Vitality & Vigour', 'Cardiovascular', 'Detox & Digestive'];
    const tabIds = ['home', 'profile', 'messages', 'settings', 'tab5'];

    tabIds.forEach((id, index) => {
        const pane = document.getElementById(id);
        if (!pane) return;

        const category = categories[index];
        const categoryProtocols = KEDI_PROTOCOLS.filter(p => p.category === category).slice(0, 4);

        let html = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">';
        categoryProtocols.forEach(protocol => {
            html += `
            <div class="col">
                <div class="product-card group bg-white rounded-3xl border border-slate-100 p-5 flex flex-col" data-protocol-name="${protocol.name}" data-protocol-desc="${protocol.desc || ''}" data-protocol-url="${window.location.origin + '/protocols/protocol-' + protocol.id + '.html'}">
                    <h5 class="card-title text-base font-black text-slate-950">${protocol.name}</h5>
                    <p class="card-text small text-muted text-sm mt-1.5 mb-4 leading-snug">${protocol.desc}</p>
                    <button class="btn btn-primary btn-sm w-full bg-emerald-600 text-white py-2 rounded-xl" onclick="addProtocolToCart('${protocol.id}')">Add Protocol to Cart</button>
                </div>
            </div>`;
        });
        html += '</div>';
        pane.innerHTML = html;

        // After rendering, inject share buttons for each card
        pane.querySelectorAll('.product-card').forEach(card => {
            const title = card.dataset.protocolName || document.title;
            const desc = card.dataset.protocolDesc || '';
            const url = card.dataset.protocolUrl || window.location.href;
            
            // Resolve protocol image
            let img = '';
            const proto = KEDI_PROTOCOLS.find(p => p.name === title);
            if (proto && proto.productIds && proto.productIds.length > 0) {
                const firstProduct = KEDI_PRODUCTS.find(p => p.id === proto.productIds[0]);
                if (firstProduct) img = firstProduct.img;
            }
            
            const shareDiv = window.KediShare.createShareButtons(url, title, desc, img);
            card.appendChild(shareDiv);
        });
    });

    if (typeof window.CurrencyManager !== 'undefined' && typeof window.CurrencyManager.applyToPage === 'function') {
        window.CurrencyManager.applyToPage();
    }
}


window.renderTrendingProducts = renderTrendingProducts;
