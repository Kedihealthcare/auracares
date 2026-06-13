let currentCategory = 'All';
let visibleCount = 8;
let currentArticleIndex = null;
const categories = [
  'Nutrition',
  'Wellness',
  'Pharma',
  'Mental Health',
  'BioTech',
  'Med Devices',
  'Public Health',
];
const categoryImages = {
  Nutrition:
    'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/adani-green-energy-clean.webp',
  Wellness:
    'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/carbon-hub-clean.webp',
  Pharma:
    'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/merck-kgaa-clean.webp',
  'Mental Health':
    'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/nvidia-deal-clean.webp',
  BioTech:
    'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/c-130j-clean.webp',
  'Med Devices':
    'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/tesla-deal-clean.webp',
  'Public Health':
    'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/carbon-hub-clean.webp',
};
const authorPool = [
  'Dr. Aisha Rana',
  'Mina Patel',
  'Elena García',
  'Priya Sethi',
  'Leila Hassan',
  'Sahil Mehra',
  'Maya Alvarez',
  'Noah Clarke',
  'Amala Das',
  'Nina Brooks',
];

const baseArticles = [
  {
    category: 'Nutrition',
    title: 'New Plant-Based Clinical Guidelines Redefine Post-Surgery Recovery Diets',
    summary:
      'A global coalition of surgeons now recommends protein-rich plant sources for faster wound healing and lower inflammation after major procedures.',
    meta: 'NUTRITION • 1H AGO',
    location: 'GLOBAL',
    img: categoryImages.Nutrition,
    author: 'Dr. Aisha Rana',
    published: 'May 4, 2026',
    quickTake:
      'Nutrition protocols are shifting from calorie counts to anti-inflammatory recovery planning.',
    content:
      'Clinical leaders have released new recovery guidelines that prioritize plant-based proteins, micronutrient density, and gut-supporting post-operative meals. The updated protocol is expected to reduce infection rates and accelerate patient mobility, while creating new opportunities for hospital foodservice innovation. Nutrition specialists say this could become the standard for surgical recovery across both private and public health systems.',
    likes: 232,
    shares: 46,
  },
  {
    category: 'Wellness',
    title: 'Corporate Wellness Programs Add Sleep Coaching to Reduce Burnout',
    summary:
      'Fortune 500 employers are funding digital sleep clinics and policy changes as part of employee retention and mental resilience strategies.',
    meta: 'WELLNESS • 3H AGO',
    location: 'NEW YORK',
    img: categoryImages.Wellness,
    author: 'Mina Patel',
    published: 'May 4, 2026',
    quickTake:
      'Sleep coaching is now a pillar of workplace health benefits, not a wellness perk.',
    content:
      'Major employers are partnering with clinical sleep coaches to deliver personalized plans, cognitive behavioral therapy, and biometric feedback to employees. The programs aim to cut burnout, improve productivity, and reduce healthcare claims tied to insomnia. Experts say this marks a shift from optional wellbeing programs to core health benefits for distributed workforces.',
    likes: 189,
    shares: 32,
  },
  {
    category: 'Pharma',
    title: 'Regulators Fast-Track a Novel mRNA Treatment for Autoimmune Disease',
    summary:
      'Health authorities granted priority review for an mRNA candidate that rebalances immune signaling in early-stage rheumatoid arthritis.',
    meta: 'PHARMA • 6H AGO',
    location: 'LONDON',
    img: categoryImages.Pharma,
    author: 'Elena García',
    published: 'May 4, 2026',
    quickTake:
      'mRNA is moving beyond vaccines into chronic disease management.',
    content:
      'The drug developer reported that the experimental mRNA therapy reduced joint inflammation and autoimmune markers in a Phase 2 trial. Regulators cited the treatment’s strong safety profile and unmet need as key factors in the expedited review. Analysts expect this approval pathway to accelerate next-gen biologics for autoimmune and inflammatory disorders.',
    likes: 214,
    shares: 52,
  },
  {
    category: 'Mental Health',
    title: 'Digital Therapy Adoption Surges with Employer-Sponsored Behavioral Health Apps',
    summary:
      'Insurance plans are increasingly covering app-based mental health care, leading to wider adoption among mid-sized corporations.',
    meta: 'MENTAL HEALTH • 10H AGO',
    location: 'SAN FRANCISCO',
    img: categoryImages['Mental Health'],
    author: 'Priya Sethi',
    published: 'May 4, 2026',
    quickTake:
      'Digital therapy is now a mainstream employee benefit with measurable retention gains.',
    content:
      'New reimbursement models are making digital therapy apps accessible through employer-sponsored health plans. Behavioral health providers say this is increasing early intervention and lowering the threshold for care. Insurers are reporting improved program engagement and reductions in high-cost crisis claims as a result.',
    likes: 178,
    shares: 27,
  },
  {
    category: 'BioTech',
    title: 'CRISPR Therapy Shows Promise in Early-Stage Diabetes Reversal',
    summary:
      'A Phase 1 trial demonstrates sustained insulin independence in patients treated with a new gene-editing regimen.',
    meta: 'BIOTECH • 14H AGO',
    location: 'BOSTON',
    img: categoryImages.BioTech,
    author: 'Leila Hassan',
    published: 'May 3, 2026',
    quickTake:
      'Gene editing is entering metabolic disease therapies with a first clinical signal.',
    content:
      'The biotech company announced positive early results from a CRISPR-based intervention targeting pancreatic beta cell regeneration. Trial participants achieved improved glucose control and reduced insulin dependency within six months. Observers say this could transform how diabetes is treated if later-stage studies confirm the response.',
    likes: 298,
    shares: 66,
  },
  {
    category: 'Med Devices',
    title: 'Wearable Glucose Sensor Earns Breakthrough Device Designation',
    summary:
      'The new sensor delivers non-invasive blood sugar tracking with continuous alerts for hypo- and hyperglycemia events.',
    meta: 'MED DEVICES • 1D AGO',
    location: 'BERLIN',
    img: categoryImages['Med Devices'],
    author: 'Sahil Mehra',
    published: 'May 3, 2026',
    quickTake:
      'Non-invasive monitoring is poised to simplify diabetes care for millions.',
    content:
      'A new wearable sensor has been granted breakthrough designation after demonstrating accurate glucose readings without fingersticks. The device connects to smartphones and delivers predictive hypoglycemia alerts. Medical device manufacturers say the platform may accelerate at-home chronic care management globally.',
    likes: 205,
    shares: 52,
  },
  {
    category: 'Public Health',
    title: 'Global Vaccine Equity Pledge Expands to 120 Countries',
    summary:
      'A new global compact commits funding and supply chain support to reach underserved populations by year-end.',
    meta: 'PUBLIC HEALTH • 2D AGO',
    location: 'GENEVA',
    img: categoryImages['Public Health'],
    author: 'Maya Alvarez',
    published: 'May 2, 2026',
    quickTake:
      'The pledge targets access gaps in low-income countries with a coordinated logistics blueprint.',
    content:
      'Public health agencies and donors have agreed to a joint vaccine equity roadmap that covers production, procurement, and distribution. The agreement emphasizes cold-chain investments, local manufacturing, and community outreach. Health officials say the compact aims to reduce preventable mortality from vaccine-preventable diseases.',
    likes: 254,
    shares: 59,
  },
];

