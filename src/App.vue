<template>
  <div class="login-container">
    <!-- ⭐ Звёзды -->
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>

    <!-- 🌍 Земля -->
    <div class="earth">
      <div class="continents"></div>
    </div>
    <div class="earth-glow"></div>

    <!-- 🌙 Луна -->
    <div class="moon-orbit">
      <div class="moon"></div>
    </div>

    <!-- 🌠 Метеоры -->
    <div class="meteors">
      <div v-for="meteor in meteors"
           :key="meteor.id"
           class="meteor"
           :style="{
             top: meteor.top + 'vh',
             left: meteor.left + 'vw',
             animationDuration: meteor.duration + 's',
             '--rotate': meteor.angle + 'deg'
           }"
           @animationend="removeMeteor(meteor.id)">
      </div>
    </div>

    <!-- 💻 Логин -->
    <div class="login-box">
      <h2>🚀 Вход</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Логин" required />
        <input type="password" v-model="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
      <button class="register-btn" @click="register">Регистрация</button>
      <p v-if="message" class="error">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import bcrypt from "bcryptjs";
const saltRounds = 10;

const username = ref("");
const password = ref("");
const message = ref("");

// Метеоры
const meteors = ref([]);
const removeMeteor = (id) => {
  meteors.value = meteors.value.filter(m => m.id !== id);
};
const createMeteor = () => {
  const id = Date.now() + Math.random();
  const angle = 30 + Math.random() * 30;
  meteors.value.push({
    id,
    top: Math.random() * 30,
    left: 20 + Math.random() * 60,
    duration: 1.5 + Math.random() * 1.5,
    angle,
  });
};

onMounted(() => {
  setInterval(() => {
    const count = Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) createMeteor();
  }, 3000);

  // ⚡ Title
  document.title = "Админ-панель 🚀";

  // ⚡ Favicon с emoji 🌌
  const link = document.createElement("link");
  link.rel = "icon";
  link.href =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text y=".9em" font-size="90">🌌</text>
      </svg>`
    );
  document.head.appendChild(link);
});

// honeypot логика
const login = async () => {
  try {
    const passwordHash = await bcrypt.hash(password.value, saltRounds);
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value, password: passwordHash }),
    });
    const data = await res.json();
    message.value = data.error || "Неизвестная ошибка";
  } catch {
    message.value = "Ошибка соединения с сервером";
  }
};
const register = async () => {
  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value }),
    });
    const data = await res.json();
    message.value = data.error || "Неизвестная ошибка";
  } catch {
    message.value = "Ошибка соединения с сервером";
  }
};
</script>

<style>
/* 🌌 Глобально — ОБЯЗАТЕЛЬНО без scoped */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: initial !important;
  display: flex;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Контейнер сцены */
.login-container {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ⭐ Звёзды */
.stars, .stars2, .stars3 {
  position: absolute;
  width: 1px;
  height: 1px;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 0;
}

.stars {
  box-shadow: 100px 200px white, 300px 400px white, 250px 600px white,
              800px 120px white, 1200px 700px white, 1700px 300px white,
              1400px 900px white, 500px 1100px white;
  animation: blink 4s infinite alternate;
}

.stars2 {
  box-shadow: 150px 100px white, 600px 500px white, 700px 800px white,
              1300px 200px white, 1600px 600px white;
  animation: blink 6s infinite alternate;
}

.stars3 {
  box-shadow: 400px 300px white, 900px 700px white, 1000px 400px white,
              1800px 500px white;
  animation: blink 8s infinite alternate;
}

/* Мерцание */
@keyframes blink {
  from { opacity: 0.3; }
  to   { opacity: 1; }
}

/* 🌍 Земля */
.earth {
  position: absolute; bottom:-15vh; left:50%; transform:translateX(-50%);
  width:40vw; height:40vw; border-radius:50%;
  background: radial-gradient(circle at 30% 30%, #3a9bdc, #0a2f66 80%);
  z-index: 0;
  box-shadow: inset -5vw -5vw 10vw rgba(0,0,0,0.7);
  animation: rotateEarth 120s linear infinite;
  overflow: hidden;
}
.continents {
  position:absolute; width:100%; height:100%; border-radius:50%;
  background: radial-gradient(circle at 40% 40%, rgba(34,139,34,0.6) 0 30%, transparent 40%),
              radial-gradient(circle at 60% 20%, rgba(139,69,19,0.5) 0 25%, transparent 35%);
  filter: blur(1vw); animation: drift 300s linear infinite;
}
.earth-glow {
  position: absolute; bottom: -18vh; left: 50%; transform: translateX(-50%);
  width: 45vw; height: 45vw; border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(58,155,220,0.3), transparent 70%);
  z-index: 0; filter: blur(3vw);
}
@keyframes rotateEarth { from {transform:translateX(-50%) rotate(0);} to {transform:translateX(-50%) rotate(360deg);} }
@keyframes drift { 0%{transform:scale(1);} 50%{transform:scale(1.05);} 100%{transform:scale(1);} }

/* 🌙 Луна */
.moon-orbit {
  position:absolute; bottom:10vh; left:50%;
  width:70vw; height:70vw; margin-left:-35vw; margin-bottom:-35vw;
  border-radius:50%; animation:orbit 60s linear infinite; z-index:1;
}
.moon {
  position:absolute; top:50%; left:0; transform:translateY(-50%);
  width:5vw; height:5vw; border-radius:50%;
  background:radial-gradient(circle at 30% 30%, #ddd, #888);
  box-shadow: inset -1vw -1vw 2vw rgba(0,0,0,0.5), 0 0 2vw rgba(255,255,255,0.3);
}
@keyframes orbit { from{transform:rotate(0);} to{transform:rotate(360deg);} }

/* 🌠 Метеоры */
.meteors { position:absolute; width:100%; height:100%; top:0; left:0; z-index:2; }
.meteor {
  position:absolute;
  width: .6vw; height: .6vw; border-radius: 50%;
  background: white;
  box-shadow: 0 0 6px 2px rgba(255,255,255,0.9),
              -1vw -1vw 3vw rgba(255,255,255,0.5);
  transform: rotate(var(--rotate, 45deg));
  animation: shoot linear forwards;
}
@keyframes shoot {
  0%   { opacity:0; transform:translate(0,0) rotate(var(--rotate,45deg)) scale(1);}
  10%  { opacity:1; }
  100% { opacity:0; transform:translate(-80vw,80vh) rotate(var(--rotate,45deg)) scale(0.8);}
}

/* 💻 Логин */
.login-box {
  position:relative; z-index:5; background:rgba(0,0,0,0.6);
  padding:30px; border-radius:12px; width:300px; text-align:center; color:white;
}
.login-box input {
  width:90%; margin:10px auto; padding:10px;
  border-radius:6px; border:none;
}
button {
  margin-top:10px; padding:10px; width:100%;
  background:#4CAF50; border:none; border-radius:6px; color:white; cursor:pointer;
}
button:hover { background:#45a049; }
.register-btn { background:#2196F3; }
.register-btn:hover { background:#1976D2; }
.error { color:#ff5252; margin-top:15px; }

/* 📱 Адаптив */
@media (max-width: 768px) {
  .earth { width: 60vw; height: 60vw; bottom:-10vh; }
  .moon { width:8vw; height:8vw; }
  .login-box { width:80%; padding:20px; font-size:14px; }
}
@media (max-width:480px) {
  .earth { width:75vw; height:75vw; bottom:-8vh; }
  .moon { width:10vw; height:10vw; }
  .login-box { width:85%; padding:15px; font-size:13px; }
}
</style>
