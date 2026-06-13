const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

function updateHero(filename, title, subtitle, badge) {
    const filePath = path.join(__dirname_root, filename);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');
    
    // Find the hero text section
    // Assuming the hero text is inside a h3 or h2 with specific classes or near hero__product
    // Let's use a more targeted replacement for the hero headings
    
    // Replace the main hero title/subtitle/badge
    // Typical template structure: <span>badge</span> <h3>title</h3> <p>description</p>
    
    // This is a heuristic based on the template structure observed earlier
    if (filename === 'kedi.html') {
        html = html.replace(/<h2 class="title">[^<]+<\/h2>/, `<h2 class="title">WIYHC: What is Your <br> Health Challenge?</h2>`);
        html = html.replace(/<span>Get Save 30% off<\/span>/, `<span>AI Clinical Diagnostics</span>`);
    } else if (filename === 'home-3.html') {
        html = html.replace(/<h2 class="title">[^<]+<\/h2>/, `<h2 class="title">Clinical Wellness <br> Protocols</h2>`);
        html = html.replace(/<span>Get Save 30% off<\/span>/, `<span>Herbal Intelligence</span>`);
    } else if (filename === 'Farforlife.html') {
        html = html.replace(/<h2 class="title">[^<]+<\/h2>/, `<h2 class="title">Natural Health & <br> Longevity</h2>`);
        html = html.replace(/<span>Get Save 30% off<\/span>/, `<span>Empowering Vitality</span>`);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Differentiated Hero for ${filename}`);
}

updateHero('kedi.html');
updateHero('home-3.html');
updateHero('Farforlife.html');
