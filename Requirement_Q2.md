請參考下方檢查結果，根據你提供的三個檔案（HTML、CSS、JS）與圖片展示系統相關題目需求（通常會要求有：分類按鈕、點擊切換、畫廊排版、RWD、hover效果、active狀態等），逐項比對說明如下：

---

## 1. 篩選按鈕（分類）
- **程式碼實現**：
  ```html
  <nav class="filter-bar">
    <button class="active" data-filter="all">全部圖片</button>
    <button data-filter="nature">自然風景圖</button>
    <button data-filter="city">城市風景圖</button>
  </nav>
  ```
    - ✅ 有三個分類按鈕，`data-filter`屬性正確，並有`.active`初始狀態。

## 2. 點擊分類切換顯示
- **JS實現**：
  ```javascript
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
  ```
    - ✅ 點擊可切換.active樣式。
    - ✅ 依據filter顯示/隱藏對應li項目，功能正確。

## 3. 畫廊排版
- **HTML/CSS實現**：
  ```html
  <ul class="gallery">
    <li data-category="nature"><img ...></li>
    <!-- ... -->
    <li data-category="city"><img ...></li>
    <!-- ... -->
  </ul>
  ```
  ```css
  .gallery {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      list-style: none;
      padding: 0 1rem;
  }
  .gallery li {
      flex: 0 0 calc(25% - 1rem);
  }
  ```
    - ✅ 使用flex，四格排版（25%），gap有設，列表無圓點，水平置中。

## 4. RWD 響應式
- **CSS實現**：
  ```css
  @media (max-width: 768px) {
      .gallery li {
          flex: 0 0 calc(50% - 1rem);
      }
  }

  @media (max-width: 480px) {
      .gallery li {
          flex: 0 0 100%;
      }
  }
  ```
    - ✅ 在不同螢幕寬度下有2格、1格的排版。

## 5. hover 效果
- **CSS實現**：
  ```css
  .gallery img {
      width: 100%;
      display: block;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      transition: transform 0.3s ease, box-shadow 0.3s;
  }
  .gallery img:hover {
      transform: scale(1.05);
      box-shadow: none;
  }
  ```
    - ✅ 滑鼠移到圖片會放大、陰影消失。

## 6. active 狀態
- **CSS/JS實現**：
  ```css
  .filter-bar button.active {
      background-color: #38b2ac;
      color: white;
  }
  ```
    - ✅ 當前分類按鈕有顏色與文字變色。

## 7. 資料來源與圖片
- **HTML實現**：
    - 使用 placeholder 圖片，但資料結構正確，`data-category`有設，方便篩選。
    - （若有本地圖片需求，註解也有交代，僅示範用 placeholder）

---

## 結論
### 你的程式碼已**完全符合**典型「圖片展示系統」題目的所有核心需求，包括：
- 分類按鈕切換
- 篩選功能
- 畫廊排版與RWD
- hover與active狀態
- 各項語法正確

若有任何題目細節超出上述需求，請補充截圖或文字說明，我可以再細查。  
如單從「圖片展示系統」的標準學期考題來看，你的程式碼是**合格且完整的**！