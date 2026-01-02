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





// COUNTDOWN TIMER
const targetDate = new Date("Jan 3, 2026 00:00:00").getTime();
const timerEl = document.getElementById("timer");

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


// Fade-in animation on scroll
const fadeElems = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

fadeElems.forEach(el => fadeObserver.observe(el));


// Envelope animation logic
window.addEventListener("load", () => {
  const envelope = document.getElementById("envelope");
  const btnOpen = document.getElementById("open");
  const btnReset = document.getElementById("reset");

  if (envelope && btnOpen && btnReset) {
    const openEnvelope = () => {
      envelope.classList.add("open");
      envelope.classList.remove("close");
    };

    const closeEnvelope = () => {
      envelope.classList.add("close");
      envelope.classList.remove("open");
    };

    envelope.addEventListener("click", openEnvelope);
    btnOpen.addEventListener("click", openEnvelope);
    btnReset.addEventListener("click", closeEnvelope);
  } else {
    console.error("Envelope or buttons not found in DOM");
  }
});

// Make sure DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

  // Get elements
  const inviteCard = document.getElementById("inviteCard");
  const toggleBtn = document.getElementById("toggleItinerary");
  const itinerary = document.getElementById("itinerary");

  // Flip card *only* when not clicking itinerary or save button
  inviteCard.addEventListener("click", (e) => {
    if (e.target.closest("#toggleItinerary") || e.target.closest(".save-btn")) {
      return; // don’t flip
    }
    inviteCard.classList.toggle("flipped");
  });

  // Expand/Collapse itinerary
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent card flip
    itinerary.classList.toggle("open");

    if (itinerary.classList.contains("open")) {
      toggleBtn.textContent = "Hide Itinerary ❌";
    } else {
      toggleBtn.textContent = "Full Itinerary 📋";
    }
  });

});




// Typing animation when love letter scrolls into view
const typedElems = document.querySelectorAll(".typed-letter");

const typeWriterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const fullText = el.getAttribute("data-text");
      let index = 0;
      el.textContent = "";

      const typeInterval = setInterval(() => {
        el.textContent += fullText.charAt(index);
        index++;
        if (index >= fullText.length) {
          clearInterval(typeInterval);
        }
      }, 25); // speed of typing

      observer.unobserve(el);
    }
  });
}, { threshold: 0.4 });

typedElems.forEach(el => {
  typeWriterObserver.observe(el);
});
