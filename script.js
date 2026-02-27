const toggle = document.getElementById("toggle");
const body   = document.body;
const cloud  = document.getElementById("cloud");
const comet  = document.getElementById("comet");

let cloudTimer, cometTimer;

/* Restore theme */
if (localStorage.getItem("theme") === "night") {
  toggle.classList.replace("day","night");
  body.classList.add("dark");
  startComet();
} else {
  startCloud();
}

/* Toggle click */
toggle.onclick = () => {
  const night = toggle.classList.toggle("night");
  toggle.classList.toggle("day");
  body.classList.toggle("dark");

  localStorage.setItem("theme", night ? "night" : "day");

  night ? (stopCloud(), startComet())
        : (stopComet(), startCloud());
};

/* ☁️ Cloud — every 30s */
function startCloud() {
  stopCloud();
  moveCloud();
  cloudTimer = setInterval(moveCloud, 30000);
}
function moveCloud() {
  cloud.style.transition = "none";
  cloud.style.transform = "translateX(0)";
  requestAnimationFrame(() => {
    cloud.style.transition = "transform 9s linear";
    cloud.style.transform = "translateX(170px)";
  });
}
function stopCloud() {
  clearInterval(cloudTimer);
}

/* 🌠 Comet — every 30s (night only) */
function startComet() {
  stopComet();
  launchComet();
  cometTimer = setInterval(launchComet, 30000);
}
function launchComet() {
  comet.style.transition = "none";
  comet.style.opacity = 1;
  comet.style.transform = "translate(0,0) rotate(-18deg)";
  requestAnimationFrame(() => {
    comet.style.transition = "transform 2.6s linear, opacity .6s";
    comet.style.transform = "translate(200px,6px) rotate(-18deg)";
    setTimeout(() => comet.style.opacity = 0, 1600);
  });
}
function stopComet() {
  clearInterval(cometTimer);
  comet.style.opacity = 0;
}