# Vue.js 重構步驟

## 1. 環境設定

1.  引入 Vue.js 函式庫：在 `d1397056.html` 中，透過 CDN 或本地文件引入 Vue.js。
2.  建立 Vue 實體：在 `d1397056.js` 中，建立一個新的 Vue 實體，並將其掛載到 HTML 的容器元素上（例如 `<div id="app">`）。

## 2. HTML 模板

1.  將 `d1397056.html` 的 `<body>` 內容移至一個新的 `<div id="app">` 元素中。
2.  使用 `v-model` 將目標日期時間輸入框與 Vue data 中的 `targetDatetime` 屬性雙向綁定。
3.  使用 `{{ display }}` 來顯示倒數計時的結果。
4.  使用 `@click` 事件監聽器將「開始/暫停/繼續」和「重置」按鈕分別綁定到 Vue methods 中的 `start` 和 `reset` 方法。
5.  使用 `:disabled` 屬性綁定來根據應用程式的狀態（例如 `isIdle`, `isRunning`）動態地啟用/禁用按鈕和輸入框。

## 3. JavaScript (Vue 實體)

### data

在 Vue 實體中定義以下 `data` 屬性來管理應用程式的狀態：

-   `targetDatetime`: `null` - 儲存使用者設定的目標日期時間。
-   `timerId`: `null` - 儲存 `setInterval` 的 ID。
-   `currentState`: `'idle'` - `'idle'`, `'running'`, `'paused'`。
-   `remainingTime`: `0` - 暫停時剩餘的毫秒數。
-   `now`: `Date.now()` - 目前時間，用於計算剩餘時間。

### computed

建立以下 `computed` 屬性來衍生狀態：

-   `display()`: 根據 `remainingTime` 計算並格式化為 `hh:mm:ss` 的字串。
-   `isIdle()`: 回傳 `currentState === 'idle'`。
-   `isRunning()`: 回傳 `currentState === 'running'`。
-   `isPaused()`: 回傳 `currentState === 'paused'`。

### methods

建立以下 `methods` 來處理事件和邏輯：

-   `start()`:
    -   如果狀態是 `idle`：
        -   驗證 `targetDatetime`。
        -   設定 `targetTime`。
        -   將 `currentState` 切換為 `running`。
        -   啟動計時器 (`setInterval`) 並呼叫 `tick`。
    -   如果狀態是 `running`：
        -   暫停計時器 (`clearInterval`)。
        -   記錄 `remainingTime`。
        -   將 `currentState` 切換為 `paused`。
    -   如果狀態是 `paused`：
        -   根據 `remainingTime` 重新計算 `targetTime`。
        -   將 `currentState` 切換為 `running`。
        -   重新啟動計時器。
-   `reset()`:
    -   停止計時器。
    -   將 `currentState` 切換為 `idle`。
    -   重設所有相關的 data 屬性。
-   `tick()`:
    -   計算 `targetTime` 和 `now` 之間的差異。
    -   如果倒數結束，則停止計時器，顯示提示，並重設狀態。
    -   更新 `remainingTime`。

## 4. CSS

-   `d1397056.css` 的樣式基本上可以維持不變，因為 HTML 結構的 class 和 id 可以保留。
