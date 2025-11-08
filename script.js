const typewriterElement = document.getElementById('typewriter');
const phrases = [
    "a SWS school student.",
    "a computer science enthusiast.",
    "aiming to become a doctor."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 60;
const pauseDelay = 1500;

function type() {
    if (!typewriterElement) {
        return;
    }
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, deletingSpeed);
        }
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, pauseDelay);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
}

function animateProgressBars(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                if (percent) {
                    bar.style.setProperty('--final-width', `${percent}%`);
                    bar.classList.add('animate-progress');
                }
            });
            observer.unobserve(entry.target);
        }
    });
}
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};
const languagesSection = document.getElementById('languages');
if (languagesSection) {
    const progressObserver = new IntersectionObserver(animateProgressBars, observerOptions);
    progressObserver.observe(languagesSection);
}

function setupInstagramButton() {
    const followBtn = document.getElementById('instagram-follow-btn');
    const instagramUrl = "https://www.instagram.com/definitely._sohan?igsh=MW1hbTFwdHFwZ3Vmag==";

    if (followBtn) {
        followBtn.addEventListener('click', () => {
            window.open(instagramUrl, '_blank');
            followBtn.textContent = "Followed!";
            followBtn.disabled = true;
            followBtn.classList.add('followed');
            followBtn.classList.remove('follow-btn');
        });
    }
}

const bgImages = ["bg.jpeg", "bg2.png", "bg3.jpg"]; 
let currentBgIndex = 0;

const faderElement = document.getElementById('background-fader'); 
const blackOverlay = document.getElementById('black-overlay');

const slideInterval = 5000; 

const overlayFadeDuration = 1000;


function cycleBackground() {
    if (!faderElement || !blackOverlay) {
        console.error("Background fader or black overlay element not found.");
        return;
    }

    blackOverlay.style.opacity = '1'; 

    setTimeout(() => {
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
        
        faderElement.style.backgroundImage = `url("${bgImages[currentBgIndex]}")`;

        blackOverlay.style.opacity = '0'; 

    }, overlayFadeDuration);
}


document.addEventListener('DOMContentLoaded', () => {
    if(phrases.length > 0) {
        setTimeout(type, 500);
    }
    
    setupInstagramButton();

    if (faderElement && blackOverlay) {
        faderElement.style.backgroundImage = `url("${bgImages[0]}")`;
        setInterval(cycleBackground, slideInterval);
    }
});