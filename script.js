document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const dayBtn = document.querySelector(".playlist-item-day");
  const nightBtn = document.querySelector(".playlist-item-night");

  dayBtn.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.remove("theme-night");
    body.classList.add("theme-day");
  });

  nightBtn.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.remove("theme-day");
    body.classList.add("theme-night");
  });

  const DAY_VOL = 0.4;
  const NIGHT_VOL = 1.0;

  function applyThemeVolume(audio) {
    if (document.body.classList.contains("theme-day")) {
      audio.volume = DAY_VOL;
    } else {
      audio.volume = NIGHT_VOL;
    }
  }
  document.querySelectorAll(".playlist-card").forEach(card => {
    const audio = card.querySelector("audio.track");
    const btn = card.querySelector(".play-button");
    if (!audio || !btn) return;
  
    btn.addEventListener("click", () => {
      if (audio.getAttribute("src") === "audio/what-is-love-audio.mp3") {
        audio.volume = 0.45;
      } else {
        applyThemeVolume(audio);
      }
    });
  });
  
  document.querySelectorAll(".play-button").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".playlist-card");
      const audio = card.querySelector("audio.track");
      const icon = button.querySelector("i");
  
      const isPlaying = !audio.paused;
  
      document.querySelectorAll("audio.track").forEach((a) => a.pause());
      document.querySelectorAll(".playlist-card").forEach((c) => c.classList.remove("active"));
      document.querySelectorAll(".play-button i").forEach((i) => {
        i.classList.add("fa-play");
        i.classList.remove("fa-pause");
      });
  
      if (isPlaying) return;
  
      card.classList.add("active");
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
      audio.play();
    });
  });

  document.querySelectorAll(".play-button").forEach(button => {
    const tooltip = document.createElement("div");
    tooltip.className = "comment";
    tooltip.textContent = button.dataset.comment ? button.dataset.comment : "";
  
    button.appendChild(tooltip);
  
    button.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
    });
  
    button.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
});