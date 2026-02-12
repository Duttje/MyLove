const envelope = document.getElementById("envelope");
const landing = document.getElementById("landing");
const letter = document.getElementById("letter");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");
const pet = document.getElementById("pet");
const petSpeech = document.getElementById("petSpeech");
const dinner = document.getElementById("dinner");
const restaurantName = document.getElementById("restaurantName");
const mapLink = document.getElementById("mapLink");
const celebration = document.getElementById("celebration");
const letterCard = document.querySelector(".letter-card");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let petVisible = false;
let noClicks = 0;

/* Envelope → Letter */
envelope.addEventListener("click", () => {
    landing.classList.remove("active");
    setTimeout(() => letter.classList.add("active"), 400);
});

/* NO Button Logic */
noBtn.addEventListener("click", () => {
    noClicks++;
    if (!petVisible) showPet();
    else petSpeech.textContent = getPetMessage();

    noBtn.classList.remove("wiggle");
    void noBtn.offsetWidth;
    noBtn.classList.add("wiggle");

    if (noClicks < 4) {
        const currentX = parseInt(noBtn.dataset.move || 0);
        const newX = Math.min(currentX + 25, 120);
        noBtn.style.transform = `translateX(${newX}px)`;
        noBtn.dataset.move = newX;
    }

    if (noClicks === 4) {
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";
        setTimeout(() => noBtn.style.display = "none", 300);
        petSpeech.textContent = "No to your no. Only one option left!";
    }
});

/* YES Button Logic */
function fadeInMusic() {
    bgMusic.volume = 0;
    bgMusic.play();
    let volume = 0;
    const fade = setInterval(() => {
        if (volume < 1) { volume += 0.05; bgMusic.volume = volume; }
        else clearInterval(fade);
    }, 200);
}

yesBtn.addEventListener("click", () => {
    hint.textContent = "💗 Yay!";
    fadeInMusic();
    musicBtn.textContent = "Pause music 🎵";

    yesBtn.style.opacity = "0"; noBtn.style.opacity = "0";
    yesBtn.style.pointerEvents = "none"; noBtn.style.pointerEvents = "none";
    setTimeout(() => { yesBtn.style.display="none"; noBtn.style.display="none"; }, 400);

    if (!petVisible) showPet();

    setTimeout(() => {
        petSpeech.textContent = "He said: 'I love you.' 💕";
    }, 500);

    setTimeout(() => { celebrate(); }, 3500);
});

/* Koala */
function showPet() { petVisible = true; pet.classList.remove("hidden"); }
function getPetMessage() {
    const messages = ["That button feels a little shy...", "Hmm... maybe try the other one?", "I don’t think that’s the right choice 💕", "Your answer is putting me to sleep.", "Wake me up when you made the right choice."];
    return messages[Math.floor(Math.random() * messages.length)];
}

/* Celebration */
function celebrate() {
    celebration.classList.remove("hidden"); celebration.classList.add("fade-in");
    letterCard.classList.add("glow");
    if (petVisible) petSpeech.textContent = "A wise and beautiful decision, almost as beautiful as you. 💖🐨";

    for (let i=0;i<25;i++){
        const heart=document.createElement("div"); heart.classList.add("heart-confetti"); heart.textContent="💖";
        heart.style.left=Math.random()*90+"vw";
        heart.style.fontSize=(14+Math.random()*16)+"px";
        heart.style.animationDuration=(2.5+Math.random()*1.5)+"s";
        document.body.appendChild(heart);
        setTimeout(()=>heart.remove(),4000);
    }

    setTimeout(showDinnerReveal,3500);
}

/* Dinner Reveal */
function showDinnerReveal() {
    letter.classList.remove("active");
    setTimeout(() => {
        dinner.classList.add("active");

        const restaurant = "Restaurant Bougainville";
        mapLink.href = "https://www.restaurantbougainville.com/nl";
        restaurantName.textContent = restaurant;
        restaurantName.classList.add("show");

        // Slide in backgrounds sequentially
        slideInBackgrounds(); // slide in all 3 backgrounds
    }, 600);
}

/* Music Toggle */
musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) { bgMusic.play(); musicBtn.textContent="Pause music 🎵"; }
    else { bgMusic.pause(); musicBtn.textContent="Play music 🎵"; }
});

/* ---------------------------
   Slide-in backgrounds (three side-by-side)
---------------------------- */
function slideInBackgrounds() {
    const slides = [
        document.getElementById("background1"),
        document.getElementById("background2"),
        document.getElementById("background3")
    ];

    slides.forEach((slide, i) => {
        setTimeout(() => {
            slide.style.transform = "translateY(0)";
            slide.style.opacity = "1";
        }, i * 800); // stagger each by 0.8s
    });
}
