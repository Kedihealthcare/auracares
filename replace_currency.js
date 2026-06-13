const fs = require('fs');
// Read and process each HTML file in the directory
const files = fs.readdirSync('.').filter(f => f.toLowerCase().endsWith('.html'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace the currency switcher
  const oldSwitcherRegex = /<li>\s*<div class="header__language currency">[\s\S]*?<\/div>\s*<\/li>/;
  const newSwitcher = `                            <li class="hidden md:flex items-center space-x-2 bg-slate-900/5 p-1 rounded-full border border-slate-200 ml-4">
                                <button data-currency-set="NGN" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">&#8358;</button>
                                <button data-currency-set="USD" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">$</button>
                                <button data-currency-set="PI" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">&pi;</button>
                            </li>`;

  if (oldSwitcherRegex.test(content)) {
    const updated = content.replace(oldSwitcherRegex, newSwitcher);
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Replaced currency switcher in ${file}`);
  } else {
    console.log(`Legacy currency block not found in ${file}`);
  }
});
console.log('Currency switcher replacement completed');
