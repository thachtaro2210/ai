const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Gemini API configuration
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE'; // Thay bằng key của bạn
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

app.use(express.json());

// Route để gửi câu hỏi tới Gemini
app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Vui lòng cung cấp câu hỏi' });
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: question
              }
            ]
          }
        ]
      }
    );

    const answer = response.data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      question: question,
      answer: answer
    });
  } catch (error) {
    console.error('Lỗi:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server đang chạy' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  console.log(`📝 POST http://localhost:${PORT}/ask để gửi câu hỏi`);
});
