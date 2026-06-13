const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const targetFile = path.join(__dirname_root, 'kedi.html');
let lines = fs.readFileSync(targetFile, 'utf8').split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<!-- Aura Success Ecosystem -->')) {
        startIndex = i;
    }
    if (startIndex !== -1 && lines[i].includes('<!-- Story Modal -->')) {
        // Find the end of the story modal div
        for (let j = i; j < lines.length; j++) {
            if (lines[j].includes('</div>') && lines[j - 1] && lines[j - 1].includes('</div>') && lines[j - 2] && lines[j - 2].includes('</div>')) {
                // Wait, it's safer to just look for line index 5998 minus 1 since we know the exact text.
                // The story modal ends a few lines after <!-- Story Modal -->
            }
        }
    }
}

// More robust approach:
const content = fs.readFileSync(targetFile, 'utf8');

const blockRegex = /\s*<!-- Aura Success Ecosystem -->[\s\S]*?<!-- Story Modal -->[\s\S]*?<div id="story-modal" class="story-modal" onclick="closeStory\(\)">[\s\S]*?<div class="story-content" onclick="event\.stopPropagation\(\)">[\s\S]*?<span class="story-close" onclick="closeStory\(\)">&times;<\/span>[\s\S]*?<div id="modal-media-content"><\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>\r?\n/;

const match = content.match(blockRegex);
if (match) {
    const block = match[0];
    let newContent = content.replace(blockRegex, '\n');
    
    // Insert before brand start
    newContent = newContent.replace(/\s*<!-- brand start -->/, (m) => {
        return '\n' + block + m;
    });

    fs.writeFileSync(targetFile, newContent, 'utf8');
    console.log('Successfully moved Success Ecosystem before brand start.');
} else {
    console.log('Could not find the block to move.');
}
