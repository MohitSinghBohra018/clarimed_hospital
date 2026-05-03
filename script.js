// 1. SELECT ELEMENTS
const track = document.getElementById('track');
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.hospital-card');
const cardWidth = 300; 
let currentPosition = 0;
let autoPlayInterval;

// 2. FILTER LOGIC
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // UI: Change active tab class
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) activeBtn.classList.remove('active');
    btn.classList.add('active');

    const selectedCity = btn.getAttribute('data-city');

    // Filter cards
    cards.forEach(card => {
      const cardLocation = card.getAttribute('data-location');
      if (selectedCity === 'All' || cardLocation === selectedCity) {
        card.style.display = 'block'; // Or 'flex' depending on your CSS
      } else {
        card.style.display = 'none';
      }
    });

    // CRITICAL: Reset position and clear interval to prevent jumping
    currentPosition = 0;
    track.style.transform = `translateX(0px)`;
    stopAutoPlay();
    startAutoPlay();
  });
});

// 3. SLIDER LOGIC
function moveSlider(direction) {
  // Only select cards that are currently visible
  const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
  
  if (visibleCards.length <= 1) return; // Don't slide if only 1 or 0 cards exist

  const maxMove = (visibleCards.length - 1) * cardWidth;

  if (direction === 1 && Math.abs(currentPosition) >= maxMove) {
    currentPosition = 0;
  } 
  else if (direction === -1 && currentPosition === 0) {
    currentPosition = -maxMove;
  } 
  else {
    currentPosition += (direction * -cardWidth);
  }

  track.style.transform = `translateX(${currentPosition}px)`;
}

// 4. AUTO-MOVE & HOVER LOGIC
function startAutoPlay() {
  // Only start if there's more than one visible card
  const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
  if (visibleCards.length > 1) {
    autoPlayInterval = setInterval(() => moveSlider(1), 3000);
  }
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopAutoPlay);
sliderContainer.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();



document.getElementById('toggle-btn').addEventListener('click', function() {
    const extraItems = document.querySelectorAll('.extra-content');
    const isHidden = extraItems[0].style.display === 'none';

    extraItems.forEach(item => {
        item.style.display = isHidden ? 'block' : 'none';
    });

    this.textContent = isHidden ? 'View Less Surgery' : 'View All Surgery';
});



// faqs
const items = document.querySelectorAll(".faq-item");
items.forEach(item => {
    item.querySelector(".faq-question").addEventListener("click", () => {
        // close all others (accordion behavior)
        items.forEach(i => {
            if (i !== item) i.classList.remove("active");
        });

        // toggle current
        item.classList.toggle("active");
    });
});



// pakage scipt

document.addEventListener("DOMContentLoaded", function() {
    const medSlider = document.getElementById('medSlider');
    const medNextBtn = document.getElementById('medNextBtn');
    const medPrevBtn = document.getElementById('medPrevBtn');
    const medDots = document.querySelectorAll('.med-pck-dot');

    const medCardWidth = 340; // Card width (320px) + gap (20px)
    let autoScrollInterval;

    // Scroll Functions
    function scrollNext() {
        if (medSlider.scrollLeft + medSlider.offsetWidth >= medSlider.scrollWidth - 10) {
            medSlider.scrollLeft = 0; // Loop back to start
        } else {
            medSlider.scrollLeft += medCardWidth;
        }
    }

    function scrollPrev() {
        medSlider.scrollLeft -= medCardWidth;
    }

    // Button Listeners
    medNextBtn.addEventListener('click', () => {
        scrollNext();
        resetTimer();
    });

    medPrevBtn.addEventListener('click', () => {
        scrollPrev();
        resetTimer();
    });

    // Auto-scroll Timer
    function startTimer() {
        autoScrollInterval = setInterval(scrollNext, 3000); // 3 seconds
    }

    function resetTimer() {
        clearInterval(autoScrollInterval);
        startTimer();
    }

    // Pause on Hover
    medSlider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    medSlider.addEventListener('mouseleave', startTimer);

    // Update Dots on Scroll
    medSlider.addEventListener('scroll', () => {
        let index = Math.round(medSlider.scrollLeft / medCardWidth);
        medDots.forEach((dot, i) => {
            dot.classList.toggle('med-pck-active', i === index);
        });
    });

    startTimer(); // Initialize
});


