const buttons = document.querySelectorAll('button[data-filter]');
const items   = document.querySelectorAll('.gallery li');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 切換 .active 樣式
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        // 篩選顯示
        const filter = btn.dataset.filter;     // all / nature / city
        items.forEach(li => {
            li.style.display =
                filter === 'all' || li.dataset.category === filter ? 'block' : 'none';
        });
    });
});

// 圖片 hover 計時功能
const galleryItems = document.querySelectorAll('.gallery li');
galleryItems.forEach(li => {
    const timerSpan = li.querySelector('.hover-timer');
    let timer = null;
    let startTime = 0;
    let rafId = null;

    function updateTimer() {
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
        timerSpan.textContent = `${elapsed}s`;
        rafId = requestAnimationFrame(updateTimer);
    }

    li.addEventListener('mouseenter', () => {
        startTime = performance.now();
        timerSpan.textContent = '0.0s';
        rafId = requestAnimationFrame(updateTimer);
    });
    li.addEventListener('mouseleave', () => {
        cancelAnimationFrame(rafId);
    });
});