const articleTemplates = {
  Nutrition: [
    'Gut-Targeted Nutrient Plans Improve Recovery for Cardiac Patients',
    'Micronutrient Tracking Apps Fuel New Personalized Nutrition Wave',
    'Hospital Cafeterias Add Plant-Based Recovery Menus to Reduce Readmissions',
  ],
  Wellness: [
    'Community Wellness Hubs Shift Focus to Chronic Stress Resilience',
    'Corporate Health Programs Add Mindfulness Benefits to Benefits Suite',
    'Personalized Wellness Diagnostics Gain Adoption in Employee Health Plans',
  ],
  Pharma: [
    'AI-Driven Drug Repurposing Identifies New Neurodegenerative Candidates',
    'Biotech Begins Phase 3 Trial for Long-Acting Migraine Therapy',
    'Pharma Supply Chain Software Cuts Drug Shortage Risk by 40%',
  ],
  'Mental Health': [
    'Telehealth Therapists Add AI Symptom Assessments for Anxiety',
    'Hybrid Care Programs Blend Coaching and Psychiatry for Teen Support',
    'Mental Health Startups Expand Coverage Through ACO Partnerships',
  ],
  BioTech: [
    'Synthetic Biology Lab Partners with Hospitals for Tissue Repair',
    'BioTech Startups Deploy AI to Predict Immune Response Rates',
    'Cell Therapy Manufacturing Gains Regulatory Fast Track',
  ],
  'Med Devices': [
    'Smart Bandage Technology Monitors Wound Healing in Real Time',
    'Surgical Robotics Platform Adds Haptic Feedback to Reduce Errors',
    'At-Home Diagnostic Kits Expand to Cardiovascular Markers',
  ],
  'Public Health': [
    'City Heat-Health Alerts Now Include Personalized Hydration Plans',
    'Rural Health Networks Roll Out Portable Lab Diagnostics',
    'Public Health Data Trusts Launch to Improve Pandemic Response',
  ],
};

