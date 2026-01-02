// FADE-IN ON SCROLL
const fadeElems = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

fadeElems.forEach(el => fadeObserver.observe(el));


// COUNTDOWN TIMER
const targetDate = new Date("Jan 3, 2026 00:00:00").getTime();
const timerEl = document.getElementById("timer");
const envelopeSection = document.getElementById("envelopeSection");

function updateTimer() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    timerEl.textContent = "HAPPY 2nd ANIBOBEBI! 🎉";
    if (!window.confettiDone) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
      window.confettiDone = true;

      // Show the envelope section now
envelopeSection.classList.remove("hidden");
envelopeSection.classList.add("visible");
    }
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  timerEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateTimer, 1000);





// ENVELOPE LOGIC
window.addEventListener("load", () => {
  const envelope = document.getElementById("envelope");
  const btnOpen = document.getElementById("open");
  const btnReset = document.getElementById("reset");

  // Initial state
  btnReset.style.display = "none";

  const openEnvelope = () => {
    envelope.classList.add("open");
    envelope.classList.remove("close");
    btnOpen.style.display = "none";
    btnReset.style.display = "inline-block";
  };

  const closeEnvelope = () => {
    envelope.classList.remove("open");
    envelope.classList.add("close");
    btnReset.style.display = "none";

    // Wait for close animation to finish before redirect
    setTimeout(() => {
      window.location.href = "index2.html";
    }, 800); // Adjust to match your close animation duration
  };

  if (envelope && btnOpen && btnReset) {
    envelope.addEventListener("click", openEnvelope);
    btnOpen.addEventListener("click", openEnvelope);
    btnReset.addEventListener("click", closeEnvelope);
  } else {
    console.error("Envelope or buttons not found in DOM");
  }


});




const bgMusic = document.getElementById("bgMusic");
const playBtn = document.getElementById("playPause");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

// Optional autoplay logic
window.addEventListener("load", () => {
  setTimeout(() => {
    bgMusic.volume = 0.35;
    bgMusic.play().then(() => {
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
    }).catch(() => {
      // user must press play due to browser policy
    });
  }, 800);
});

playBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    bgMusic.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
});
