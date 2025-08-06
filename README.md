# 電影探索家 (Movie Explorer)

一個可搜尋電影、檢視詳細資訊並收藏喜愛電影的互動式電影探索平台，串接 OMDb API 並搭配 Vercel Serverless Function 隱藏後端 API Key。提供類似 IMDb 的瀏覽體驗，支援分頁與 RWD 響應式設計。

---

## ✨ 功能特色

- 電影搜尋：輸入關鍵字查詢電影，每頁顯示 30 筆資料，支援換頁。
- 收藏功能：可將電影加入收藏，瀏覽「我的收藏」頁面。
- 電影詳細頁：呈現 IMDb 評分、導演、演員、劇情等資訊。
- 響應式設計：支援手機、平板與桌面裝置。

---

## 🛠️ 技術棧

| 類別     | 使用技術                                            |
| -------- | --------------------------------------------------- |
| 前端框架 | React                                               |
| 路由管理 | React Router v7                                     |
| 狀態管理 | Zustand + LocalStorage（收藏電影資料持久化）        |
| 樣式工具 | Tailwind CSS、Remix Icon                            |
| 分頁控制 | react-paginate                                      |
| 資料串接 | RESTful API（[OMDb API](https://www.omdbapi.com/)） |
| API 隱藏 | Vercel Serverless Function proxy                    |
| UI 元件  | react-rating、react-spinners                        |
| 開發工具 | Vite、ESLint                                        |
| 部署平台 | Vercel                                              |

---

## 🧩 自訂 Hook / Store 一覽

| Hook 名稱      | 功能說明                                                |
| -------------- | ------------------------------------------------------- |
| `useFavorites` | 使用 Zustand 儲存收藏電影資料，支援新增、移除、查詢功能 |

---

## 🌐 API 串接說明

### 🔍 搜尋電影

- API 位置：`/api/search-movies`（開發階段使用 `https://www.omdbapi.com/`）
- 傳入參數：`q`（關鍵字）、`page`（頁碼）
- 回傳格式：

```json
{
  "Search": [
    { "Title": "...", "Year": "...", "imdbID": "...", ... },
    ...
  ],
  "totalResults": "xxx",
  "Response": "True"
}
```

### 🎬 查詢電影詳細資訊

- API 位置：`/api/movie-detail`（開發階段使用 `https://www.omdbapi.com/`）
- 傳入參數：`id`（電影 IMDb ID）
- 回傳資料包含：`Title`、`Year`、`Actors`、`Plot`、`Poster`、`imdbRating` 等

> 註：正式環境使用 `/api/xxx` 透過 Vercel Serverless Function 代理，避免洩漏 API Key

---

## ⚙️ 安裝步驟

```bash
# 1. 複製專案
git clone https://github.com/wanuii/movie-explorer.git

# 2. 進入目錄
cd movie-explorer

# 3. 安裝依賴
npm install

# 4. 設定環境變數
cp .env.example .env
# 並加入你的 OMDb API Key
VITE_OMDB_API_KEY=your_api_key_here
```

---

## ▶️ 開發 & 執行

```bash
# 啟動開發伺服器
npm run dev

# 打包部署用靜態檔案
npm run build

# 預覽本地打包結果
npm run preview
```

---

## 📦 部署

已部署至 Vercel，並透過 `/api/search-movies` 與 `/api/movie-detail` 中介後端請求，隱藏 API Key。

---

## 🔗 參考資源

- [OMDb API 官方文件](http://www.omdbapi.com/)
- [Zustand 狀態管理](https://docs.pmnd.rs/zustand/introduction)
- [React Router v7](https://reactrouter.com/en/main)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)

---

## 網頁展示

<https://movie-explorer-psi-three.vercel.app/>