const extraArticles = Array.from({ length: 100 }, (_, index) => {
  const category = categories[index % categories.length];
  const titleOptions = articleTemplates[category];
  const title = titleOptions[index % titleOptions.length];
  const locationOptions = ['LONDON', 'DUBAI', 'TOKYO', 'SYDNEY', 'TORONTO', 'BOSTON', 'SEOUL'];
  const location = locationOptions[index % locationOptions.length];
  const author = authorPool[index % authorPool.length];
  const publishedDay = 2 + (index % 4);
  return {
    category,
    title,
    summary: `A health sector update focused on ${category.toLowerCase()} innovation, patient outcomes, and new market adoption across ${location}.`,
    meta: `${category.toUpperCase()} • ${2 + (index % 18)}H AGO`,
    location,
    img: categoryImages[category],
    author,
    published: `May ${publishedDay}, 2026`,
    quickTake: `A fast-moving ${category.toLowerCase()} headline with strong implications for clinical practice and wellness adoption.`,
    content: `This story explores how recent advancements in ${category.toLowerCase()} are changing care pathways and improving access. The market is responding to patient demand with novel solutions, while regulators monitor safety and effectiveness. Industry analysts believe the shift will accelerate over the next 12 months as providers scale these capabilities beyond early adopter sites.`,
    likes: 80 + ((index * 7) % 221),
    shares: 12 + ((index * 5) % 77),
  };
});

const newsData = [...baseArticles, ...extraArticles];
const testimonials = [
  {
    quote:
      'HealthPulse helped me discover the latest clinical trends without leaving the page. The reader view keeps me focused and engaged.',
    author: 'Claire B., Healthcare Executive',
  },
  {
    quote:
      'The AI quiz is a clever way to test what you’ve learned from the health feed. It feels polished and practical.',
    author: 'Jordan T., Wellness Coach',
  },
  {
    quote:
      'I can track stories, comments, and feel like the site knows the health space. This is how a news site should work today.',
    author: 'Mila R., Public Health Advisor',
  },
];

const aiQuiz = [
  {
    question: 'What is the top benefit of AI-assisted recovery plans?',
    options: ['Faster patient discharge', 'Predictive nutrition guidance', 'Lower insurance premiums', 'Less paperwork'],
    correct: 1,
    explanation:
      'AI-assisted recovery plans are strongest when they provide personalized nutrition and rehabilitation guidance that can improve clinical outcomes.',
  },
  {
    question: 'Which health category best describes wearable glucose sensors?',
    options: ['Pharma', 'BioTech', 'Med Devices', 'Public Health'],
    correct: 2,
    explanation:
      'Wearable glucose sensors are medical devices that monitor physiological signals in real time.',
  },
  {
    question: 'What is the fastest-growing benefit in corporate wellness programs?',
    options: ['Gym memberships', 'Nutrition coaching', 'Sleep coaching', 'Meditation apps'],
    correct: 2,
    explanation:
      'Sleep coaching is becoming a mainstream benefit because it directly reduces burnout and improves employee productivity.',
  },
];

const productFiles = [
  '7 layer-sanitary-pad.png',
  'beaty soap.jpeg',
  'Blood-circulatory-ads.png',
  'Blood-circulatory-machine.png',
  'CALMAZINE.png',
  'CARDIBETTER222.png',
  'CELLO Q10.jpg',
  'chatbot (2).png',
  'chatbot.png',
  'COFFEE.png',
  'colon-tea-cleanser.png',
  'Constilease.png',
  'Cordy Active.png',
  'Cordy Royal Jelly.png',
  'DIAWELL.png',
  'EVE-COMFORT.png',
  'Eye Beta.png',
  'Gastrifort.png',
  'Golden six.png',
  'Golden-Hypha.png',
  'GRAPEMIN-E - for skkin.png',
  'GRAPEMIN-E.png',
  'GYNAPHARM.png',
  'Hemocare.png',
  'Hydrogen cup (1).jpg',
  'img_166.png',
  'img_167.png',
  'img_168.png',
  'img_169.png',
  'img_170.png',
  'img_171.png',
  'img_172.png',
  'img_173.png',
  'img_174.png',
  'img_175.png',
  'img_176.png',
  'LIRICH.png',
  'LYCOVITE.jpg',
  'Magilim.png',
  'MEMORY-247.png',
  'Multi-vitamin.jpg',
  'MV-WOMEN.png',
  'Qinghao-pack.jpg',
  'refresh-tea.png',
  'Reishi.png',
  'Revive.png',
  'sulphur anti-acne soap.jpeg',
  'tooth-paste.jpg',
  'ULTRAMEGA.jpg',
  'Vigor essential (1).jpg',
  'Vigor essential (4).jpg',
  'vip_massage_chair.png',
  'VITAGENT.png',
  'Vitamin-C.jpg',
  'VITAPREGO-e1642367642371.png',
];

