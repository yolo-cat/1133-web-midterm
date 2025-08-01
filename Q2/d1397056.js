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
