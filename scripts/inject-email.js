const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const PAGES=['home-3.html','kedi.html','Farforlife.html','shop.html','cart.html','checkout.html','about.html','contact.html','account.html','blog.html','quiz.html','roi-calculator.html','auth.html','shop-left-sidebar.html'];
const TAG='<script src="assets/js/kedi-email.js" defer></scr'+'ipt>';
let added=0;
for(const p of PAGES){
  const fp=path.join(ROOT,p);
  if(!fs.existsSync(fp)){console.warn('missing:',p);continue;}
  let h=fs.readFileSync(fp,'utf8');
  if(h.includes('kedi-email.js')){console.log('skip:',p);continue;}
  h=h.replace('</body>',TAG+'\n</body>');
  fs.writeFileSync(fp,h,'utf8');
  console.log('✅',p);added++;
}
console.log('\nDone. Injected:',added);