const productCategoryRules = [
  { terms: ['pad', 'women', 'prego', 'preg'], category: 'Women\'s Health' },
  { terms: ['soap', 'shampoo', 'skin', 'acne', 'dermal', 'beauty'], category: 'Skincare' },
  { terms: ['blood', 'cardio', 'circulatory', 'hemocare', 'heart'], category: 'Cardio & Circulation' },
  { terms: ['tea', 'coffee', 'drink', 'cup', 'refresh'], category: 'Nutrition & Detox' },
  { terms: ['machine', 'chair', 'device'], category: 'Medical Devices' },
  { terms: ['vitamin', 'multi', 'nutrient', 'mb', 'Calmazine', 'Magilim', 'Cordy', 'Royal', 'Grape', 'Reishi', 'Vigor', 'ULTRAMEGA'], category: 'Supplements' },
  { terms: ['eye', 'skin', 'beauty', 'hydrogen'], category: 'Wellness' },
  { terms: ['colon', 'gut', 'digestive', 'Gastrifort', 'Constilease'], category: 'Digestive Health' },
  { terms: ['memory', 'brain', 'cognitive', 'Mind'], category: 'Cognitive Wellness' },
  { terms: ['GYNAPHARM', 'EVE'], category: 'Women\'s Health' },
];

function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]+/g, '')
    .replace(/\-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeProductName(fileName) {
  const name = fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[_]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b([a-z])/g, (match) => match.toUpperCase())
    .trim();
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getProductCategory(name) {
  const lower = name.toLowerCase();
  for (const rule of productCategoryRules) {
    if (rule.terms.some((term) => lower.includes(term.toLowerCase()))) {
      return rule.category;
    }
  }
  return 'Health & Wellness';
}

function buildProductMetadata(name, category) {
  const baseTags = [category, 'AI', 'Health', 'Wellness', 'Smart Upsell'];
  const keywords = name
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 4);
  const tags = Array.from(new Set([...baseTags, ...keywords]));
  return {
    title: name,
    category,
    tags,
    shortKeywords: [name, category, 'health product', 'AI recommendation'],
    longKeywords: [`AI-powered ${category.toLowerCase()} solution`, `${name} wellness product recommendation`, `best ${category.toLowerCase()} product for modern health`].join(', '),
  };
}

function buildProductArticles() {
  return productFiles.map((fileName) => {
    const title = normalizeProductName(fileName);
    const category = getProductCategory(title);
    const metadata = buildProductMetadata(title, category);
    const imagePath = `product/${fileName}`;
    const description = `${title} is a modern ${category.toLowerCase()} product designed for smarter outcomes and complementary wellness pairings.`;
    const related = productFiles
      .filter((other) => other !== fileName)
      .map((other) => normalizeProductName(other))
      .filter((otherName) => otherName.toLowerCase().includes(category.split(' ')[0].toLowerCase()) || otherName.toLowerCase().includes('Health'.toLowerCase()))
      .slice(0, 3);

    return {
      fileName,
      title,
      category,
      slug: slugify(title),
      description,
      tags: metadata.tags,
      shortKeywords: metadata.shortKeywords,
      longKeywords: metadata.longKeywords,
      img: imagePath,
      upsellSummary: `Smart pairings for ${category.toLowerCase()} with AI-generated bundles and purchase insights.`,
      related,
    };
  });
}

const productArticles = buildProductArticles();

const aiAgents = [
  {
    name: 'HealthProductAgent',
    role: 'Generates base product articles from product assets and categories',
    model: 'GPT-4.1-mini',
  },
  {
    name: 'SmartUpsellAgent',
    role: 'Recommends complementary health products and bundle pairings',
    model: 'custom-rag-enhanced',
  },
  {
    name: 'SearchTagAgent',
    role: 'Creates metadata, search tags, and keyword signals for SEO',
    model: 'keyword-tuner-v1',
  },
];

