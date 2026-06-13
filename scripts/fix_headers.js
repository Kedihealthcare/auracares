const path = require('path');
const fs = require('fs');

const correctHeader = fs.readFileSync('correct_header.txt', 'utf8');

['cart.html', 'checkout.html'].forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Some files like checkout.html have a malformed duplicated header section
    // where they have an extra <!-- header end --> and <div class="header__cat-wrap">
    
    // First, let's capture everything from "<!-- header start -->" to the last "<!-- header end -->" before the slide-bar
    const startIdx = html.indexOf('<!-- header start -->');
    const slideBarIdx = html.indexOf('<!-- slide-bar start -->');
    
    if (startIdx !== -1 && slideBarIdx !== -1) {
        const preHeader = html.substring(0, startIdx);
        const postHeader = html.substring(slideBarIdx);
        
        // Assemble with correct header
        html = preHeader + correctHeader + '\n\n        ' + postHeader;
        
        fs.writeFileSync(file, html, 'utf8');
        console.log('Successfully updated header for ' + file);
    } else {
        console.log('Could not find header markers in ' + file);
    }
});
