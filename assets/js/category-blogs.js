/**
 * Aura Herbs — Category Blog Drawer Engine
 * Reads from newsData (script.js) to populate the inline health blog
 * drawer when a user clicks a Product Category title on index.html.
 */

window.openCategoryBlog = function (catLabel, newsCategory) {
  const drawer = document.getElementById('kedi-cat-blog');
  const label  = document.getElementById('kedi-cat-blog-label');
  const grid   = document.getElementById('kedi-cat-blog-articles');
  if (!drawer || !label || !grid) return;

  const data    = (typeof newsData !== 'undefined') ? newsData : [];
  let   matched = data.filter(a => a.category === newsCategory).slice(0, 6);
  if (!matched.length) matched = data.slice(0, 6);

  label.textContent = catLabel + ' — Health Intelligence';

  grid.innerHTML = matched.map((a, i) => {
    const img = (a.img || 'assets/img/gallery/Reishi.jpg').replace(/^product\//, 'assets/img/product/');
    // find real index in newsData for openArticle()
    const realIdx = (typeof newsData !== 'undefined') ? newsData.indexOf(a) : i;
    return `
      <a class="kedi-blog-card" href="#!" onclick="openArticle(${realIdx});return false;">
        <img src="${img}" alt="${a.category}" loading="lazy">
        <div>
          <div class="kedi-blog-meta">${a.category} &middot; ${a.meta || ''}</div>
          <div class="kedi-blog-title">${a.title}</div>
          <div class="kedi-blog-summary">${a.summary || ''}</div>
        </div>
      </a>`;
  }).join('');

  drawer.style.display = 'block';
  // Retrigger animation
  drawer.style.animation = 'none';
  void drawer.offsetHeight;
  drawer.style.animation = 'slideDown .35s ease';
  drawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.closeCategoryBlog = function () {
  const drawer = document.getElementById('kedi-cat-blog');
  if (drawer) drawer.style.display = 'none';
};