function getSmartUpsell(article) {
  let recommendations = productArticles.filter((item) => item.category === article.category && item.slug !== article.slug);
  if (recommendations.length < 3) {
    recommendations = productArticles.filter((item) => item.slug !== article.slug).slice(0, 3);
  }
  return recommendations.slice(0, 3);
}

function renderProductCatalog(items = productArticles.slice(0, 12)) {
  const container = document.getElementById('product-catalog-grid');
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<div class="text-center text-slate-500 py-16">No products match your search criteria.</div>';
    return;
  }
  container.innerHTML = items
    .map(
      (item) => `
        <article class="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition">
          <div class="relative overflow-hidden h-72">
            <img loading="lazy" src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105">
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
              <span>${item.category}</span>
              <span>${item.tags.slice(0, 2).join(', ')}</span>
            </div>
            <h3 class="text-xl font-bold tracking-tight text-slate-900">${item.title}</h3>
            <p class="text-sm leading-relaxed text-slate-600">${item.description}</p>
            <div class="flex flex-wrap gap-2">
              ${item.tags.slice(0, 3).map((tag) => `<span class="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">${tag}</span>`).join('')}
            </div>
            <button onclick="showProductUpsell('${item.slug}')" class="w-full rounded-full bg-slate-950 text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition">View Smart Pairings</button>
          </div>
        </article>
      `
    )
    .join('');
}

function showProductUpsell(slug) {
  const product = productArticles.find((item) => item.slug === slug);
  const panel = document.getElementById('upsell-panel');
  if (!product || !panel) return;
  const recommendations = getSmartUpsell(product);
  panel.innerHTML = `
    <div class="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-start">
      <div>
        <span class="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Smart Bundle</span>
        <h3 class="text-3xl font-black tracking-tight mt-3">${product.title}</h3>
        <p class="mt-4 text-slate-600 text-sm leading-relaxed">${product.description}</p>
        <p class="mt-6 text-sm text-slate-500">${product.upsellSummary}</p>
        <div class="mt-6 grid gap-4">
          ${recommendations
            .map(
              (item) => `
                <div class="rounded-3xl border border-slate-200 bg-white p-4">
                  <p class="text-xs uppercase tracking-[0.22em] text-slate-400 mb-2">Upgrade cue</p>
                  <p class="font-bold text-sm text-slate-900">${item.title}</p>
                  <p class="text-[11px] text-slate-500 mt-2">${item.category}</p>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
        <p class="text-[10px] font-black uppercase tracking-[0.22em] text-blue-300">Recommended Tags</p>
        <div class="mt-4 space-y-2">
          ${product.tags.map((tag) => `<span class="inline-flex rounded-full bg-blue-600/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-100">${tag}</span>`).join('')}
        </div>
        <p class="mt-6 text-sm text-slate-300">Keywords:</p>
        <p class="mt-2 text-[11px] leading-6 text-slate-300">${product.longKeywords}</p>
      </div>
    </div>
  `;
}

function filterProductCatalog(query) {
  const normalized = (query || '').trim().toLowerCase();
  const filtered = normalized
    ? productArticles.filter((item) => {
        return (
          item.title.toLowerCase().includes(normalized) ||
          item.category.toLowerCase().includes(normalized) ||
          item.description.toLowerCase().includes(normalized) ||
          item.tags.join(' ').toLowerCase().includes(normalized) ||
          item.shortKeywords.join(' ').toLowerCase().includes(normalized) ||
          item.longKeywords.toLowerCase().includes(normalized)
        );
      })
    : productArticles;
  renderProductCatalog(filtered.slice(0, 12));
  const panel = document.getElementById('upsell-panel');
  if (panel) {
    panel.innerHTML = `<div class="text-slate-600">${filtered.length} product${filtered.length === 1 ? '' : 's'} matching "${query.trim()}".</div>`;
  }
}

function renderAiAgents() {
  const container = document.getElementById('ai-agents-grid');
  if (!container) return;
  container.innerHTML = aiAgents
    .map(
      (agent) => `
        <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h4 class="text-sm font-black uppercase tracking-[0.22em] text-blue-600">${agent.name}</h4>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">${agent.role}</p>
          <div class="mt-4 text-[10px] uppercase tracking-[0.22em] text-slate-400">Model: ${agent.model}</div>
        </div>
      `
    )
    .join('');
}

function renderSeoStructuredData() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'HealthPulse',
      url: 'https://healthpulse.example.com',
      description:
        'HealthPulse is an AI-powered health news site featuring product intelligence, quiz navigation, and smart upsell recommendations.',
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: 'https://healthpulse.example.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://healthpulse.example.com/index.html',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Health Feed',
          item: 'https://healthpulse.example.com/index.html#main-feed',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Product Catalog',
          item: 'https://healthpulse.example.com/index.html#product-catalog',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'HealthPulse',
      url: 'https://healthpulse.example.com',
      logo: 'https://healthpulse.example.com/logo.png',
      sameAs: ['https://www.linkedin.com/company/healthpulse', 'https://twitter.com/healthpulse'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: productArticles.slice(0, 12).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: article.title,
          image: `https://healthpulse.example.com/${article.img}`,
          description: article.description,
          url: `https://healthpulse.example.com/${article.slug}`,
          category: article.category,
        },
      })),
    },
  ];

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

