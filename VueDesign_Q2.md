當你要將目前「圖片展示系統」導入 Vue 框架時，建議採用以下設計方案：

---

## 1. 專案結構規劃

建議採用 Vue CLI 或 Vite 來建立專案結構，方便後續維護與擴充。

```
圖片展示系統/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   └── Gallery.vue
│   │   └── FilterBar.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── ...
```

---

## 2. 元件規劃

### (1) FilterBar.vue
- 功能：顯示分類按鈕，點擊切換 active 狀態，並向父元件 emit 篩選條件。
- Props: `categories`, `activeCategory`
- Emits: `update:category`

### (2) Gallery.vue
- 功能：根據選擇分類顯示對應圖片。
- Props: `images`, `filter`

### (3) App.vue
- 功能：作為頁面主控，管理狀態（目前分類、圖片資料）並組合元件。

---

## 3. 狀態管理

- 使用 Vue reactive/computed 管理 active category。
- 圖片資料可寫於 data 或使用外部 JSON 檔匯入，格式如：
    ```js
    [
      { src: 'images/nature1.jpg', category: 'nature', alt: '自然風景 1' },
      { src: 'images/city1.jpg', category: 'city', alt: '城市風景 1' },
      ...
    ]
    ```

---

## 4. 樣式實作

- 可直接複用現有 CSS，或改寫成 SFC 的 `<style scoped>`。
- 按鈕 `.active`、圖片 hover、畫廊 flex 排版、RWD 媒體查詢皆可沿用設計。

---

## 5. 主要程式碼範例

### App.vue
```vue
<template>
  <div>
    <FilterBar
      :categories="categories"
      :activeCategory="activeCategory"
      @update:category="activeCategory = $event"
    />
    <Gallery :images="images" :filter="activeCategory" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilterBar from './components/FilterBar.vue'
import Gallery from './components/Gallery.vue'

const categories = [
  { label: '全部圖片', value: 'all' },
  { label: '自然風景圖', value: 'nature' },
  { label: '城市風景圖', value: 'city' }
]
const activeCategory = ref('all')
const images = [
  { src: 'images/nature1.jpg', category: 'nature', alt: '自然風景 1' },
  { src: 'images/city1.jpg', category: 'city', alt: '城市風景 1' },
  // ...其餘圖片
]
</script>
```

### FilterBar.vue
```vue
<template>
  <nav class="filter-bar">
    <button
      v-for="cat in categories"
      :key="cat.value"
      :class="{ active: cat.value === activeCategory }"
      @click="$emit('update:category', cat.value)"
    >{{ cat.label }}</button>
  </nav>
</template>
<script setup>
defineProps(['categories', 'activeCategory'])
</script>
```

### Gallery.vue
```vue
<template>
  <ul class="gallery">
    <li v-for="img in filteredImages" :key="img.src" :data-category="img.category">
      <img :src="img.src" :alt="img.alt" />
    </li>
  </ul>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps(['images', 'filter'])
const filteredImages = computed(() =>
  props.filter === 'all'
    ? props.images
    : props.images.filter(img => img.category === props.filter)
)
</script>
```

### 樣式
可直接複製現有 d1397056.css 內容到各元件 `<style scoped>`。

---

## 6. 預期優點

- 結構模組化，利於維護與擴充。
- 狀態管理簡明，支援更多分類/圖片。
- 可輕鬆加入動畫、API串接或更多互動功能。

---

## 7. 進階建議

- 圖片資料可改由 API 動態取得。
- 支援更多分類、搜尋、分頁。
- 按鈕與畫廊可拆分更細元件。

---

如需完整範例程式碼或專案初始化教學，可再告知！