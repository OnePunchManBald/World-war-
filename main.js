// ===== スムーズスクロール =====
function scrollToGame() {
  document.getElementById("game").scrollIntoView({
    behavior: "smooth"
  });
}

// ===== フェードイン =====
const fades = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
  fades.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

// ===== 画面揺れ（砲撃） =====
function shakeScreen(power = 5, duration = 300) {
  const start = Date.now();

  function shake() {
    const now = Date.now();
    const elapsed = now - start;

    if (elapsed < duration) {
      const x = (Math.random() - 0.5) * power;
      const y = (Math.random() - 0.5) * power;
      document.body.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(shake);
    } else {
      document.body.style.transform = "";
    }
  }

  shake();
}

// ===== 定期的な遠距離砲撃 =====
setInterval(() => {
  if (Math.random() < 0.3) {
    shakeScreen(3, 200);
    playSound("explosion");
  }
}, 4000);

// ===== 音再生 =====
const sounds = {
  explosion: new Audio("explosion.mp3"),
  gun: new Audio("gun.mp3"),
  wind: new Audio("wind.mp3")
};

// 音をループ
sounds.wind.loop = true;
sounds.wind.volume = 0.3;
window.addEventListener("click", () => {
  sounds.wind.play();
}, { once: true });

function playSound(name) {
  const s = sounds[name].cloneNode();
  s.volume = 0.4;
  s.play();
}

// ===== マウスで砂ぼこり =====
document.addEventListener("mousemove", (e) => {
  const dust = document.createElement("div");
  dust.style.position = "fixed";
  dust.style.left = e.clientX + "px";
  dust.style.top = e.clientY + "px";
  dust.style.width = "6px";
  dust.style.height = "6px";
  dust.style.background = "rgba(200,170,100,0.4)";
  dust.style.borderRadius = "50%";
  dust.style.pointerEvents = "none";
  dust.style.zIndex = "999";

  document.body.appendChild(dust);

  setTimeout(() => {
    dust.style.transform = "translateY(-20px)";
    dust.style.opacity = "0";
    dust.style.transition = "1s";
  }, 10);

  setTimeout(() => {
    dust.remove();
  }, 1000);
});

// ===== タイピング風テキスト =====
function typeText(el, text, speed = 40) {
  let i = 0;
  el.textContent = "";

  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// 使用例
window.addEventListener("load", () => {
  const sub = document.querySelector(".subtitle");
  typeText(sub, "1917 — 命を懸けた戦場", 50);
});

// ===== スクロールで暗くする =====
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  document.body.style.backgroundColor =
    `rgb(${5 + y/20}, ${5 + y/25}, ${5 + y/30})`;
});