window.healthAiAgents = aiAgents;
window.healthProductCatalog = productArticles;

const commentAuthors = ['Avery', 'Noah', 'Sofia', 'Ravi', 'Leila'];
const replyAuthors = ['Community Nurse', 'Health Analyst', 'Wellness Lead'];
const commentSnippets = [
  'This is a valuable update—especially the protocol guidance for recovery nutrition.',
  'I appreciate the coverage on clinical workflow changes and patient outcomes.',
  'Great to see more employer health programs focused on mental wellbeing.',
  'The AI quiz section really helped me understand the use case better.',
];
const replySnippets = [
  'The early evidence looks promising and may reshape standard care.',
  'Yes, this could make a real difference in access and compliance.',
  'It is important that these models remain transparent for clinicians.',
];
const articleCommentsCache = {};
const scheduleIdle = window.requestIdleCallback || function (callback) {
  return setTimeout(callback, 200);
};

function getFilteredArticles(category) {
  if (category === 'All') {
    return newsData;
  }
  return newsData.filter((item) => item.category === category);
}

function renderNews(data) {
  const container = document.getElementById('news-container');
  const slicedData = data.slice(0, visibleCount);
  container.innerHTML = '';

  if (!slicedData.length) {
    container.innerHTML = '<div class="text-slate-500 text-center py-16">No stories found for this category.</div>';
    updateLoadMoreButton(data.length);
    return;
  }

  slicedData.forEach((item, index) => {
    const originalIndex = newsData.findIndex(
      (source) => source.title === item.title && source.category === item.category
    );
    const card = `
      <div onclick="openArticle(${originalIndex})" class="article-card flex flex-col md:flex-row gap-8 lg:gap-12 group cursor-pointer">
        <div class="w-full md:w-1/3 aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden relative shadow-sm border border-slate-100">
          <img loading="lazy" src="${item.img}"
               alt="${item.title}"
               class="absolute inset-0 w-full h-full object-cover img-transition [overflow-clip-margin:unset]">
        </div>
        <div class="w-full md:w-2/3">
          <div class="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <div class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span class="text-blue-600">${item.category}</span>
              <span class="text-slate-300">/</span>
              <span>${item.location}</span>
            </div>
            <div class="flex items-center gap-3 text-[10px] text-slate-400 uppercase tracking-widest">
              <span>❤ ${item.likes}</span>
              <span>⇪ ${item.shares}</span>
            </div>
          </div>
          <h3 class="serif-heading text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors leading-tight italic">
            ${item.title}
          </h3>
          <p class="text-slate-500 text-base leading-relaxed mb-6 line-clamp-3">
            ${item.summary}
          </p>
          <div class="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>${item.meta}</span>
            <span class="mx-4 text-slate-100">|</span>
            <span class="group-hover:text-slate-900 transition flex items-center">
              Read Analysis
              <svg class="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </span>
          </div>
        </div>
      </div>
      ${index < slicedData.length - 1 ? '<div class="h-px bg-slate-100 my-12"></div>' : ''}
    `;
    container.innerHTML += card;
  });
  updateLoadMoreButton(data.length);
}

function updateLoadMoreButton(total) {
  const button = document.getElementById('load-archive-btn');
  if (!button) return;
  if (visibleCount >= total) {
    button.style.display = 'none';
  } else {
    button.style.display = 'inline-flex';
    const more = Math.min(visibleCount + 8, total) - visibleCount;
    button.textContent = `Load More Archives (${more} more)`;
  }
}

