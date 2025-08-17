const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Логин — всегда ошибка
app.post("/login", (req, res) => {
  res.status(401).json({ error: "Неверный пароль" });
});

// Регистрация — всегда отказ
app.post("/register", (req, res) => {
  res.status(403).json({ error: "Обратитесь к администратору для регистрации." });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
