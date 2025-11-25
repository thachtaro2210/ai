# Hướng Dẫn Test với Postman

## 1. Cài đặt dependencies
```bash
npm install
```

## 2. Chạy server
```bash
node gemini-server-env.js
```

Hoặc với nodemon (auto reload):
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

---

## 3. Test với Postman

### A. Health Check
**Method:** GET  
**URL:** `http://localhost:3000/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Server đang chạy",
  "timestamp": "2025-11-25T10:30:45.123Z"
}
```

---

### B. Gửi câu hỏi tới Gemini

**Method:** POST  
**URL:** `http://localhost:3000/ask`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "question": "Hãy giải thích về AI là gì?"
}
```

**Response Example:**
```json
{
  "success": true,
  "question": "Hãy giải thích về AI là gì?",
  "answer": "AI (Artificial Intelligence) là trí tuệ nhân tạo...",
  "timestamp": "2025-11-25T10:30:45.123Z"
}
```

---

## 4. Các câu hỏi test khác

### Ví dụ 1: Toán học
```json
{
  "question": "2 + 2 bằng bao nhiêu?"
}
```

### Ví dụ 2: Lập trình
```json
{
  "question": "Làm sao để viết hàm fibonacci trong JavaScript?"
}
```

### Ví dụ 3: Đa dòng
```json
{
  "question": "Viết một bài thơ ngắn về mùa xuân"
}
```

---

## 5. Các lỗi thường gặp

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-----------|----------|
| 400 Bad Request | Không gửi `question` | Thêm `question` vào body |
| 401 Unauthorized | API Key sai | Kiểm tra `.env` file |
| 429 Too Many Requests | Vượt quota | Chờ một lúc rồi thử lại |
| 500 Internal Server Error | Lỗi server | Xem console log |

---

## 6. Thay đổi model Gemini

Hiện tại dùng: `gemini-2.5-flash`

Có thể thay bằng:
- `gemini-1.5-flash` (nhanh hơn)
- `gemini-1.5-pro` (chất lượng cao hơn, chậm hơn)
- `gemini-2.5-pro` (mới nhất, chất lượng tốt nhất)

Sửa trong file `gemini-server-env.js`:
```javascript
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
```

---

## 7. Cài đặt bổ sung (Optional)

Cài đặt `dotenv` để quản lý environment variables:
```bash
npm install dotenv
```

Cài đặt `nodemon` để auto reload khi có thay đổi:
```bash
npm install --save-dev nodemon
```
