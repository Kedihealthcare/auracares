const path = require('path');
const fs = require('fs');

let html = fs.readFileSync('home-3.html', 'utf8');

const kediProducts = [
  'Reishi Capsule', 'Revive Capsule', 'Vitaprego Pro', 'Cardibetter',
  'Golden Six', 'Cordy Active', 'Constilease', 'Diawell', 'Hemocare', 'Gastrifort'
];
let idx = 0;

html = html.replace(/Beats Flex Farforlife/g, () => {
  const name = kediProducts[idx % kediProducts.length];
  idx++;
  return name;
});

html = html.replace(/lorem Ipsum is simply printing dummy/g, 'Precision-engineered TCM formula for clinical restoration.');

fs.writeFileSync('home-3.html', html, 'utf8');
console.log('home-3.html fixed — ' + idx + ' product titles replaced, lorem ipsum cleared.');
