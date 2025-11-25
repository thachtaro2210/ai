module.exports = {
  // API Configuration
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  
  // Generation Config - TỐI ƯU ĐỂ TỐN ÍT TOKEN NHẤT
  GENERATION_CONFIG: {
    maxOutputTokens: 200,     // RẤT NGẮN = ÍT TOKEN NHẤT (~800 ký tự)
    temperature: 0.3,         // 0.3 = ngắn gọn, chính xác (0=chính xác, 1=sáng tạo)
    topP: 0.5,                // Giảm xuống = response ngắn hơn
    topK: 10                  // Giảm xuống = ít tùy chọn = response ngắn
  },
  
  // Server Config
  PORT: process.env.PORT || 3000,
  
  // SYSTEM PROMPT để giảm token
  SYSTEM_PROMPT: "Hãy trả lời ngắn gọn, chỉ cần thiết. Không dùng markdown, không dùng list, không dùng emoji.",
  
  // Các preset config khác:
  // ❌ TIÊU THỤ NHIỀU TOKEN:
  // maxOutputTokens: 2000, temperature: 1.0, topP: 0.95, topK: 40
  
  // ⚠️ BÌNH THƯỜNG:
  // maxOutputTokens: 500, temperature: 0.7, topP: 0.9, topK: 40
  
  // ✅ TỐI ƯU (ít token):
  // maxOutputTokens: 200, temperature: 0.3, topP: 0.5, topK: 10 (CẢI ĐẶT HIỆN TẠI)
  
  // 🚀 CỰC TIẾT KIỆM (rất ít token):
  // maxOutputTokens: 100, temperature: 0.1, topP: 0.3, topK: 5
};
