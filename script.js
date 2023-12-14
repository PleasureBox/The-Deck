let items = document.querySelectorAll('.slider .item');
let active = 0; // initial card

// Show surrounding cards 
function loadShow(){
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    let stt = 0;
    for(var i = active + 1; i < items.length; i ++){
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
     stt = 0;
    for(var i = (active - 1); i >= 0; i --){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    // Hide/show prev and next buttons based on active index
    document.getElementById('prev').style.display = active === 0 ? 'none' : 'block';
    document.getElementById('next').style.display = active === items.length - 1 ? 'none' : 'block';
}
loadShow();

// Slide cards
let next = document.getElementById('next');
next.onclick = function(){
   active = active + 1 < items.length ?  active + 1 : active;
   loadShow();
}

let prev = document.getElementById('prev');
prev.onclick = function(){
    active = active - 1 >= 0 ? active -1 : active;
    loadShow();
}

let slider = document.querySelector('.slider');

// Mobile Swipe
let touchStartX, swipeDistance;
let swipeHandled = false;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    swipeHandled = false;
});

slider.addEventListener('touchmove', (e) => {
    let touchEndX = e.touches[0].clientX;
    swipeDistance = touchEndX - touchStartX;

    if (!swipeHandled && swipeDistance > 20) {
        // Swipe right
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
        swipeHandled = true;
      } else if (!swipeHandled && swipeDistance < -20) {
        // Swipe left
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
        swipeHandled = true;
      }
});

// Desktop Swipe
slider.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
});

slider.addEventListener('mouseup', (e) => {
    let mouseEndX = e.clientX;
    let swipeDistance = mouseEndX - mouseStartX;

    if (swipeDistance > 20) {
        // Swipe right
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    } else if (swipeDistance < -20) {
        // Swipe left
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
});

function pickRandomCard() {
    const randomIndex = Math.floor(Math.random() * items.length);
    const targetIndex = randomIndex;
    const direction = targetIndex > active ? 1 : -1;

    const scrollDelay = 100; // Adjust the duration of each step (in milliseconds)
    const steps = Math.abs(targetIndex - active);

    let stepCount = 0;

    function performStep() {
        if (stepCount < steps) {
            active += direction;
            loadShow();
            stepCount++;
            setTimeout(performStep, scrollDelay);
        }
    }

    performStep();
}