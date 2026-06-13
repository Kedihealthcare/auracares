const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

const htmlFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short' });
const currentDate = new Date().getDate();
const currentYear = new Date().getFullYear();
const formattedDate = `${currentDay} - ${currentMonth} ${currentDate}, ${currentYear}`;

const authScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Update Dynamic Dates
            const dateEls = document.querySelectorAll('.header-date, .current-date');
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
            dateEls.forEach(el => el.innerHTML = '<i class="far fa-calendar-alt"></i> ' + dateStr);

            // 2. Auth State Management
            const userSession = JSON.parse(localStorage.getItem('kedi_user_session'));
            const authLinks = document.querySelectorAll('a[href*="account.html"], a[href*="login"], a[href*="register"]');
            
            if (userSession) {
                authLinks.forEach(link => {
                    if (link.innerText.toLowerCase().includes('sign in') || link.innerText.toLowerCase().includes('register')) {
                        link.innerHTML = '<i class="fas fa-user-circle"></i> ' + userSession.name.split(' ')[0];
                        link.href = '#!';
                        // Add logout listener
                        link.title = 'Click to Logout';
                        link.onclick = () => {
                            if(confirm('Logout of clinical ecosystem?')) {
                                localStorage.removeItem('kedi_user_session');
                                window.location.reload();
                            }
                        };
                    }
                });
            } else {
                authLinks.forEach(link => {
                    link.href = 'auth.html';
                });
            }
        });
    </script>
`;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname_root, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Update hardcoded dates
    if (html.includes('Friday - Jul 27, 2020')) {
        html = html.replace(/Friday - Jul 27, 2020/g, formattedDate);
        modified = true;
    }

    // Inject Auth Script before </body>
    if (!html.includes('// Auth State Management')) {
        html = html.replace('</body>', authScript + '</body>');
        modified = true;
    }

    // Link "Account", "Login", "Register" links to auth.html
    const linkRegex = /href=["'](account\.html|login\.html|register\.html)["']/g;
    if (linkRegex.test(html)) {
        html = html.replace(linkRegex, 'href="auth.html"');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated ${file} with dynamic date and auth linking.`);
    }
});
