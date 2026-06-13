const path = require('path');
const fs = require('fs');

const products = [
    { id: 'reishi', name: 'Reishi Capsules', price: 35000, img: 'Reishi.png' },
    { id: 'diawell', name: 'Diawell Capsules', price: 32000, img: 'Diawell.png' },
    { id: 'magilim', name: 'Magilim Capsules', price: 30000, img: 'Magilim.png' },
    { id: 'revive', name: 'Re-Vive Capsules', price: 44000, img: 'Revive.png' },
    { id: 'cordy', name: 'Cordy Active', price: 25000, img: 'Cordy Active.png' },
    { id: 'goldensix', name: 'Golden Six', price: 15500, img: 'Golden six.png' },
    { id: 'gastrifort', name: 'Gastrifort', price: 35000, img: 'Gastrifort.png' },
    { id: 'celloq10', name: 'Cello Q10', price: 45000, img: 'CELLO Q10.jpg' },
    { id: 'jointeez', name: 'Jointeez', price: 28000, img: 'Jointeez.png' },
    { id: 'constilease', name: 'Constilease', price: 22000, img: 'Constilease.png' },
    { id: 'colon-tea', name: 'Colon Cleanse Tea', price: 12500, img: 'Colon-tea.png' },
    { id: 'golden-hypha', name: 'Golden Hypha', price: 38000, img: 'Golden Hypha.png' },
    { id: 'cardibetter', name: 'Cardibetter', price: 28500, img: 'Cardibetter.jpg' },
    { id: 'lycovite', name: 'Lycovite', price: 30000, img: 'LYCOVITE.jpg' },
    { id: 'vitamin-c', name: 'Vitamin C', price: 15000, img: 'Vitamin-C.jpg' },
    { id: 'vigor', name: 'Vigor Essential', price: 24000, img: 'Vigor-Essential.png' }
];

const conditions = [
    "Type 2 Diabetes Management", "Hypertension Control", "Chronic Fatigue Syndrome", 
    "Immune System Fortification", "Gastrointestinal Restoration", "Joint Inflammation Relief",
    "Metabolic Syndrome Reset", "Male Reproductive Vitality", "Female Hormonal Balance",
    "Cardiovascular Support", "Kidney Function Optimization", "Respiratory Strength",
    "Systemic Detoxification", "Sleep Quality Enhancement", "Neurological Clarity",
    "Anti-Aging Cellular Protocol", "Liver Enzyme Regulation", "Prostate Health Maintenance",
    "Weight Management & Fat Burn", "Skin Elasticity & Health"
];

const levels = ["Standard", "Advanced", "Intensive", "Premium Clinical", "Ultimate Restoration"];

const recommendations = [];

for (let i = 1; i <= 5000; i++) {
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const numProducts = Math.floor(Math.random() * 2) + 2; // 2 or 3 products
    const selectedProducts = [];
    let totalPrice = 0;
    
    for (let j = 0; j < numProducts; j++) {
        const p = products[Math.floor(Math.random() * products.length)];
        if (!selectedProducts.find(x => x.id === p.id)) {
            selectedProducts.push(p);
            totalPrice += p.price;
        }
    }
    
    recommendations.push({
        id: `REC-${i.toString().padStart(4, '0')}`,
        title: `${level} ${condition}`,
        category: condition.split(' ').slice(-2).join(' '),
        description: `A specialized ${level.toLowerCase()} protocol designed to address ${condition.toLowerCase()} using synergistic herbal combinations.`,
        products: selectedProducts.map(p => p.name).join(' + '),
        mainImg: selectedProducts[0].img,
        price: totalPrice,
        badge: level.includes('Premium') ? 'Clinical' : level.includes('Intensive') ? 'High Potency' : null
    });
}

fs.writeFileSync('clinical_recommendations.json', JSON.stringify(recommendations, null, 2));
console.log('Generated 5000 clinical recommendations.');
