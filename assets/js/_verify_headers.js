const fs = require('fs');
const files = ['home-2.html', 'home-3.html'];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const checks = {
    'lang="en"'         : html.includes('lang="en"'),
    'search cats'       : html.includes('All Protocols') && html.includes("Women's Health"),
    'nav categories'    : html.includes('VIP Massage Chair') && html.includes('hc_06.svg'),
    'mobile nav'        : html.includes('Clinical Protocols'),
    'bootstrap JS'      : html.includes('aura-header-bootstrap'),
    'currency-manager'  : html.includes('currency-manager.js'),
    'live date'         : html.includes('kedi-live-date') || html.includes('current-date'),
    'kedi-optimise.css' : html.includes('kedi-optimise.css')
  };
  console.log('\n' + f);
  Object.entries(checks).forEach(([k,v]) => {
    console.log('  ' + (v ? '✓' : '✗') + ' ' + k);
  });
});
