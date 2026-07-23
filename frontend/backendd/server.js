const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Home Route
app.get("/", (req, res) => {
  res.send("BrainBuddyAI Backend is running 🚀");
});

// ---------------- CHAT ROUTE ----------------
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: question,
    });

    res.json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Chat Error:", error);

    res.status(500).json({
      answer: "Unable to generate response.",
    });
  }
});

// ---------------- QUIZ ROUTE ----------------
app.post("/quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
Generate 10 multiple-choice questions on "${topic}".

Rules:
- Each question should have 4 options (A, B, C, D)
- Mention the correct answer after each question.
- Make the questions suitable for college students.
`,
    });

    res.json({
      quiz: response.text,
    });
  } catch (error) {
    console.error("Quiz Error:", error);

    res.status(500).json({
      quiz: "Unable to generate quiz.",
    });
  }
});
// ---------------- NOTES SUMMARY ROUTE ----------------
app.post("/summary", async (req, res) => {
  console.log("Summary route called");
  try {
    const { notes } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
Summarize these notes in simple bullet points:

${notes}
`,
    });

    res.json({
      summary: response.text,
    });

  } catch (error) {
    console.error("Summary Error:", error);

    res.status(500).json({
      summary: "Unable to generate summary.",
    });
  }
});
// ---------------- STUDY PLANNER ROUTE ----------------
app.post("/planner", async (req, res) => {
  try {
    const { subject, days, hours } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
Create a personalized study plan.

Subject: ${subject}
Number of Days: ${days}
Study Hours Per Day: ${hours}

Instructions:
- Create a day-by-day study schedule.
- Mention what to study each day.
- Include a short revision session.
- Keep it simple and easy for a college student.
`,
    });

    res.json({
      plan: response.text,
    });

  } catch (error) {
    console.error("Planner Error:", error);

    res.status(500).json({
      plan: "Unable to generate study plan.",
    });
  }
});
// ---------------- IMAGE ANALYZER ROUTE ----------------
app.post("/analyze-image", upload.single("image"), async (req, res) => {
  console.log(req.file);
console.log(req.body);
  try {
    if (!req.file) {
      return res.status(400).json({
        result: "No image uploaded.",
      });
    }

    const imageBytes = fs.readFileSync(req.file.path);

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [
        {
          text: "Analyze this image in detail. Describe what you see, identify objects, summarize any text if present, and explain it in simple language."
        },
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: imageBytes.toString("base64"),
          },
        },
      ],
    });

    fs.unlinkSync(req.file.path);

    res.json({
      result: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      result: "Unable to analyze image.",
    });
  }
});
// Start Server
const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});