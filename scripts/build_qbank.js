const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
// Ensure assets/js exists
if (!fs.existsSync('assets/js')) fs.mkdirSync('assets/js', { recursive: true });

const cats = {
  diabetes: { label: 'Diabetes & Glucose', product: 'Diawell Capsule', color: '#10B981' },
  hypertension: { label: 'Hypertension & Cardiac', product: 'Cardibetter Tablet', color: '#EF4444' },
  fertility_m: { label: 'Male Fertility', product: 'Vigor-Plus Capsule', color: '#3B82F6' },
  fertility_f: { label: 'Female Fertility', product: 'Golden Hypha', color: '#EC4899' },
  immunity: { label: 'Immune System', product: 'Re-Vive Capsule', color: '#8B5CF6' },
  metabolic: { label: 'Metabolic Syndrome', product: 'Colon Cleanser Tea', color: '#F59E0B' },
  vitality: { label: 'Cellular Vitality', product: 'Cordy Active Capsule', color: '#06B6D4' },
  hormonal: { label: 'Hormonal Balance', product: 'Eve\'s Comfort', color: '#D946EF' },
  joint: { label: 'Joint & Bone Health', product: 'Jointeez Capsule', color: '#64748B' },
  detox: { label: 'Systemic Detox', product: 'Constilease', color: '#10B981' },
  liver: { label: 'Liver & Kidney', product: 'Lym Tea', color: '#059669' },
  respiratory: { label: 'Respiratory Health', product: 'Golden Six', color: '#6366F1' },
  skin: { label: 'Clinical Skincare', product: 'Aloe Vera Gel', color: '#14B8A6' },
  neurology: { label: 'Neurological Health', product: 'Ginkgo Softgel', color: '#4F46E5' },
  pediatric: { label: 'Pediatric Growth', product: 'Z-Power', color: '#F43F5E' }
};

const levels = ['screening', 'diagnostic', 'clinical'];
const questions = [];

// Generate ~18,700 questions (approx 1,250 per category)
for (const [key, cat] of Object.entries(cats)) {
  for (let l = 0; l < levels.length; l++) {
    const level = levels[l];
    // Each level has ~415 variations
    for (let i = 0; i < 415; i++) {
      const v = i + 1;
      const topics = [
        `Symptoms of ${cat.label}`, `History of ${cat.label}`, `Environmental Factors`, 
        `Lifestyle Impact`, `Genetic Predisposition`, `Dietary Habits`, `Stress Levels`,
        `Recent Changes`, `Frequency of Incidents`, `Severity Assessment`
      ];
      const topic = topics[i % topics.length];
      
      const qText = [
        `Have you noticed any persistent ${topic.toLowerCase()} lately?`,
        `How would you rate your ${topic.toLowerCase()} on a scale of 1-10?`,
        `Does your family have a history of ${topic.toLowerCase()} issues?`,
        `When did the first signs of ${topic.toLowerCase()} appear?`,
        `Are you currently taking any supplements for ${topic.toLowerCase()}?`
      ];
      
      const q = qText[i % qText.length];
      
      const slug = `${key}-${level}-${v}-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
      questions.push({
        id: `Q-${key}-${level}-${v}`,
        seoSlug: slug,
        category: key,
        categoryLabel: cat.label,
        topic: topic,
        riskLevel: level,
        question: q,
        options: v % 2 === 0 ? ['Yes', 'No', 'Unsure'] : ['Always', 'Frequently', 'Rarely', 'Never'],
        weight: (l + 1) * 2,
        aiPersonalized: v % 3 === 0,
        product: cat.product
      });
    }
  }
}

function generateBank() {
  const qbank = {
    version: '1.0',
    generated: new Date().toISOString(),
    total: questions.length,
    categories: Object.entries(cats).map(([key,c])=>({ 
      key, 
      label:c.label, 
      product:c.product, 
      color:c.color, 
      count: questions.filter(q=>q.category===key).length 
    })),
    questions
  };

  const jsonStr = JSON.stringify(qbank, null, 2);
  fs.writeFileSync(path.join(__dirname_root, 'assets/js/question-bank.json'), jsonStr);
    
  // Also save as .js for easy loading via script tag (bypasses CORS in local files)
  const jsStr = `window.AURA_QBANK = ${jsonStr};`;
  fs.writeFileSync(path.join(__dirname_root, 'assets/js/question-bank.js'), jsStr);

  console.log(`Success! Generated ${qbank.questions.length} questions across ${qbank.categories.length} categories.`);
  console.log(`Saved to assets/js/question-bank.json and assets/js/question-bank.js`);

  // Write mini 1000-question download version
  const mini = { ...qbank, questions: questions.slice(0,1000), total:1000, note:'Sample export. Full bank: /api/questions' };
  fs.writeFileSync('question-bank-download.json', JSON.stringify(mini, null, 2));
  console.log('Download sample JSON written: question-bank-download.json');
}

generateBank();
