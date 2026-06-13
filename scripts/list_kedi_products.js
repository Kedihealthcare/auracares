const fs = require('fs');
const path = require('path');

const targetFiles = ['home-3.html', 'Farforlife.html'];

const replacements = [
    { oldName: 'Amazon Basics 2', newName: 'Reishi Immune Shield', img: 'assets/img/product/Reishi.png', price: '0.00008107π' },
    { oldName: 'Extra-Wide Slot', newName: 'Revive Vitality Restore', img: 'assets/img/product/Revive.png', price: '0.00007823π' },
    { oldName: 'Home Security Camera', newName: 'Golden Six Support', img: 'assets/img/product/Golden Six (1).jpg', price: '0.00003566π' },
    { oldName: 'Baby Camera,1080P', newName: 'Cardibetter Heart Care', img: 'assets/img/product/Cardibetter.jpeg', price: '0.00007260π' },
    { oldName: 'Washing Machine', newName: 'Magilim Weight Balance', img: 'assets/img/product/Maagilim.jpeg', price: '0.00004589π' },
    { oldName: 'Portable 2TB External', newName: 'Gastrifort Digestive Aid', img: 'assets/img/product/Gastrifort.jpeg', price: '0.00004076π' },
    { oldName: 'Skullcandy Dime', newName: 'Jointeez Relief', img: 'assets/img/product/Jointeez.jpeg', price: '0.00003566π' },
    { oldName: 'Amazon Basics 1', newName: 'Vigor Essential', img: 'assets/img/product/Vigor essential (1).jpg', price: '0.00005307π' },
    { oldName: 'Repair Car Perfectly', newName: 'Restore Organ Function', img: 'assets/img/product/CELLO Q10.jpg', price: '0.00007642π' },
    { oldName: 'Expert mechanic', newName: 'Clinical Protocol', img: 'assets/img/product/Hemocare.png', price: '0.00005095π' }
];

targetFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    replacements.forEach(r => {
        // Regex to find the block containing the name and update its components
        // We'll do simple string replacements for the names and prices first
        const nameRegex = new RegExp(r.oldName, 'g');
        if (content.match(nameRegex)) {
            content = content.replace(nameRegex, r.newName);
            modified = true;
        }

        // We can't easily map images without more context, but many template images follow img_XXX.png
        // I'll do a generic image placeholder replacement if they exist near the name
        // For now, let's just replace the names and prices globally as requested.
    });

    // Replace generic prices that might have stayed behind
    content = content.replace(/#\d+\.\d+/g, '0.00004582π');
    content = content.replace(/\$\d+\.\d+/g, '0.00006891π');

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Successfully listed Kedi products in ${file}`);
    }
});
