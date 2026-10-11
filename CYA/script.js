const proposal = document.querySelector("#proposal");
const celebration = document.querySelector("#celebration");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const restartButton = document.querySelector("#restart-button");
const confettiLayer = document.querySelector("#confetti-layer");
const today = document.querySelector("#today");
const heartsLayer = document.querySelector("#hearts");
const clickHeartsLayer = document.querySelector("#click-hearts");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let noAttempt = 0;

function addFloatingHearts() {
  if (reduceMotion.matches) return;

  const heartSymbols = ["♥", "♡", "❤"];
  for (let index = 0; index < 24; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = heartSymbols[index % heartSymbols.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--size", `${10 + Math.random() * 20}px`);
    heart.style.setProperty("--duration", `${12 + Math.random() * 15}s`);
    heart.style.setProperty("--delay", `${Math.random() * 18}s`);
    heart.style.setProperty("--sway", `${Math.random() * 80 - 40}px`);
    heartsLayer.append(heart);
  }
}

today.textContent = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

function celebrate() {
  popHeartsFromYesButton();
  proposal.hidden = true;
  celebration.hidden = false;
  celebration.classList.add("celebration--entering");
  launchConfetti();
  window.setTimeout(() => {
    celebration.classList.remove("celebration--entering");
  }, 1500);
}

function launchConfetti() {
  const colors = ["#e94259", "#ff7181", "#ffd3d8", "#e6c89a", "#c52f47"];
  const symbols = ["♥", "✿", "❤", "✧"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 110; index += 1) {
    const piece = document.createElement("span");
    piece.className = `confetti-piece${index % 3 === 0 ? " confetti-piece--flower" : ""}`;
    if (index % 3 === 0) piece.textContent = symbols[index % symbols.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--size", `${5 + Math.random() * 7}px`);
    piece.style.setProperty("--color", colors[index % colors.length]);
    piece.style.setProperty("--duration", `${2.4 + Math.random() * 2.4}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.75}s`);
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.setProperty("--spin", `${Math.random() * 900 - 450}deg`);
    fragment.append(piece);
  }

  confettiLayer.replaceChildren(fragment);
  window.setTimeout(() => confettiLayer.replaceChildren(), 5500);
}

function playfullyDecline() {
  noAttempt += 1;
  const maxScale = window.matchMedia("(max-width: 520px)").matches ? 1.34 : 1.6;
  const scale = Math.min(1 + noAttempt * 0.14, maxScale);

  yesButton.style.setProperty("--yes-scale", scale);
  popHeartsFromYesButton();
}

function popHeartsFromYesButton() {
  if (reduceMotion.matches) return;

  const buttonRect = yesButton.getBoundingClientRect();
  const symbols = ["♥", "♡", "❤"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 7; index += 1) {
    const heart = document.createElement("span");
    heart.className = "click-heart";
    heart.textContent = symbols[index % symbols.length];
    heart.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    heart.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
    heart.style.setProperty("--x", `${Math.random() * 150 - 75}px`);
    heart.style.setProperty("--y", `${-25 - Math.random() * 95}px`);
    heart.style.setProperty("--rotation", `${Math.random() * 70 - 35}deg`);
    fragment.append(heart);
  }

  clickHeartsLayer.append(fragment);
  window.setTimeout(() => clickHeartsLayer.replaceChildren(), 1000);
}

yesButton.addEventListener("click", celebrate);
noButton.addEventListener("click", playfullyDecline);

restartButton.addEventListener("click", () => {
  celebration.hidden = true;
  celebration.classList.remove("celebration--entering");
  proposal.hidden = false;
  confettiLayer.replaceChildren();
  yesButton.style.removeProperty("--yes-scale");
  noAttempt = 0;
});

addFloatingHearts();
