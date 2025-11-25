require('dotenv').config();
const express = require('express');
const axios = require('axios');
const config = require('./config');

const app = express();
const PORT = config.PORT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = config.GEMINI_API_URL;

if (!GEMINI_API_KEY) {
  console.error('❌ Lỗi: GEMINI_API_KEY không được tìm thấy trong .env');
  process.exit(1);
}

app.use(express.json());

// Route để gửi câu hỏi tới Gemini
app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Vui lòng cung cấp câu hỏi (question)' });
    }

    console.log(`📤 Gửi câu hỏi: ${question}`);

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        system_instruction: {
          parts: {
            text: config.SYSTEM_PROMPT
          }
        },
        contents: [
          {
            parts: [
              {
                text: question
              }
            ]
          }
        ],
        generationConfig: config.GENERATION_CONFIG
      }
    );

    const answer = response.data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      question: question,
      answer: answer,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Lỗi:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server đang chạy',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  console.log(`📝 POST http://localhost:${PORT}/ask để gửi câu hỏi`);
  console.log(`✅ Health check: GET http://localhost:${PORT}/health`);
});
