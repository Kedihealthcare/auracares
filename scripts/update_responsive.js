const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..'); // project root (scratch folder)
const HTML_FILES = ['index.html','about.html','shop.html','shop-left-sidebar.html','shop-single.html','cart.html','checkout.html','checkout-v2.html','contact.html','franchise.html','ai-doctor.html','auth.html','account.html','404.html'];

function injectIntoHtml(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  // 1. ensure responsive.css is linked after main.css
  const linkTag = '<link rel="stylesheet" href="assets/css/responsive.css"/>';
  if (!html.includes(linkTag)) {
    // find closing </head> tag and insert before it
    html = html.replace(/<\/head>/i, `    ${linkTag}\n</head>`);
  }
  // 2. add nav toggle button inside <header> if not present
  const toggleBtn = '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span class="icon-menu"></span></button>';
  if (html.includes('<header') && !html.includes('nav-toggle')) {
    // insert after opening <header> tag
    html = html.replace(/<header([^>]*)>/i, `<header$1>\n    ${toggleBtn}`);
  }
  // 3. add data-theme attribute to <html> for dark mode (optional, default light)
  if (!html.match(/<html[^>]*data-theme=/i)) {
    html = html.replace(/<html([^>]*)>/i, `<html$1 data-theme="light">`);
  }
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${filePath}`);
}

HTML_FILES.forEach(f => injectIntoHtml(path.join(PROJECT_ROOT, f)));
