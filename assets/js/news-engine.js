/**
 * Kedi Clinical News & Article Database
 * Powers dynamic news loading for news-single.html
 */

const KediNews = (() => {
    const database = [
        {
            id: 1,
            slug: "cardiac-risk",
            category: "Health Intelligence",
            title: "Global Health Systems Deploy AI to Predict Cardiac Risk Before Symptoms Appear",
            author: "Dr. Elena Vance",
            date: "May 15, 2026",
            image: "https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/News%20Website%20Landing%20Page/nvidia-deal-clean.webp",
            quickTake: "Hospitals across three continents are integrating predictive analytics into routine care, aiming to catch high-risk heart patients months earlier.",
            content: `
                <p>Clinical healthcare is entering a new era where artificial intelligence isn't just an assistant but a frontline diagnostic tool. Major health systems in North America, Europe, and Asia have begun deploying specialized AI models that analyze patient history, genetic markers, and subtle biometric shifts to predict cardiac events up to six months before a patient shows clinical symptoms.</p>
                <p>This proactive approach marks a shift from reactive medicine—treating the disease—to predictive wellness—preventing the event. By catching high-risk markers early, doctors can prescribe specific Kedi clinical protocols or pharmaceutical interventions that stabilize the patient before emergency admission becomes necessary.</p>
                <h4>The Data Behind the Diagnosis</h4>
                <p>The AI engines are trained on billions of clinical data points, including ECG readings that appear 'normal' to the human eye but contain microscopic patterns indicating long-term cardiovascular decay. When these patterns are matched with lifestyle data, the accuracy of predicting a major cardiac event within 12 months exceeds 89%.</p>
                <p>As these systems scale, the global cost of cardiovascular care—currently the highest in many developed nations—is expected to drop by nearly 15% due to fewer emergency interventions and better outpatient management.</p>
            `,
            related: [2, 3, 4]
        },
        {
            id: 2,
            slug: "plant-based-diets",
            category: "Nutrition",
            title: "New Plant-Based Clinical Guidelines Redefine Post-Surgery Recovery Diets",
            author: "Prof. Marcus Thorne",
            date: "May 12, 2026",
            image: "assets/img/product/Golden six.png",
            quickTake: "A global coalition of surgeons now recommends protein-rich plant sources for faster wound healing and lower inflammation after major procedures.",
            content: `
                <p>Post-surgical nutrition is traditionally focused on high-protein animal sources, but new clinical evidence suggests that plant-based protocols may offer superior recovery outcomes. The 'Vitality Reset' protocol, focusing on anti-inflammatory phytonutrients, has shown a 22% reduction in post-operative inflammation markers in clinical trials.</p>
                <p>Surgeons are now integrating specific plant enzymes and polyphenols into the recovery phase. These nutrients don't just provide calories; they act as molecular signals that accelerate cellular regeneration and strengthen the immune response against secondary infections.</p>
                <h4>Why Plant-Based?</h4>
                <p>The primary advantage lies in the reduction of systemic inflammation. While animal proteins are effective for muscle mass, they often come with saturated fats that can trigger an inflammatory response. Plant sources like spirulina, soy, and concentrated herbal extracts provide the necessary amino acids without the inflammatory baggage.</p>
                <p>Patients on these clinical plant protocols reported higher energy levels during the first week of recovery compared to those on standard hospital diets.</p>
            `,
            related: [1, 5, 6]
        },
        {
            id: 3,
            slug: "sleep-coaching",
            category: "Wellness",
            title: "Corporate Wellness Programs Add Sleep Coaching to Reduce Burnout",
            author: "Sarah Jenkins",
            date: "May 10, 2026",
            image: "assets/img/product/Revive.png",
            quickTake: "Fortune 500 employers are funding digital sleep clinics and policy changes as part of employee retention strategies.",
            content: `
                <p>The relationship between sleep and professional productivity is no longer debated. In 2026, sleep coaching has become the fastest-growing sector of corporate wellness. Companies are moving beyond simple 'gym memberships' to offer clinical-grade sleep analysis and circadian rhythm optimization for their leadership teams.</p>
                <p>Burnout costs the global economy billions every year. By addressing the root cause—poor restorative sleep—employers are seeing a direct correlation with reduced absenteeism and improved decision-making under stress.</p>
                <h4>The Protocol Shift</h4>
                <p>Corporate clinics are now prescribing specific Kedi wellness protocols like the 'Cellular Detox' to help employees reset their biological clocks. These programs combine digital monitoring with herbal supplementation to normalize melatonin production and improve deep sleep cycles.</p>
                <p>Results from a recent pilot study showed that employees who underwent a 4-week sleep optimization program reported a 35% increase in perceived well-being and a 12% boost in focus during peak hours.</p>
            `,
            related: [1, 2, 4]
        },
        {
            id: 4,
            slug: "diabetes-reversal",
            category: "BioTech",
            title: "CRISPR Therapy Shows Promise in Early-Stage Diabetes Reversal",
            author: "Dr. Julian Chen",
            date: "May 08, 2026",
            image: "assets/img/product/Magilim.png",
            quickTake: "A Phase 1 trial demonstrates sustained insulin independence in patients treated with a new gene-editing regimen.",
            content: `
                <p>Gene editing has reached a critical milestone in the fight against Type 2 Diabetes. A new CRISPR-based therapy that targets pancreatic beta-cell efficiency has successfully reversed insulin dependence in a small group of early-stage patients.</p>
                <p>While still in the clinical trial phase, the implications are massive. Instead of managing symptoms with daily injections, the focus is shifting toward permanent biological correction of the body's metabolic signaling.</p>
                <h4>Kedi's Clinical Synergy</h4>
                <p>BioTech researchers are increasingly looking at how herbal protocols can support these advanced therapies. For instance, protocols like 'Magilim' which naturally regulate glucose absorption are being used as 'pre-conditioning' tools to stabilize patients before gene-editing procedures.</p>
                <p>The synergy between modern BioTech and ancient clinical wisdom is creating a new hybrid model of care that is more effective and less invasive than ever before.</p>
            `,
            related: [1, 5, 6]
        },
        {
            id: 5,
            slug: "reishi-efficacy",
            category: "Kedi Clinical",
            title: "Kedi's Immune Guard: A Deep Dive into Reishi Efficacy",
            author: "Clinical Research Team",
            date: "May 05, 2026",
            image: "assets/img/product/Reishi.png",
            quickTake: "A comprehensive review of how Reishi mushroom extracts modulate the immune system at a cellular level.",
            content: `
                <p>The Reishi mushroom (Ganoderma lucidum) has been a cornerstone of traditional clinical practice for centuries, but only recently has its molecular mechanism been fully decoded. Our research team has tracked how the polysaccharides and triterpenes in Kedi's Reishi extract interact with T-cells and Natural Killer (NK) cells.</p>
                <p>Unlike simple boosters, Reishi acts as an 'immunomodulator.' This means it can down-regulate an overactive immune system (as seen in allergies or autoimmune conditions) while up-regulating a suppressed one.</p>
                <h4>The Extraction Difference</h4>
                <p>Not all Reishi is created equal. The efficacy of the protocol depends on the extraction ratio and the purity of the spores. Kedi uses a proprietary low-temperature extraction process that preserves the delicate beta-glucans which are responsible for the mushroom's most potent clinical effects.</p>
                <p>Patients using the 'Immune Guard' protocol consistently show higher levels of antioxidant enzymes and a more balanced inflammatory profile within 30 days of consistent use.</p>
            `,
            related: [2, 4, 6]
        },
        {
            id: 6,
            slug: "longevity-protocols",
            category: "Longevity",
            title: "Clinical Protocols for Longevity: The Golden Six Explained",
            author: "Dr. Samuel Okon",
            date: "May 01, 2026",
            image: "assets/img/product/Golden six.png",
            quickTake: "How the ancient 'Golden Six' formula addresses the six pillars of aging to extend biological health-span.",
            content: `
                <p>Longevity is the new frontier of clinical healthcare. The 'Golden Six' protocol is an ancient formula refined for the modern age, specifically designed to address the primary drivers of biological aging: oxidative stress, glycation, hormonal decline, and mitochondrial dysfunction.</p>
                <p>By stabilizing the kidneys and liver—the body's primary filters—the Golden Six protocol ensures that cellular waste is removed efficiently, preventing the buildup of 'senescent cells' that cause age-related decline.</p>
                <h4>The Modern Clinical Application</h4>
                <p>Today, we use Golden Six not just as a supplement, but as a foundational lifestyle protocol. It pairs perfectly with modern longevity strategies like intermittent fasting and resistance training. The formula provides the adaptogenic support needed to handle the stress of these hormetic therapies.</p>
                <p>Users of the protocol often report improved sleep, better skin elasticity, and a significant reduction in joint discomfort within the first 60 days.</p>
            `,
            related: [1, 3, 5]
        },
        {
            id: 7,
            slug: "toilet-infection",
            category: "Wellness",
            title: "Overcoming Chronic Toilet Infections: A Clinical Herbal Approach",
            author: "Dr. Fatima Sule",
            date: "April 28, 2026",
            image: "assets/img/product/Gynacare.png",
            quickTake: "Why standard antibiotics often fail and how specific herbal protocols address the root cause of recurring infections.",
            content: `
                <p>Recurrent urinary tract and vaginal infections—often colloquially termed 'toilet infections'—pose a significant challenge to women's health globally. Standard antibiotic treatments frequently target the immediate symptoms but fail to address the underlying bacterial biofilms and pH imbalances that allow infections to return.</p>
                <p>Clinical herbal medicine offers a multi-layered approach. By using potent extracts like those found in Gynacare, practitioners can disrupt the protective barriers of resistant bacteria while simultaneously strengthening the local immune mucosal lining.</p>
                <h4>The Kedi Gynacare Protocol</h4>
                <p>The Gynacare protocol is designed to cleanse the reproductive system and restore the natural flora. Unlike broad-spectrum antibiotics that kill 'good' bacteria, these herbal extracts are selective, favoring the growth of healthy Lactobacillus while inhibiting pathogens like E. coli and Candida.</p>
                <p>Patients on the 30-day Gynacare protocol report an 85% reduction in recurrence rates, alongside improved hormonal balance and reduced pelvic inflammation.</p>
            `,
            related: [5, 8, 2]
        },
        {
            id: 8,
            slug: "immune-system",
            category: "Public Health",
            title: "Total Immune System Fortification in the Post-Pandemic Era",
            author: "Dr. Benson Idahosa",
            date: "April 25, 2026",
            image: "assets/img/product/V-Ca.png",
            quickTake: "How modern lifestyle stressors compromise immunity and the three-step clinical protocol to rebuild a resilient defense system.",
            content: `
                <p>The modern immune system is under constant assault from environmental toxins, processed sugars, and chronic stress. To maintain high-fidelity health, we must move beyond 'vitamin C' and look at deep systemic fortification.</p>
                <p>The 'V-Ca + Reishi' protocol is a cornerstone of clinical immunity. V-Ca provides the necessary electrolytes and bioavailable calcium required for rapid immune cell signaling, while Reishi provides the long-term adaptogenic support needed to keep the system balanced.</p>
                <h4>Three Pillars of Immunity</h4>
                <p>1. **Barrier Integrity**: Ensuring the gut and skin barriers are strong. 2. **Cellular Response**: Activating NK cells and macrophages. 3. **Memory Optimization**: Helping the system recognize and respond to threats faster.</p>
                <p>Integrating these clinical protocols into daily life has shown significant improvements in overall vitality and a marked decrease in the duration of common seasonal illnesses.</p>
            `,
            related: [5, 7, 1]
        }
    ];

    const getArticle = (query) => {
        let q = query ? query.toString().trim() : "";
        if (q === "cardiovascular-health-micro-circulation") q = "cardiac-risk";
        else if (q === "detox-weight-loss-connection") q = "plant-based-diets";
        else if (q === "tcm-immune-defense") q = "immune-system";
        else if (q === "metabolic-syndrome-reversal") q = "diabetes-reversal";
        else if (q === "male-vitality-beyond-the-pill") q = "sleep-coaching";

        return database.find(a => 
            a.id.toString() === q || 
            (a.slug && a.slug === q)
        );
    };

    return {
        getAll: () => database,
        getById: getArticle,
        getRelated: (ids) => database.filter(a => ids.includes(a.id)),
        initSingle: () => {
            const params = new URLSearchParams(window.location.search);
            let defaultId = "1";
            const path = window.location.pathname;
            if (path.includes('blog-immune-system.html')) {
                defaultId = "8";
            } else if (path.includes('blog-male-vitality.html')) {
                defaultId = "3";
            } else if (path.includes('blog-metabolic-health.html')) {
                defaultId = "4";
            }
            const query = params.get('id') || defaultId;
            const article = getArticle(query);
            
            if (article) {
                // Populate Page Content
                document.title = `${article.title} - Kedi News`;
                const titleEl = document.getElementById('news-title');
                if (titleEl) titleEl.innerText = article.title;
                
                const metaEl = document.getElementById('news-meta');
                if (metaEl) metaEl.innerText = `By ${article.author} | ${article.date} | ${article.category}`;
                
                const imgEl = document.getElementById('news-image');
                if (imgEl) imgEl.src = article.image;
                
                const contentEl = document.getElementById('news-content');
                if (contentEl) contentEl.innerHTML = article.content;

                const catEl = document.getElementById('news-category');
                if (catEl) catEl.innerText = article.category;

                const quickEl = document.getElementById('news-quick-take');
                if (quickEl) quickEl.innerText = article.quickTake;

                // Populate Related
                const relatedContainer = document.getElementById('news-related');
                if (relatedContainer && article.related) {
                    const relatedArticles = KediNews.getRelated(article.related);
                    relatedContainer.innerHTML = relatedArticles.map(rel => `
                        <a href="news-single.html?id=${rel.id}" class="group block border-b border-slate-100 pb-4 last:border-0">
                            <p class="text-[9px] font-black uppercase text-blue-600 mb-1">${rel.category}</p>
                            <h5 class="text-sm font-bold leading-tight group-hover:text-blue-600 transition-colors">${rel.title}</h5>
                        </a>
                    `).join('');
                }
            }
        },
        renderFeed: (containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = database.map(article => `
                <div class="group cursor-pointer border-b border-slate-100 py-8 first:pt-0 last:border-0" onclick="window.location.href='news-single.html?id=${article.id}'">
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                            <img src="${article.image}" class="w-full h-full object-cover transition-transform group-hover:scale-105">
                        </div>
                        <div>
                            <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest">${article.category}</span>
                            <h3 class="text-xl font-bold mt-2 leading-tight group-hover:text-blue-600 transition-colors">${article.title}</h3>
                            <p class="text-slate-500 text-sm mt-3 line-clamp-2">${article.quickTake}</p>
                            <div class="flex items-center gap-4 mt-4">
                                <span class="text-[9px] font-bold text-slate-400 uppercase">${article.author}</span>
                                <span class="text-[9px] font-bold text-slate-400 uppercase">${article.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    };
})();

// Auto-init on single article detail pages
const currentPath = window.location.pathname;
if (currentPath.includes('news-single.html') || 
    currentPath.includes('blog-immune-system.html') || 
    currentPath.includes('blog-male-vitality.html') || 
    currentPath.includes('blog-metabolic-health.html')) {
    document.addEventListener('DOMContentLoaded', KediNews.initSingle);
}
