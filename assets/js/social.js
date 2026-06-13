document.addEventListener('DOMContentLoaded', () => {
    // Story Data
    const stories = [
        { name: 'David S.', img: 'assets/img/gallery/testimony.jpg', type: 'image' },
        { name: 'Success Story', img: 'assets/img/gallery/Achievements.jpg', type: 'image' },
        { name: 'Clinical Info', img: 'assets/img/gallery/Roadmap.jpg', type: 'image' },
        { name: 'Dr. Jane', img: 'assets/img/avatar/avatar_01.png', type: 'image' },
        { name: 'Protocol A', img: 'assets/img/gallery/Reishi.jpg', type: 'image' },
        { name: 'Protocol B', img: 'assets/img/gallery/revive.jpg', type: 'image' }
    ];

    console.log("Social JS Initializing...");
    const storyBars = document.querySelectorAll('.Kedi-story-bar');
    if (storyBars.length > 0) {
        console.log(`Found ${storyBars.length} story bar containers`);
        storyBars.forEach(storyBar => {
            stories.forEach(story => {
                const item = document.createElement('div');
                item.className = 'story-item';
                item.innerHTML = `
                    <div class="story-circle">
                        <img src="${story.img}" alt="${story.name}">
                    </div>
                    <div class="story-name">${story.name}</div>
                `;
                item.onclick = () => openStory(story);
                storyBar.appendChild(item);
            });
        });
    } else {
        console.warn("No .Kedi-story-bar-container found");
    }

    // Success Grid Data
    const successItems = [
        { title: 'Arthritis Relief', img: 'assets/img/gallery/7 layer sanitary pad.jpg' },
        { title: 'Immune Boost', img: 'assets/img/gallery/reishi.jpg' },
        { title: 'Vitality', img: 'assets/img/gallery/revive.jpg' },
        { title: 'Digestive Health', img: 'assets/img/gallery/colon tea.jpg' },
        { title: 'Liver Care', img: 'assets/img/gallery/Cardibetter.jpg' },
        { title: 'Blood Sugar Support', img: 'assets/img/gallery/lycovite.jpg' },
        { title: 'Prostate Health', img: 'assets/img/gallery/Kedi_logo.png' },
        { title: 'Kidney Support', img: 'assets/img/gallery/Achievements.jpg' },
        { title: 'Respiratory Care', img: 'assets/img/gallery/Reishi.jpg' },
        { title: 'Joint Mobility', img: 'assets/img/gallery/revive.jpg' },
        { title: 'Heart Health', img: 'assets/img/gallery/Cardibetter.jpg' },
        { title: 'Energy Support', img: 'assets/img/gallery/lycovite.jpg' },
        { title: 'Immune Boost', img: 'assets/img/gallery/reishi.jpg' },
        { title: 'Vitality', img: 'assets/img/gallery/revive.jpg' },
        { title: 'Digestive Health', img: 'assets/img/gallery/colon tea.jpg' },
        { title: 'Liver Care', img: 'assets/img/gallery/Cardibetter.jpg' },
        { title: 'Blood Sugar Support', img: 'assets/img/gallery/lycovite.jpg' },
        { title: 'Prostate Health', img: 'assets/img/gallery/Kedi_logo.png' },
        { title: 'Kidney Support', img: 'assets/img/gallery/Achievements.jpg' },
        { title: 'Respiratory Care', img: 'assets/img/gallery/Reishi.jpg' },
        { title: 'Joint Mobility', img: 'assets/img/gallery/revive.jpg' },
        { title: 'Heart Health', img: 'assets/img/gallery/Cardibetter.jpg' },
        { title: 'Energy Support', img: 'assets/img/gallery/lycovite.jpg' },
        { title: 'Immune Boost', img: 'assets/img/gallery/reishi.jpg' },
        { title: 'Vitality', img: 'assets/img/gallery/revive.jpg' },
        { title: 'Digestive Health', img: 'assets/img/gallery/colon tea.jpg' },
        { title: 'Liver Care', img: 'assets/img/gallery/Cardibetter.jpg' },

    ];

    // 4x4 Pagination for Community Buzz (Success Grid)
    const SUCCESS_ITEMS_PER_PAGE = 16;
    let currentSuccessPage = 1;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function generateMockSuccessItems(count) {
        const pool = [
            { title: 'Arthritis Relief', img: 'assets/img/gallery/7 layer sanitary pad.jpg', likes: 843 },
            { title: 'Metabolic Balance', img: 'assets/img/gallery/Gumcare.jpg', likes: 512 },
            { title: 'Immune Defense', img: 'assets/img/gallery/Achievements.jpg', likes: 1204 },
            { title: 'Vitality Restored', img: 'assets/img/gallery/Cardibetter.jpg', likes: 677 },
            { title: 'Digestive Health', img: 'assets/img/gallery/Roadmap.jpg', likes: 398 },
            { title: 'Heart Vitality', img: 'assets/img/gallery/lycovite.jpg', likes: 921 },
            { title: 'Energy Boost', img: 'assets/img/gallery/Achievements.jpg', likes: 445 },
            { title: 'Skin Restoration', img: 'assets/img/gallery/reishi.jpg', likes: 763 },
            { title: 'Joint Mobility', img: 'assets/img/gallery/revive.jpg', likes: 532 },
            { title: 'Sleep Harmony', img: 'assets/img/gallery/colon tea.jpg', likes: 289 },
            { title: 'Prostate Support', img: 'assets/img/gallery/Cardibetter.jpg', likes: 614 },
            { title: 'Kidney Care', img: 'assets/img/gallery/Reishi.jpg', likes: 487 },
            { title: 'Blood Sugar Control', img: 'assets/img/gallery/lycovite.jpg', likes: 1102 },
            { title: 'Liver Detox', img: 'assets/img/gallery/Achievements.jpg', likes: 334 },
            { title: 'Respiratory Care', img: 'assets/img/gallery/Reishi.jpg', likes: 578 },
            { title: 'Foundation Protocol', img: 'assets/img/gallery/Roadmap.jpg', likes: 892 },
            { title: 'Colon Cleanse', img: 'assets/img/gallery/colon tea.jpg', likes: 441 },
            { title: 'Cardiovascular Health', img: 'assets/img/gallery/Cardibetter.jpg', likes: 756 },
            { title: 'Hormonal Balance', img: 'assets/img/gallery/7 layer sanitary pad.jpg', likes: 623 },
            { title: 'Weight Management', img: 'assets/img/gallery/Gumcare.jpg', likes: 1387 },
            { title: 'Bone Density', img: 'assets/img/gallery/lycovite.jpg', likes: 219 },
            { title: 'Nerve Support', img: 'assets/img/gallery/revive.jpg', likes: 348 },
            { title: 'Eye Health', img: 'assets/img/gallery/Achievements.jpg', likes: 492 },
            { title: 'Hair & Skin Glow', img: 'assets/img/gallery/Gumcare.jpg', likes: 1056 },
            { title: 'Anti-Ageing Protocol', img: 'assets/img/gallery/reishi.jpg', likes: 874 },
            { title: 'Stress Relief', img: 'assets/img/gallery/revive.jpg', likes: 667 },
            { title: 'Gut Microbiome Reset', img: 'assets/img/gallery/colon tea.jpg', likes: 329 },
            { title: 'Circulation Boost', img: 'assets/img/gallery/Cardibetter.jpg', likes: 541 },
            { title: 'Detox & Cleanse', img: 'assets/img/gallery/Roadmap.jpg', likes: 718 },
            { title: 'Memory & Focus', img: 'assets/img/gallery/lycovite.jpg', likes: 983 },
            { title: 'Female Vitality', img: 'assets/img/gallery/7 layer sanitary pad.jpg', likes: 1241 },
            { title: 'Male Performance', img: 'assets/img/gallery/revive.jpg', likes: 1478 },
        ];
        const items = [];
        while (items.length < count) {
            items.push(...pool.map(p => ({ ...p })));
        }
        return shuffle(items.slice(0, count));
    }

    const allSuccessItems = generateMockSuccessItems(1000);

    function renderSuccessGrid(page) {
        const grid = document.getElementById('success-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const start = (page - 1) * SUCCESS_ITEMS_PER_PAGE;
        const end = start + SUCCESS_ITEMS_PER_PAGE;
        const pageItems = allSuccessItems.slice(start, end);

        pageItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="grid-overlay">
                    <div class="grid-overlay-content">
                        <i class="fab fa-instagram mb-2"></i>
                        <span>${item.title}</span>
                        <div class="grid-stats mt-2">
                            <i class="fas fa-heart text-xs"></i> ${item.likes.toLocaleString()}
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(div);
        });

        setupSuccessPagination(page);
    }

    function setupSuccessPagination(activePage) {
        const container = document.getElementById('community-pagination');
        if (!container) return;

        container.innerHTML = '';
        const totalPages = Math.ceil(allSuccessItems.length / SUCCESS_ITEMS_PER_PAGE);
        const maxVisible = 5;

        let start = Math.max(1, activePage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

        const prev = document.createElement('button');
        prev.className = `page-btn ${activePage === 1 ? 'disabled' : ''}`;
        prev.innerHTML = '<i class="far fa-chevron-left"></i>';
        prev.onclick = () => { if (activePage > 1) { currentSuccessPage--; renderSuccessGrid(currentSuccessPage); scrollToGrid('success-grid'); } };
        container.appendChild(prev);

        for (let i = start; i <= end; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === activePage ? 'active' : ''}`;
            btn.innerText = i;
            btn.onclick = () => { currentSuccessPage = i; renderSuccessGrid(i); scrollToGrid('success-grid'); };
            container.appendChild(btn);
        }

        const next = document.createElement('button');
        next.className = `page-btn ${activePage === totalPages ? 'disabled' : ''}`;
        next.innerHTML = '<i class="far fa-chevron-right"></i>';
        next.onclick = () => { if (activePage < totalPages) { currentSuccessPage++; renderSuccessGrid(currentSuccessPage); scrollToGrid('success-grid'); } };
        container.appendChild(next);
    }

    function scrollToGrid(id) {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }

    console.log("Rendering Success Grid...");
    renderSuccessGrid(currentSuccessPage);

    // 4x4 Pagination System for Patient Experiences
    const ITEMS_PER_PAGE = 16;
    let currentSocialPage = 1;

    function generateMockPosts(count) {
        const pool = [
            { user: 'Dr. Ade', platform: 'instagram', img: 'assets/img/product/Reishi.png', comment: 'Protocol showing amazing results! #ClinicalSuccess', rating: 5 },
            { user: 'Sarah J.', platform: 'twitter', img: 'assets/img/product/Diawell.png', comment: '3 weeks on this and I feel transformed. #KediCares', rating: 5 },
            { user: 'Mike T.', platform: 'facebook', img: 'assets/img/product/revive.png', comment: 'Energy levels are at an all-time high. ⚡', rating: 4 },
            { user: 'LagosDoc', platform: 'instagram', img: 'assets/img/gallery/testimony.jpg', comment: "Best clinical guidance I've received. ✨", rating: 5 },
            { user: 'FitLife_NG', platform: 'twitter', img: 'assets/img/gallery/colon tea.jpg', comment: 'Natural and effective. Highly recommend.', rating: 4 },
            { user: 'Health_First', platform: 'facebook', img: 'assets/img/product/Reishi.png', comment: 'My metabolic health has never been better.', rating: 5 },
            { user: 'Grace_A', platform: 'instagram', img: 'assets/img/product/Diawell.png', comment: 'Safe and scientifically backed. Love it!', rating: 5 },
            { user: 'Daniel_K', platform: 'twitter', img: 'assets/img/product/revive.png', comment: 'Great results in such a short time.', rating: 4 },
            { user: 'Kedi_Labs', platform: 'facebook', img: 'assets/img/gallery/Achievements.jpg', comment: 'Verified by our in-house clinical team. Remarkable efficacy.', rating: 5 },
            { user: 'BioLab_NG', platform: 'instagram', img: 'assets/img/gallery/Cardibetter.jpg', comment: 'Blood pressure normalised in 6 weeks. #KediWorks', rating: 5 },
            { user: 'Nurse_Amaka', platform: 'facebook', img: 'assets/img/gallery/lycovite.jpg', comment: 'Recommending this to all my patients now.', rating: 5 },
            { user: 'Dr. Chukwu', platform: 'twitter', img: 'assets/img/product/Reishi.png', comment: 'Immune protocol is solid. Evidence-backed. 👏', rating: 5 },
            { user: 'AuraFan_01', platform: 'instagram', img: 'assets/img/gallery/revive.jpg', comment: 'Sleeping better than I have in years! 😴', rating: 4 },
            { user: 'Victor_O', platform: 'facebook', img: 'assets/img/gallery/Roadmap.jpg', comment: 'The Pi payment option is brilliant. So convenient.', rating: 4 },
            { user: 'Mama_Bisi', platform: 'instagram', img: 'assets/img/gallery/colon tea.jpg', comment: 'Colon cleanse protocol changed my digestion completely.', rating: 5 },
            { user: 'Dr. Emeka', platform: 'twitter', img: 'assets/img/product/Diawell.png', comment: 'Diawell is now part of my T2D management protocol.', rating: 5 },
            { user: 'Wellness_NG', platform: 'facebook', img: 'assets/img/gallery/Achievements.jpg', comment: 'Finally a brand that walks the talk. 💯', rating: 5 },
            { user: 'FaithH_', platform: 'instagram', img: 'assets/img/gallery/Gumcare.jpg', comment: 'Gum health improved massively in 2 weeks!', rating: 4 },
            { user: 'ClinicalNg', platform: 'twitter', img: 'assets/img/gallery/lycovite.jpg', comment: 'Lycovite antioxidant load is exceptional. Clinical grade.', rating: 5 },
            { user: 'Tunde_Fit', platform: 'facebook', img: 'assets/img/product/revive.png', comment: 'Re-Vive is real. Stamina and energy through the roof.', rating: 5 },
        ];
        const posts = [];
        while (posts.length < count) {
            posts.push(...pool.map(p => ({ ...p, likes: Math.floor(Math.random() * 400) + 50, comments: Math.floor(Math.random() * 80) + 5 })));
        }
        return shuffle(posts.slice(0, count));
    }

    const allSocialPosts = generateMockPosts(1000);

    function renderSocialPosts(page) {
        const postsGrid = document.getElementById('social-posts-grid');
        if (!postsGrid) return;

        postsGrid.innerHTML = '';
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageItems = allSocialPosts.slice(start, end);

        pageItems.forEach(post => {
            const card = document.createElement('div');
            card.className = 'social-post-card';
            const platformIcon = post.platform === 'instagram' ? 'fab fa-instagram' : (post.platform === 'twitter' ? 'fab fa-twitter' : 'fab fa-facebook');
            const platformColor = post.platform === 'instagram' ? '#e1306c' : (post.platform === 'twitter' ? '#1DA1F2' : '#4267B2');

            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += `<i class="${i < post.rating ? 'fas' : 'far'} fa-star text-yellow-400 text-xs"></i>`;
            }

            card.innerHTML = `
                <div class="post-card-header">
                    <div class="user-info">
                        <div class="user-avatar-small">${post.user.charAt(0)}</div>
                        <span class="user-name-small">${post.user}</span>
                    </div>
                    <i class="${platformIcon}" style="color: ${platformColor}"></i>
                </div>
                <div class="post-card-img-wrap">
                    <img src="${post.img}" alt="">
                </div>
                <div class="post-card-body">
                    <div class="post-card-rating mb-1">${stars}</div>
                    <p class="post-card-comment">"${post.comment}"</p>
                    <div class="post-card-footer mt-2 ul_li_between">
                        <div class="post-stats">
                            <span><i class="far fa-heart"></i> ${post.likes.toLocaleString()}</span>
                            <span class="ml-2"><i class="far fa-comment"></i> ${post.comments}</span>
                        </div>
                        <div class="post-share-actions">
                            <button onclick="sharePost('${post.user.replace(/'/g, "\\'")}', '${post.comment.replace(/'/g, "\\'")}', 'whatsapp')" class="share-btn whatsapp" title="Share on WhatsApp"><i class="fab fa-whatsapp"></i></button>
                            <button onclick="sharePost('${post.user.replace(/'/g, "\\'")}', '${post.comment.replace(/'/g, "\\'")}', 'facebook')" class="share-btn facebook" title="Share on Facebook"><i class="fab fa-facebook-f"></i></button>
                        </div>
                    </div>
                </div>
            `;
            postsGrid.appendChild(card);
        });

        setupPagination(page);
    }

    function setupPagination(activePage) {
        const paginationContainer = document.getElementById('social-pagination');
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(allSocialPosts.length / ITEMS_PER_PAGE);
        const maxVisiblePages = 5;

        let startPage = Math.max(1, activePage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = `page-btn ${activePage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="far fa-chevron-left"></i>';
        prevBtn.onclick = () => { if (activePage > 1) { currentSocialPage--; renderSocialPosts(currentSocialPage); window.scrollTo({ top: document.getElementById('social-posts-grid').offsetTop - 100, behavior: 'smooth' }); } };
        paginationContainer.appendChild(prevBtn);

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === activePage ? 'active' : ''}`;
            btn.innerText = i;
            btn.onclick = () => {
                currentSocialPage = i;
                renderSocialPosts(i);
                window.scrollTo({ top: document.getElementById('social-posts-grid').offsetTop - 100, behavior: 'smooth' });
            };
            paginationContainer.appendChild(btn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = `page-btn ${activePage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i class="far fa-chevron-right"></i>';
        nextBtn.onclick = () => { if (activePage < totalPages) { currentSocialPage++; renderSocialPosts(currentSocialPage); window.scrollTo({ top: document.getElementById('social-posts-grid').offsetTop - 100, behavior: 'smooth' }); } };
        paginationContainer.appendChild(nextBtn);
    }

    console.log("Rendering Patient Experience Social Posts...");
    renderSocialPosts(currentSocialPage);

    // Global Sharing Function
    window.sharePost = (user, comment, platform) => {
        // Use production URL for sharing as social platforms do not support local file:// links
        const baseUrl = "https://Kedicares.clinical/home-3.html";
        const text = encodeURIComponent(`Check out this clinical success story from Kedi Cares! ${user}: "${comment}"`);
        let shareUrl = "";

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(baseUrl)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(baseUrl)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    // Modal Logic (Global for stories)
    const modal = document.getElementById('story-modal');
    const modalContent = document.getElementById('modal-media-content');

    window.openStory = (story) => {
        if (!modal || !modalContent) return;
        modal.classList.add('active');
        if (story.type === 'image') {
            modalContent.innerHTML = `<img src="${story.img}" alt="${story.name}">`;
        } else {
            modalContent.innerHTML = `<video src="${story.video}" autoplay controls></video>`;
        }
    };

    window.closeStory = () => {
        if (!modal || !modalContent) return;
        modal.classList.remove('active');
        modalContent.innerHTML = '';
    };
});
