const path = require('path');
const fs = require('fs');
let content = fs.readFileSync('generate_seo_and_blogs.js', 'utf8');
content = content.replace(/\\\${/g, '${');
fs.writeFileSync('generate_seo_and_blogs.js', content);