function loadMoreArticles() {
  visibleCount += 8;
  const filtered = getFilteredArticles(currentCategory);
  renderNews(filtered);
}

function renderTestimonials() {
  const container = document.getElementById('testimonial-feed');
  if (!container) return;
  container.innerHTML = testimonials
    .map(
      (item) => `
        <div class="rounded-3xl border border-slate-200 bg-white p-6">
          <p class="text-sm leading-relaxed text-slate-700">“${item.quote}”</p>
          <p class="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">${item.author}</p>
        </div>
      `
    )
    .join('');
}

function renderQuiz() {
  const container = document.getElementById('ai-quiz');
  if (!container) return;
  container.innerHTML = aiQuiz
    .map(
      (item, index) => `
        <div class="rounded-3xl border border-slate-200 p-5 bg-slate-50">
          <p class="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Question ${index + 1}</p>
          <h4 class="font-bold text-lg mb-4">${item.question}</h4>
          <div class="space-y-3">
            ${item.options
              .map(
                (option, optionIndex) => `
                <button onclick="handleQuizAnswer(${index}, ${optionIndex})" class="w-full text-left rounded-2xl border border-slate-200 px-4 py-3 bg-white text-sm hover:bg-slate-100 transition">
                  ${option}
                </button>
              `
              )
              .join('')}
          </div>
          <p id="quiz-feedback-${index}" class="mt-4 text-sm text-slate-500 quiz-feedback"></p>
        </div>
      `
    )
    .join('');
}

function handleQuizAnswer(questionIndex, selectedIndex) {
  const question = aiQuiz[questionIndex];
  const feedback = document.getElementById(`quiz-feedback-${questionIndex}`);
  if (!feedback) return;
  feedback.className = 'mt-4 text-sm quiz-feedback active';
  if (selectedIndex === question.correct) {
    feedback.textContent = `Correct — ${question.explanation}`;
    feedback.classList.add('correct');
    feedback.classList.remove('incorrect');
  } else {
    feedback.textContent = `Not quite. ${question.explanation}`;
    feedback.classList.add('incorrect');
    feedback.classList.remove('correct');
  }
}

function getCommentsForArticle(articleIndex) {
  if (articleCommentsCache[articleIndex]) {
    return articleCommentsCache[articleIndex];
  }
  const commentCount = 2 + (articleIndex % 3);
  const comments = Array.from({ length: commentCount }, (_, index) => ({
    author: commentAuthors[(articleIndex + index) % commentAuthors.length],
    text: commentSnippets[(articleIndex + index) % commentSnippets.length],
    time: `${1 + ((articleIndex + index) % 6)}H AGO`,
    replies: [
      {
        author: replyAuthors[(articleIndex + index) % replyAuthors.length],
        text: replySnippets[(articleIndex + index) % replySnippets.length],
        time: '1H AGO',
      },
    ],
  }));
  articleCommentsCache[articleIndex] = comments;
  return comments;
}

function renderComments(articleIndex) {
  const container = document.getElementById('reader-comments-list');
  if (!container) return;
  currentArticleIndex = articleIndex;
  const comments = getCommentsForArticle(articleIndex);
  container.innerHTML = comments
    .map(
      (comment, index) => `
        <div class="rounded-3xl border border-slate-200 bg-white p-5">
          <div class="flex items-center justify-between mb-3">
            <div>
              <p class="font-bold text-sm text-slate-900">${comment.author}</p>
              <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400">${comment.time}</p>
            </div>
            <button onclick="replyToComment(${index})" class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Reply</button>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed">${comment.text}</p>
          ${comment.replies
            .map(
              (reply) => `
                <div class="mt-4 rounded-3xl bg-slate-50 p-4 border border-slate-100">
                  <p class="font-bold text-sm text-slate-900">${reply.author}</p>
                  <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400">${reply.time}</p>
                  <p class="mt-2 text-sm text-slate-600 leading-relaxed">${reply.text}</p>
                </div>
              `
            )
            .join('')}
        </div>
      `
    )
    .join('');
}

function postComment() {
  const textarea = document.getElementById('comment-input');
  if (!textarea || !textarea.value.trim() || currentArticleIndex === null) return;
  const comments = getCommentsForArticle(currentArticleIndex);
  comments.unshift({
    author: 'You',
    text: textarea.value.trim(),
    time: 'Now',
    replies: [],
  });
  textarea.value = '';
  renderComments(currentArticleIndex);
}

