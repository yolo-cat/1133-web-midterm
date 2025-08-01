(function() {
    // DOM 元素
    const displayEl = document.getElementById('display');
    const inputEl = document.getElementById('target-datetime');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    // 狀態管理
    let timerId = null;
    let currentState = 'idle'; // idle | running | paused
    let remainingTime = 0;    // 暫停時記錄剩餘毫秒
    let targetTime = 0;       // 目標時間的 timestamp

    // 渲染 UI
    function renderUI() {
        switch (currentState) {
            case 'idle':
                displayEl.textContent = '00:00:00';
                startBtn.textContent = '開始';
                startBtn.disabled = false;
                resetBtn.disabled = true;
                inputEl.disabled = false;
                break;
            case 'running':
                startBtn.textContent = '暫停';
                startBtn.disabled = false;
                resetBtn.disabled = false;
                inputEl.disabled = true;
                break;
            case 'paused':
                startBtn.textContent = '繼續';
                startBtn.disabled = false;
                resetBtn.disabled = false;
                inputEl.disabled = true;
                break;
        }
    }

    // 倒數計時
    function tick() {
        const now = Date.now();
        const diff = targetTime - now;
        if (diff <= 0) {
            clearInterval(timerId);
            alert('倒數結束！');
            // 重置到 idle，並清空輸入欄
            currentState = 'idle';
            inputEl.value = '';
            renderUI();
            return;
        }
        // 換算 hh:mm:ss
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        displayEl.textContent =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }

    // 啟動計時
    function startCountdown() {
        timerId = setInterval(tick, 1000);
        tick(); // 立即更新一次
    }

    // 按鈕事件
    startBtn.addEventListener('click', () => {
        if (currentState === 'idle') {
            const val = inputEl.value;
            if (!val) {
                alert('請設定日期時間');
                return;
            }
            const ts = new Date(val).getTime();
            if (isNaN(ts) || ts <= Date.now()) {
                alert('目標時間已過，請重新設定');
                return;
            }
            targetTime = ts;
            currentState = 'running';
            startCountdown();
            renderUI();
        } else if (currentState === 'running') {
            // 暫停
            clearInterval(timerId);
            remainingTime = targetTime - Date.now();
            currentState = 'paused';
            renderUI();
        } else if (currentState === 'paused') {
            // 繼續
            targetTime = Date.now() + remainingTime;
            currentState = 'running';
            startCountdown();
            renderUI();
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        currentState = 'idle';
        inputEl.value = '';
        renderUI();
    });

    // 初始化
    renderUI();
})();