function replyToComment(commentIndex) {
  if (currentArticleIndex === null) return;
  const replyText = window.prompt('Write your reply:');
  if (!replyText || !replyText.trim()) return;
  const comments = getCommentsForArticle(currentArticleIndex);
  comments[commentIndex].replies.push({
    author: 'You',
    text: replyText.trim(),
    time: 'Now',
  });
  renderComments(currentArticleIndex);
}

function renderRelated(currentIndex) {
  const relatedContainer = document.getElementById('reader-related');
  if (!relatedContainer) return;
  const relatedItems = newsData
    .map((item, index) => ({ ...item, originalIndex: index }))
    .filter((item) => item.originalIndex !== currentIndex)
    .slice(0, 3);
  relatedContainer.innerHTML = relatedItems
    .map(
      (item) => `
      <button onclick="openArticle(${item.originalIndex})" class="w-full text-left rounded-3xl border border-slate-200 p-4 hover:bg-slate-50 transition">
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">${item.category}</p>
        <p class="font-bold leading-tight">${item.title}</p>
      </button>
    `
    )
    .join('');
}

function openArticle(index, pushState = true) {
  const article = newsData[index];
  if (!article) return;

  currentArticleIndex = index;
  document.getElementById('reader-category').textContent = article.category;
  document.getElementById('reader-title').textContent = article.title;
  document.getElementById('reader-meta').textContent = `${article.meta} • ${article.location}`;
  document.getElementById('reader-image').src = article.img;
  document.getElementById('reader-image').alt = article.title;
  document.getElementById('reader-content').textContent = article.content;
  document.getElementById('reader-author').textContent = article.author;
  document.getElementById('reader-date').textContent = article.published;
  document.getElementById('reader-quick-take').textContent = article.quickTake;
  renderRelated(index);
  renderComments(index);

  document.getElementById('reader-view').classList.remove('hidden');
  document.getElementById('reader-view').classList.add('reader-fade-in');
  document.getElementById('main-feed').classList.add('hidden');
  document.getElementById('hero-block').style.display = 'none';

  if (pushState) {
    window.history.pushState({ page: 'article', index }, article.title, `#article-${index}`);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeReader(pushState = true) {
  document.getElementById('reader-view').classList.add('hidden');
  document.getElementById('main-feed').classList.remove('hidden');
  if (currentCategory === 'All') {
    document.getElementById('hero-block').style.display = 'grid';
  }
  if (pushState) {
    window.history.pushState({ page: 'feed' }, '', window.location.pathname);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterCategory(cat) {
  currentCategory = cat;
  visibleCount = 8;
  const btns = document.querySelectorAll('.category-btn');
  btns.forEach((btn) => {
    if (
      btn.innerText.toLowerCase() === cat.toLowerCase() ||
      (cat === 'All' && btn.innerText.toLowerCase() === 'all health')
    ) {
      btn.className =
        'category-btn px-4 py-1.5 rounded-full bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap';
    } else {
      btn.className =
        'category-btn px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap';
    }
  });

  const filtered = getFilteredArticles(cat);
  renderNews(filtered);
  document.getElementById('hero-block').style.display = cat === 'All' ? 'grid' : 'none';
  document.getElementById('category-title').textContent = cat === 'All' ? 'Latest Health Feed' : `${cat} Insights`;
  document.getElementById('reader-view').classList.add('hidden');
  document.getElementById('main-feed').classList.remove('hidden');
  if (cat === 'All') {
    window.history.pushState({ page: 'feed' }, '', window.location.pathname);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');
  if (nav.classList.contains('hidden')) {
    nav.classList.remove('hidden');
    overlay.classList.remove('hidden');
  } else {
    nav.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page === 'article') {
    openArticle(event.state.index, false);
  } else {
    closeReader(false);
  }
});

function initFromHash() {
  const match = window.location.hash.match(/^#article-(\d+)$/);
  if (match) {
    openArticle(Number(match[1]), false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNews(newsData);
  renderProductCatalog();
  renderAiAgents();
  renderSeoStructuredData();
  const upsellPanel = document.getElementById('upsell-panel');
  if (upsellPanel) {
    upsellPanel.innerHTML = '<div class="text-slate-600">Select a product to reveal AI-driven upsell pairings and keywords.</div>';
  }
  const productSearch = document.getElementById('product-search');
  if (productSearch) {
    productSearch.addEventListener('input', (event) => filterProductCatalog(event.target.value));
  }
  scheduleIdle(() => {
    renderTestimonials();
    renderQuiz();
  });
  initFromHash();
});