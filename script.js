// Programme data with content for each program
const programmeData = {
  bdesign: {
    title: "B.Design",
    description:
      "Combining modern innovation with timeless design principles, our Bachelor of Design program offers an immersive, interdisciplinary curriculum that spans UX/UI, communication design, product, fashion, and interior architecture.",
    image: "./imgs/design-student.png",
  },
  bba: {
    title: "BBA Entrepreneurship",
    description:
      "Ideal for students who want to land management roles and found startups of their own, our Makers Undergrad – BBA in Entrepreneurship, is India's 1st Undergraduate Program at the confluence of Business, Entrepreneurship, and Technology.",
    image: "./imgs/BBA-Makers.png",
  },
  psychology: {
    title: "BSc. Hons - Psychology",
    description:
      "Our B.Sc in Psychology is a retake on conventional psychology that amalgamates academia, industry exposure, with a unique Indic perspective. Learn through hands-on learning through two paid internships, industrial visits, and practical fieldwork.",
    image: "./imgs/Psychology.png",
  },
  "btech-ai": {
    title: "B. Tech - CS & AI",
    description:
      "Designed in collaboration with the Newton School of Technology (NST), our B.Tech in Computer Science and Artificial Intelligence, blends theoretical depth with practical, hands-on expertise focusing on AI, machine learning, and data science.",
    image: "./imgs/B.Tech.png",
  },
  "btech-ds": {
    title: "B. Tech CS & Data Science",
    description:
      "Co-created with KPMG in India, our B.Tech CS & Data Science, combines business strategy with the power of data analytics. Learn predictive modeling, data visualization, business intelligence, and other skills to make data-driven decisions.",
    image: "./imgs/B.Tech-Data-Science.png",
  },
  phd: {
    title: "Ph.D",
    description:
      "The Doctoral program at Rishihood aims to nurture researchers and provide them a platform to pursue their ideas and work on them further in guided collaboration with faculty members of the university.",
    image: "./imgs/Ph.D.png",
  },
};

// Function to update programme content
function updateProgrammeContent(programmeKey) {
  const data = programmeData[programmeKey];

  // Update title
  const titleElement = document.querySelector(".programme-name");
  titleElement.textContent = data.title;

  // Update description
  const descriptionElement = document.querySelector(".programme-description");
  descriptionElement.textContent = data.description;

  // Update image
  const imageElement = document.querySelector(".programme-image img");
  imageElement.src = data.image;
  imageElement.alt = data.title;
}

document.querySelectorAll("img").forEach((img) => {
  img.setAttribute("draggable", "false");
});

// Add click event listeners to all programme tabs
document.addEventListener("DOMContentLoaded", function () {
  // Generate mobile programme cards dynamically
  const mobileCardsContainer = document.querySelector(
    ".mobile-programme-cards"
  );
  if (mobileCardsContainer) {
    const programmeKeys = [
      "bdesign",
      "bba",
      "psychology",
      "btech-ai",
      "btech-ds",
      "phd",
    ];

    programmeKeys.forEach((key) => {
      const data = programmeData[key];
      const card = document.createElement("div");
      card.className = "programme-card";
      card.innerHTML = `
                <div class="programme-image">
                    <img src="${data.image}" alt="${data.title}">
                </div>
                <div class="programme-content">
                    <h3 class="programme-name">${data.title}</h3>
                    <div class="divider"></div>
                    <p class="programme-description">${data.description}</p>
                    <button class="know-more-btn">Know More</button>
                </div>
            `;
      mobileCardsContainer.appendChild(card);
    });
  }

  const programmeTabs = document.querySelectorAll(".programme-tab");

  programmeTabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      programmeTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Map index to programme key
      const programmeKeys = [
        "bdesign",
        "bba",
        "psychology",
        "btech-ai",
        "btech-ds",
        "phd",
      ];
      const programmeKey = programmeKeys[index];

      // Update content
      updateProgrammeContent(programmeKey);
    });
  });

  // Startup cards functionality - Click to expand/collapse (disabled on mobile)
  const startupCards = document.querySelectorAll(".startup-card");
  const isMobile = () => window.innerWidth <= 768;

  // Auto rotation logic
  let startupInterval;

  function stopStartupRotation() {
    if (startupInterval) {
      clearInterval(startupInterval);
      startupInterval = null;
    }
  }

  // Startup Navigation Arrows
  const prevStartupArrow = document.querySelector(".prev-startup-arrow");
  const nextStartupArrow = document.querySelector(".next-startup-arrow");
  let updateStartupArrows = () => { };

  if (prevStartupArrow && nextStartupArrow) {
    updateStartupArrows = function () {
      const activeCard = document.querySelector(".startup-card.active");
      if (!activeCard) return;

      // Check if prev/next siblings exist and are startup cards
      const prevCard = activeCard.previousElementSibling;
      const nextCard = activeCard.nextElementSibling;

      const hasPrev = prevCard && prevCard.classList.contains("startup-card");
      const hasNext = nextCard && nextCard.classList.contains("startup-card");

      prevStartupArrow.disabled = !hasPrev;
      nextStartupArrow.disabled = !hasNext;
    };

    // Initial check
    updateStartupArrows();
  }

  function startStartupRotation() {
    stopStartupRotation();
    if (isMobile()) return;

    startupInterval = setInterval(() => {
      const activeCard = document.querySelector(".startup-card.active");
      if (!activeCard) return;

      let nextCard = activeCard.nextElementSibling;
      // Find next startup card
      while (nextCard && !nextCard.classList.contains("startup-card")) {
        nextCard = nextCard.nextElementSibling;
      }

      // Loop back to first if no next card
      if (!nextCard) {
        nextCard = startupCards[0];
      }

      if (nextCard) {
        activeCard.classList.remove("active");
        nextCard.classList.add("active");
        updateStartupArrows();
      }
    }, 3000);
  }

  startupCards.forEach((card) => {
    card.addEventListener("click", function () {
      // On mobile clicking should do nothing
      if (isMobile()) return;

      stopStartupRotation();

      // Remove active class from all cards
      startupCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked card
      this.classList.add("active");
      updateStartupArrows();

      startStartupRotation();
    });
  });

  if (prevStartupArrow && nextStartupArrow) {
    prevStartupArrow.addEventListener("click", () => {
      if (isMobile()) return;
      stopStartupRotation();
      const activeCard = document.querySelector(".startup-card.active");
      if (activeCard && activeCard.previousElementSibling && activeCard.previousElementSibling.classList.contains("startup-card")) {
        activeCard.classList.remove("active");
        activeCard.previousElementSibling.classList.add("active");
        updateStartupArrows();
      }
      startStartupRotation();
    });

    nextStartupArrow.addEventListener("click", () => {
      if (isMobile()) return;
      stopStartupRotation();
      const activeCard = document.querySelector(".startup-card.active");
      if (activeCard && activeCard.nextElementSibling && activeCard.nextElementSibling.classList.contains("startup-card")) {
        activeCard.classList.remove("active");
        activeCard.nextElementSibling.classList.add("active");
        updateStartupArrows();
      }
      startStartupRotation();
    });
  }

  // Ensure all startup cards are active on mobile (so clicking doesn't change anything)
  function updateStartupActiveState() {
    if (isMobile()) {
      stopStartupRotation();
      startupCards.forEach((c) => c.classList.add("active"));
    } else {
      // On desktop, keep first card active by default if multiple are active
      const activeCards = document.querySelectorAll(".startup-card.active");
      if (activeCards.length !== 1) {
        startupCards.forEach((c) => c.classList.remove("active"));
        if (startupCards[0]) startupCards[0].classList.add("active");
      }
      updateStartupArrows();
      startStartupRotation();
    }
  }
  updateStartupActiveState();

  // Re-apply when resizing
  window.addEventListener("resize", () => {
    // debounce
    clearTimeout(window._startupResizeTimer);
    window._startupResizeTimer = setTimeout(updateStartupActiveState, 150);
  });

  // Testimonial cards functionality - Click to expand/collapse
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );



  // Testimonial navigation arrows - support desktop carousel and mobile scroll-snap
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  if (prevArrow && nextArrow && testimonialsContainer) {
    let currentStartIndex = 0;
    let visibleCards = window.innerWidth < 1400 ? 2 : 3; // desktop: show 2 or 3 cards depending on width
    const totalCards = testimonialCards.length;
    let autoSlideInterval;

    // Desktop carousel behavior (hide/show cards)
    function updateCarousel() {
      // Calculate which indices are visible
      const visibleIndices = [];
      for (let i = 0; i < visibleCards; i++) {
        visibleIndices.push((currentStartIndex + i) % totalCards);
      }

      testimonialCards.forEach((card, index) => {
        if (visibleIndices.includes(index)) {
          card.style.display = "flex";
          // Calculate order: relative to currentStartIndex
          // We want the card at currentStartIndex to be 0, next 1, etc.
          card.style.order = (index - currentStartIndex + totalCards) % totalCards;
        } else {
          card.style.display = "none";
        }

        // Remove active class
        card.classList.remove("active");
      });

      // Activate the current start card
      if (testimonialCards[currentStartIndex]) {
        testimonialCards[currentStartIndex].classList.add("active");
      }

      // Arrows always enabled
      prevArrow.disabled = false;
      nextArrow.disabled = false;
    }

    // Mobile scroll behavior
    const mobileScrollAmount = () =>
      Math.round(testimonialsContainer.clientWidth * 0.82);

    function updateMobileArrows() {
      prevArrow.disabled = testimonialsContainer.scrollLeft <= 5;
      nextArrow.disabled =
        testimonialsContainer.scrollLeft + testimonialsContainer.clientWidth >=
        testimonialsContainer.scrollWidth - 5;
    }

    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        desktopNext(true);
      }, 3000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Handlers for desktop
    function desktopNext(isAuto = false) {
      currentStartIndex = (currentStartIndex + 1) % totalCards;
      updateCarousel();
      nextArrow.classList.add("active");
      setTimeout(() => nextArrow.classList.remove("active"), 200);

      if (!isAuto) {
        startAutoSlide(); // Reset timer on manual interaction
      }
    }

    function desktopPrev() {
      currentStartIndex = (currentStartIndex - 1 + totalCards) % totalCards;
      updateCarousel();
      prevArrow.classList.add("active");
      setTimeout(() => prevArrow.classList.remove("active"), 200);
      startAutoSlide(); // Reset timer on manual interaction
    }

    // Handlers for mobile
    function mobileNext(e) {
      e.preventDefault();
      testimonialsContainer.scrollBy({
        left: mobileScrollAmount(),
        behavior: "smooth",
      });
    }

    function mobilePrev(e) {
      e.preventDefault();
      testimonialsContainer.scrollBy({
        left: -mobileScrollAmount(),
        behavior: "smooth",
      });
    }

    // Initialize according to viewport
    function enableDesktopMode() {
      // detach mobile handlers
      testimonialsContainer.removeEventListener("scroll", updateMobileArrows);
      nextArrow.removeEventListener("click", mobileNext);
      prevArrow.removeEventListener("click", mobilePrev);

      // show desktop carousel
      testimonialCards.forEach((card) => (card.style.display = "flex"));
      // reset index and set desktop behavior
      currentStartIndex = 0;
      nextArrow.addEventListener("click", desktopNext);
      prevArrow.addEventListener("click", desktopPrev);
      updateCarousel();
      startAutoSlide();
    }

    function enableMobileMode() {
      stopAutoSlide();
      // detach desktop handlers
      nextArrow.removeEventListener("click", desktopNext);
      prevArrow.removeEventListener("click", desktopPrev);

      // ensure all cards visible in row and active
      testimonialCards.forEach((card) => {
        card.style.display = "flex";
        card.classList.add("active");
      });

      // Do NOT attach mobile click handlers for testimonials because
      // testimonial navigation buttons are hidden on mobile by CSS.
      // Keep buttons disabled to avoid accidental focus/key activation.
      try {
        prevArrow.disabled = true;
        nextArrow.disabled = true;
      } catch (e) {
        // ignore if buttons not present
      }
    }

    // Decide initial mode and listen for resizes to swap
    function initTestimonialMode() {
      if (window.innerWidth <= 768) {
        enableMobileMode();
      } else {
        visibleCards = window.innerWidth < 1400 ? 2 : 3;
        enableDesktopMode();
      }
    }

    // Re-init on resize (debounced)
    let testimonialResizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(testimonialResizeTimer);
      testimonialResizeTimer = setTimeout(function () {
        initTestimonialMode();
      }, 200);
    });

    // Initialize
    initTestimonialMode();
  }

  // ============= AUTO-SCROLL FOR MOBILE SECTIONS =============
  // Auto-scroll for Testimonials on mobile
  const testimonialsAutoScroll = () => {
    if (window.innerWidth <= 768 && testimonialsContainer) {
      const cardWidth = testimonialsContainer.scrollWidth / testimonialCards.length;
      const currentScroll = testimonialsContainer.scrollLeft;
      const maxScroll = testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth;

      if (currentScroll >= maxScroll - 10) {
        // At the end, jump to start
        testimonialsContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll to next card
        testimonialsContainer.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  // Auto-scroll for Student Startups on mobile
  const startupsContainer = document.querySelector('.startups-container');
  const startupsAutoScroll = () => {
    if (window.innerWidth <= 768 && startupsContainer && startupCards.length > 0) {
      const cardWidth = startupsContainer.scrollWidth / startupCards.length;
      const currentScroll = startupsContainer.scrollLeft;
      const maxScroll = startupsContainer.scrollWidth - startupsContainer.clientWidth;

      if (currentScroll >= maxScroll - 10) {
        // At the end, jump to start
        startupsContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll to next card
        startupsContainer.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  // Start auto-scroll intervals
  let testimonialsInterval = null;
  let startupsInterval = null;

  const startAutoScroll = () => {
    if (window.innerWidth <= 768) {
      // Start testimonials auto-scroll
      if (testimonialsContainer && !testimonialsInterval) {
        testimonialsInterval = setInterval(testimonialsAutoScroll, 2000);
      }

      // Start startups auto-scroll
      if (startupsContainer && !startupsInterval) {
        startupsInterval = setInterval(startupsAutoScroll, 2000);
      }
    }
  };

  const stopAutoScroll = () => {
    if (testimonialsInterval) {
      clearInterval(testimonialsInterval);
      testimonialsInterval = null;
    }
    if (startupsInterval) {
      clearInterval(startupsInterval);
      startupsInterval = null;
    }
  };

  // Initialize auto-scroll
  startAutoScroll();

  // Handle window resize
  window.addEventListener('resize', () => {
    stopAutoScroll();
    setTimeout(startAutoScroll, 300);
  });

  // Pause auto-scroll when user interacts
  if (testimonialsContainer) {
    testimonialsContainer.addEventListener('touchstart', () => {
      if (testimonialsInterval) {
        clearInterval(testimonialsInterval);
        testimonialsInterval = null;
      }
    });

    testimonialsContainer.addEventListener('touchend', () => {
      setTimeout(() => {
        if (window.innerWidth <= 768 && !testimonialsInterval) {
          testimonialsInterval = setInterval(testimonialsAutoScroll, 2000);
        }
      }, 3000); // Resume after 3 seconds
    });
  }

  if (startupsContainer) {
    startupsContainer.addEventListener('touchstart', () => {
      if (startupsInterval) {
        clearInterval(startupsInterval);
        startupsInterval = null;
      }
    });

    startupsContainer.addEventListener('touchend', () => {
      setTimeout(() => {
        if (window.innerWidth <= 768 && !startupsInterval) {
          startupsInterval = setInterval(startupsAutoScroll, 2000);
        }
      }, 3000); // Resume after 3 seconds
    });
  }
});

// ============= FACULTY CAROUSEL ===============
let currentFacultyTab = "our-faculty";
let facultyPositions = {
  "our-faculty": 0,
  "visiting-faculty": 0,
};
let facultyAutoScrollInterval = null;

// Make switchTab and moveCarousel global functions for HTML onclick handlers
window.switchTab = switchTab;
window.moveCarousel = moveCarousel;

function switchTab(tabName) {
  currentFacultyTab = tabName;

  // Update tab buttons
  const allTabs = document.querySelectorAll(".faculty-tab");
  allTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const activeTab = document.getElementById(`tab-${tabName}`);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Update carousel containers
  const containers = document.querySelectorAll(".carousel-container");
  containers.forEach((container) => container.classList.add("hidden"));

  const targetContainer = document.getElementById(tabName);
  if (targetContainer) {
    targetContainer.classList.remove("hidden");
  }

  // Reset position and restart auto-scroll for the new tab
  facultyPositions[currentFacultyTab] = 0;
  updateFacultyCarousel();
  startFacultyAutoScroll();
}

function moveCarousel(direction) {
  const carousel = document.querySelector(`#${currentFacultyTab} .carousel`);
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".faculty-card");
  const isMobile = window.innerWidth <= 768;

  // Restart auto-scroll timer when user manually interacts
  startFacultyAutoScroll();

  if (isMobile) {
    // On mobile switch to native horizontal scrolling
    const carouselContainer = document.getElementById(currentFacultyTab);
    if (!carouselContainer) return;

    // scroll amount ~= 80% of viewport of the carousel container
    const scrollAmount = Math.round(carouselContainer.clientWidth * 0.8);
    carouselContainer.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
    return;
  }

  // Desktop behaviour (transform-based)
  const cardWidth = 420; // Approximate card width + gap (380px + 40px gap)
  const visibleCards = 3;
  const maxPosition = -(cards.length - visibleCards) * cardWidth;

  facultyPositions[currentFacultyTab] += direction * cardWidth;

  // Boundary checks - loop back to start or end
  if (facultyPositions[currentFacultyTab] > 0) {
    // If going right beyond start, jump to the end
    facultyPositions[currentFacultyTab] = maxPosition;
  }
  if (facultyPositions[currentFacultyTab] < maxPosition) {
    // If going left beyond end, jump to the start
    facultyPositions[currentFacultyTab] = 0;
  }

  updateFacultyCarousel();
}

function autoScrollFaculty() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mobile: use native scrolling for ALL faculty carousels
    const carouselIds = ["our-faculty", "visiting-faculty"];

    carouselIds.forEach((id) => {
      const carouselContainer = document.getElementById(id);
      if (!carouselContainer) return;

      const scrollAmount = Math.round(carouselContainer.clientWidth * 0.8);
      const maxScroll =
        carouselContainer.scrollWidth - carouselContainer.clientWidth;

      if (carouselContainer.scrollLeft >= maxScroll - 10) {
        // At the end, jump back to start
        carouselContainer.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll right
        carouselContainer.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    });
  } else {
    const carousel = document.querySelector(`#${currentFacultyTab} .carousel`);
    if (!carousel) return;

    const cards = carousel.querySelectorAll(".faculty-card");

    // Desktop: transform-based
    const cardWidth = 420;
    const visibleCards = 3;
    const maxPosition = -(cards.length - visibleCards) * cardWidth;

    facultyPositions[currentFacultyTab] -= cardWidth;

    // Loop back to start when reaching the end
    if (facultyPositions[currentFacultyTab] < maxPosition) {
      facultyPositions[currentFacultyTab] = 0;
    }

    updateFacultyCarousel();
  }
}

function startFacultyAutoScroll() {
  // Clear existing interval
  if (facultyAutoScrollInterval) {
    clearInterval(facultyAutoScrollInterval);
  }

  // Start new interval - auto scroll every 2 seconds
  facultyAutoScrollInterval = setInterval(autoScrollFaculty, 2000);
}

function updateFacultyCarousel() {
  const carousel = document.querySelector(`#${currentFacultyTab} .carousel`);
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".faculty-card");
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // On mobile we use native scrolling; ensure transform is reset
    carousel.style.transform = "none";
    // Reset stored desktop positions to avoid accidental jumps if resizing
    facultyPositions["our-faculty"] = 0;
    facultyPositions["visiting-faculty"] = 0;
    return;
  }

  // Desktop: transform-based carousel
  carousel.style.transform = `translateX(${facultyPositions[currentFacultyTab]}px)`;

  // Update arrow button states
  const leftArrow = document.getElementById("arrow-left");
  const rightArrow = document.getElementById("arrow-right");

  if (leftArrow && rightArrow) {
    const maxPosition = -(cards.length - 3) * 420;
    leftArrow.disabled = facultyPositions[currentFacultyTab] >= 0;
    rightArrow.disabled = facultyPositions[currentFacultyTab] <= maxPosition;
  }
}

// Initialize faculty carousel
document.addEventListener("DOMContentLoaded", function () {
  // Ensure the "Our Faculty" tab is active by default
  switchTab("our-faculty");
  // Start auto-scrolling
  startFacultyAutoScroll();
});

window.addEventListener("load", function () {
  updateFacultyCarousel();
});

window.addEventListener("resize", () => {
  // Reset positions on resize to avoid layout issues
  facultyPositions[currentFacultyTab] = 0;
  updateFacultyCarousel();
  // Restart auto-scroll after resize
  startFacultyAutoScroll();
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  if (!faqItems.length) {
    return;
  }

  const setIcon = (item, symbol) => {
    const icon = item.querySelector(".faq-icon");
    if (icon) {
      icon.textContent = symbol;
    }
  };

  faqItems.forEach((item) => {
    setIcon(item, item.classList.contains("active") ? "-" : "+");
    const button = item.querySelector(".faq-button");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((other) => {
        other.classList.remove("active");
        setIcon(other, "+");
      });

      if (!isActive) {
        item.classList.add("active");
        setIcon(item, "-");
      }
    });
  });
});

// Mobile User Icon Popup Logic
function isMobileView() {
  return window.innerWidth <= 768;
}

function showFormPopup() {
  const formCard = document.querySelector(".form-card");
  let overlay = document.querySelector(".form-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "form-overlay";
    document.body.appendChild(overlay);
  }
  overlay.style.display = "block";
  formCard.classList.add("popup-active");
  formCard.style.display = "block";
  overlay.onclick = closeFormPopup;
}

function closeFormPopup() {
  const formCard = document.querySelector(".form-card");
  const overlay = document.querySelector(".form-overlay");
  if (formCard) {
    formCard.classList.remove("popup-active");
    formCard.style.display = "";
  }
  if (overlay) {
    overlay.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.querySelector(".mobile-user-icon");
  if (userIcon) {
    userIcon.addEventListener("click", function () {
      if (isMobileView()) {
        showFormPopup();
      }
    });
  }

  // Optional: Add close button to form
  const formCard = document.querySelector(".form-card");
  if (formCard && !formCard.querySelector(".form-close-btn")) {
    const closeBtn = document.createElement("button");
    closeBtn.className = "form-close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "12px";
    closeBtn.style.right = "18px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "2rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = closeFormPopup;
    formCard.appendChild(closeBtn);
  }
});

// Exposure Cards Overlap Animation
function initExposureCardsAnimation() {
  // Only run on mobile devices
  if (window.innerWidth >= 768) return;

  const cardsContainer = document.querySelector(".exposure-cards-container");
  const cards = document.querySelectorAll(".exposure-card");

  if (!cardsContainer || cards.length === 0) return;

  // Set initial state
  cards.forEach((card, index) => {
    card.classList.add("card-active");
  });

  function updateCardsAnimation() {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerRect = cardsContainer.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const viewportHeight = window.innerHeight;

    // Calculate how far we've scrolled into the container
    const scrollIntoContainer = scrollTop - containerTop + viewportHeight * 0.5;
    const cardHeight = cards[0].offsetHeight + 40; // card height + margin

    cards.forEach((card, index) => {
      // Remove all classes first
      card.classList.remove("card-active", "card-scaling");

      // Calculate the scroll position for this card
      const cardScrollStart = index * cardHeight;
      const cardScrollEnd = cardScrollStart + cardHeight;

      if (
        scrollIntoContainer >= cardScrollStart &&
        scrollIntoContainer < cardScrollEnd - 100
      ) {
        // Card is active
        card.classList.add("card-active");
      } else if (
        scrollIntoContainer >= cardScrollEnd - 100 &&
        scrollIntoContainer < cardScrollEnd + 50
      ) {
        // Card is being overtaken - scale down slightly
        card.classList.add("card-scaling");
      } else {
        // Card is in its default state
        card.classList.add("card-active");
      }
    });
  }

  // Throttled scroll handler for better performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCardsAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial call
  updateCardsAnimation();
}

// Initialize on DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  initExposureCardsAnimation();
});

// Re-initialize on window resize
window.addEventListener("resize", function () {
  // Debounce resize handler
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function () {
    initExposureCardsAnimation();
  }, 250);
});

// Experience Life - mobile horizontal scroll navigation using existing arrows
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".video-cards-container");
  const prevBtn = document.querySelector(".prev-exp-arrow");
  const nextBtn = document.querySelector(".next-exp-arrow");

  if (!container || !prevBtn || !nextBtn) return;

  const isMobileView = () => window.innerWidth <= 768;
  const scrollAmount = () => Math.round(container.clientWidth * 0.82);

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });

  function updateArrows() {
    if (!isMobileView()) {
      // hide or disable on desktop
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    prevBtn.disabled = container.scrollLeft <= 5;
    nextBtn.disabled =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
  }

  container.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  // Initial state
  updateArrows();
});

// Apply Now button redirection to form
document.addEventListener("DOMContentLoaded", function () {
  const applyBtn = document.querySelector(".apply-btn");

  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      const formCard = document.getElementById("registration-form");
      if (formCard) {
        formCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Optional: Add a subtle highlight effect
        formCard.style.transition = "box-shadow 0.3s ease";
        formCard.style.boxShadow = "0 0 20px rgba(200, 16, 46, 0.3)";
        setTimeout(() => {
          formCard.style.boxShadow = "";
        }, 1500);
      }
    });
  }
});

// Rishihood University B.Design - JavaScript Functionality

document.addEventListener("DOMContentLoaded", function () {
  // ============= PROGRAM EXPERIENCE TABS ===============
  const tabButtons = document.querySelectorAll(".tab-button");
  const statsContents = document.querySelectorAll(
    ".stats-grid, .software-grid, .industry-content"
  );

  // Set the first tab active by default
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add("active-tab");
    statsContents.forEach((content) => {
      if (content.id === tabButtons[0].dataset.tab) {
        content.style.display = content.classList.contains("stats-grid")
          ? "grid"
          : "block";
      } else {
        content.style.display = "none";
      }
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;

      // Remove active styling from all tabs
      tabButtons.forEach((btn) => {
        btn.classList.remove("active-tab");
      });

      // Add active styling to clicked tab
      button.classList.add("active-tab");

      // Show corresponding content and hide others
      statsContents.forEach((content) => {
        if (content.id === targetTab) {
          content.style.display = content.classList.contains("stats-grid")
            ? "grid"
            : "block";
        } else {
          content.style.display = "none";
        }
      });
    });
  });

  // ============= CURRICULUM YEAR TABS ===============
  const curriculumTabs = document.querySelectorAll(".curriculum-semester-tab");
  const curriculumContents = document.querySelectorAll(
    ".curriculum-year-content"
  );

  curriculumTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetYear = tab.dataset.year;

      // Remove active styling from all curriculum tabs
      curriculumTabs.forEach((btn) => {
        btn.classList.remove("curriculum-semester-tab-active");
      });

      // Add active styling to clicked tab
      tab.classList.add("curriculum-semester-tab-active");

      // Show corresponding content and hide others
      curriculumContents.forEach((content) => {
        if (content.id === targetYear) {
          content.classList.add("curriculum-year-content-visible");
          content.classList.remove("curriculum-year-content-hidden");
        } else {
          content.classList.remove("curriculum-year-content-visible");
          content.classList.add("curriculum-year-content-hidden");
        }
      });
    });
  });

  // ============= FAQ FUNCTIONALITY ===============
  const faqButtons = document.querySelectorAll(".faq-button");

  faqButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const faqItem = this.closest(".faq-item");
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });

  // ============= FACULTY CAROUSEL ===============
  let currentTab = "our-faculty";
  let positions = {
    "our-faculty": 0,
    "visiting-faculty": 0,
  };

  // ============= TESTIMONIALS FUNCTIONALITY ===============

  // Check if mobile
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  // Helper: find container
  const getContainer = (scope = document) =>
    scope.querySelector(".testimonials-container") ||
    scope.querySelector(".testimonial-cards");

  // Work per section if present; else single global block
  const sections = document.querySelectorAll(".testimonials-section");
  const blocks = sections.length ? sections : [document];

  blocks.forEach((scope) => {
    const container = getContainer(scope);
    const cards = container
      ? container.querySelectorAll(".testimonial-card")
      : [];

    // arrows: prefer inside section, else global
    const prevArrow =
      scope.querySelector?.(".prev-arrow") ||
      document.querySelector(".prev-arrow");
    const nextArrow =
      scope.querySelector?.(".next-arrow") ||
      document.querySelector(".next-arrow");

    if (!container || !cards.length) return;

    // ---- Active handling (desktop only) ----
    const setActive = (el) => {
      cards.forEach((c) => c.classList.remove("active"));
      if (el) el.classList.add("active");
    };

    const onCardClick = (e) => {
      if (isMobile()) return;
      setActive(e.currentTarget);
    };

    cards.forEach((c) => c.addEventListener("click", onCardClick));

    const updateActiveForViewport = () => {
      if (isMobile()) {
        cards.forEach((c) => c.classList.add("active"));
      } else {
        cards.forEach((c) => c.classList.remove("active"));
        setActive(cards[0]);
      }
    };

    // ---- Desktop carousel & Mobile scroll ----
    let currentStartIndex = 0;
    const visibleCards = 3;
    const totalCards = cards.length;

    const updateDesktopCarousel = () => {
      cards.forEach((card, i) => {
        card.style.display =
          i >= currentStartIndex && i < currentStartIndex + visibleCards
            ? "flex"
            : "none";
      });
      setActive(cards[currentStartIndex]);
      if (prevArrow) prevArrow.disabled = currentStartIndex === 0;
      if (nextArrow)
        nextArrow.disabled = currentStartIndex >= totalCards - visibleCards;
    };

    const desktopNext = () => {
      if (currentStartIndex < totalCards - visibleCards) {
        currentStartIndex++;
        updateDesktopCarousel();
      }
    };

    const desktopPrev = () => {
      if (currentStartIndex > 0) {
        currentStartIndex--;
        updateDesktopCarousel();
      }
    };

    // Mobile scroll helpers
    const mobileScrollAmount = () => Math.round(container.clientWidth * 0.82);
    const mobileNext = (e) => {
      e?.preventDefault?.();
      container.scrollBy({ left: mobileScrollAmount(), behavior: "smooth" });
    };
    const mobilePrev = (e) => {
      e?.preventDefault?.();
      container.scrollBy({ left: -mobileScrollAmount(), behavior: "smooth" });
    };

    const updateMobileArrows = () => {
      if (!prevArrow || !nextArrow) return;
      // Make sure arrows are enabled & visible on mobile
      prevArrow.disabled = container.scrollLeft <= 5;
      nextArrow.disabled =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5;
    };

    // Attach/detach to avoid duplicate listeners on resize
    const enableDesktopMode = () => {
      // detach mobile
      container.removeEventListener("scroll", updateMobileArrows);
      prevArrow?.removeEventListener("click", mobilePrev);
      nextArrow?.removeEventListener("click", mobileNext);

      // show all then filter
      cards.forEach((card) => {
        card.style.display = "flex";
      });
      currentStartIndex = 0;

      // attach desktop
      prevArrow?.removeEventListener("click", desktopPrev);
      nextArrow?.removeEventListener("click", desktopNext);
      prevArrow?.addEventListener("click", desktopPrev);
      nextArrow?.addEventListener("click", desktopNext);

      updateDesktopCarousel();
    };

    const enableMobileMode = () => {
      // detach desktop
      prevArrow?.removeEventListener("click", desktopPrev);
      nextArrow?.removeEventListener("click", desktopNext);

      // all cards visible in row
      cards.forEach((card) => {
        card.style.display = "flex";
      });

      // ensure arrow buttons are clickable/enabled
      if (prevArrow) prevArrow.disabled = false;
      if (nextArrow) nextArrow.disabled = false;

      // attach mobile
      container.addEventListener("scroll", updateMobileArrows);
      prevArrow?.removeEventListener("click", mobilePrev);
      nextArrow?.removeEventListener("click", mobileNext);
      prevArrow?.addEventListener("click", mobilePrev);
      nextArrow?.addEventListener("click", mobileNext);

      // initial state
      updateMobileArrows();
    };

    const initMode = () => {
      updateActiveForViewport();
      if (isMobile()) enableMobileMode();
      else enableDesktopMode();
    };

    let rszTimer;
    const onResize = () => {
      clearTimeout(rszTimer);
      rszTimer = setTimeout(initMode, 150);
    };

    initMode();
    window.addEventListener("resize", onResize);
  });

  // ============= EXPOSURE SECTION SWIPER ===============

  // Initialize Swiper for exposure section
  if (document.querySelector(".exposureSwiper")) {
    const swiper = new Swiper(".exposureSwiper", {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 800,
      effect: "slide",
    });
  }

  // ============= SMOOTH SCROLLING FOR ANCHOR LINKS ===============

  // Add smooth scrolling behavior for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ============= NAVBAR SCROLL EFFECT (OPTIONAL) ===============

  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // ============= MINIMAL SCROLL REVEAL ANIMATION ===============
  // Uses IntersectionObserver to add .in-view to .animate-section elements
  // ensuring subtle fade+lift on first reveal only.
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target); // reveal once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".animate-section").forEach((el) => {
    revealObserver.observe(el);
  });

  // ============= COMPONENT-LEVEL REVEAL ITEMS =============
  const componentSelectors = [
    ".foundation-card",
    ".minor-card",
    ".professor-info",
    ".feature-card",
    ".startup-card",
    ".trek-image",
    ".testimonial-card",
    ".program-stat-card",
    ".senior-photo",
    ".company-logo-card",
    ".experience-title",
    ".video-card",
    ".curriculum-content-box",
    ".faculty-card",
    ".partner-card",
    ".advantage-card",
    ".exposure-card",
    ".admission-image",
    ".faq-item"
  ];

  const componentElements = componentSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));

  // Add reveal-item class to each component (skip if inside hero-section to honor 'no hero animation')
  componentElements.forEach((el, idx) => {
    if (el.closest('.hero-section')) return; // skip hero content
    el.classList.add('reveal-item');
  });

  const itemObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-item').forEach((el, i) => {
    // Optional lightweight stagger limited to first 6 items per section
    const parentSection = el.closest('section');
    if (parentSection) {
      const siblings = Array.from(parentSection.querySelectorAll('.reveal-item'));
      const localIndex = siblings.indexOf(el);
      el.style.transitionDelay = Math.min(localIndex, 5) * 60 + 'ms';
    }
    itemObserver.observe(el);
  });

  console.log("Rishihood B.Design website loaded successfully!");
});

// ============= UTILITY FUNCTIONS ===============

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Startup cards functionality - Click to expand/collapse (disabled on mobile)
const startupCards = document.querySelectorAll(".startup-card");
const isMobile = () => window.innerWidth <= 768;

startupCards.forEach((card) => {
  card.addEventListener("click", function () {
    // On mobile clicking should do nothing
    if (isMobile()) return;

    // Remove active class from all cards
    startupCards.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked card
    this.classList.add("active");
  });
});

// Ensure all startup cards are active on mobile (so clicking doesn't change anything)
function updateStartupActiveState() {
  if (isMobile()) {
    startupCards.forEach((c) => c.classList.add("active"));
  } else {
    // On desktop, keep first card active by default
    startupCards.forEach((c) => c.classList.remove("active"));
    if (startupCards[0]) startupCards[0].classList.add("active");
  }
}
updateStartupActiveState();

// Re-apply when resizing
window.addEventListener("resize", () => {
  // debounce
  clearTimeout(window._startupResizeTimer);
  window._startupResizeTimer = setTimeout(updateStartupActiveState, 150);
});

// Testimonial cards functionality - Click to expand/collapse


// Faculty section functionality is handled above in the main FACULTY CAROUSEL section

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  if (!faqItems.length) {
    return;
  }

  const setIcon = (item, symbol) => {
    const icon = item.querySelector(".faq-icon");
    if (icon) {
      icon.textContent = symbol;
    }
  };

  faqItems.forEach((item) => {
    setIcon(item, item.classList.contains("active") ? "-" : "+");
    const button = item.querySelector(".faq-button");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((other) => {
        other.classList.remove("active");
        setIcon(other, "+");
      });

      if (!isActive) {
        item.classList.add("active");
        setIcon(item, "-");
      }
    });
  });
});

// Mobile User Icon Popup Logic
function isMobileView() {
  return window.innerWidth <= 768;
}

function showFormPopup() {
  const formCard = document.querySelector(".form-card");
  let overlay = document.querySelector(".form-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "form-overlay";
    document.body.appendChild(overlay);
  }
  overlay.style.display = "block";
  formCard.classList.add("popup-active");
  formCard.style.display = "block";
  overlay.onclick = closeFormPopup;
}

function closeFormPopup() {
  const formCard = document.querySelector(".form-card");
  const overlay = document.querySelector(".form-overlay");
  if (formCard) {
    formCard.classList.remove("popup-active");
    formCard.style.display = "";
  }
  if (overlay) {
    overlay.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.querySelector(".mobile-user-icon");
  if (userIcon) {
    userIcon.addEventListener("click", function () {
      if (isMobileView()) {
        showFormPopup();
      }
    });
  }

  // Optional: Add close button to form
  const formCard = document.querySelector(".form-card");
  if (formCard && !formCard.querySelector(".form-close-btn")) {
    const closeBtn = document.createElement("button");
    closeBtn.className = "form-close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "12px";
    closeBtn.style.right = "18px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "2rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = closeFormPopup;
    formCard.appendChild(closeBtn);
  }
});

// Exposure Cards Overlap Animation
function initExposureCardsAnimation() {
  // Only run on mobile devices
  if (window.innerWidth >= 768) return;

  const cardsContainer = document.querySelector(".exposure-cards-container");
  const cards = document.querySelectorAll(".exposure-card");

  if (!cardsContainer || cards.length === 0) return;

  // Set initial state
  cards.forEach((card, index) => {
    card.classList.add("card-active");
  });

  function updateCardsAnimation() {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerRect = cardsContainer.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const viewportHeight = window.innerHeight;

    // Calculate how far we've scrolled into the container
    const scrollIntoContainer = scrollTop - containerTop + viewportHeight * 0.5;
    const cardHeight = cards[0].offsetHeight + 40; // card height + margin

    cards.forEach((card, index) => {
      // Remove all classes first
      card.classList.remove("card-active", "card-scaling");

      // Calculate the scroll position for this card
      const cardScrollStart = index * cardHeight;
      const cardScrollEnd = cardScrollStart + cardHeight;

      if (
        scrollIntoContainer >= cardScrollStart &&
        scrollIntoContainer < cardScrollEnd - 100
      ) {
        // Card is active
        card.classList.add("card-active");
      } else if (
        scrollIntoContainer >= cardScrollEnd - 100 &&
        scrollIntoContainer < cardScrollEnd + 50
      ) {
        // Card is being overtaken - scale down slightly
        card.classList.add("card-scaling");
      } else {
        // Card is in its default state
        card.classList.add("card-active");
      }
    });
  }

  // Throttled scroll handler for better performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCardsAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial call
  updateCardsAnimation();
}

// Initialize on DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  initExposureCardsAnimation();
});

// Re-initialize on window resize
window.addEventListener("resize", function () {
  // Debounce resize handler
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function () {
    initExposureCardsAnimation();
  }, 250);
});

// Experience Life - mobile horizontal scroll navigation using existing arrows
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".video-cards-container");
  const prevBtn = document.querySelector(".prev-exp-arrow");
  const nextBtn = document.querySelector(".next-exp-arrow");

  if (!container || !prevBtn || !nextBtn) return;

  const isMobileView = () => window.innerWidth <= 768;
  const scrollAmount = () => Math.round(container.clientWidth * 0.82);

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });

  function updateArrows() {
    if (!isMobileView()) {
      // hide or disable on desktop
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    prevBtn.disabled = container.scrollLeft <= 5;
    nextBtn.disabled =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
  }

  container.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  // Initial state
  updateArrows();
});

// Apply Now button redirection to form
document.addEventListener("DOMContentLoaded", function () {
  const applyBtn = document.querySelector(".apply-btn");

  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      const formCard = document.getElementById("registration-form");
      if (formCard) {
        formCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Optional: Add a subtle highlight effect
        formCard.style.transition = "box-shadow 0.3s ease";
        formCard.style.boxShadow = "0 0 20px rgba(200, 16, 46, 0.3)";
        setTimeout(() => {
          formCard.style.boxShadow = "";
        }, 1500);
      }
    });
  }
});

// Auto-scroll animation for Video Cards on Mobile
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".video-cards-container");
  if (!container) return;

  let autoScrollTimer;
  const animationDuration = 1000; // 1 second
  const viewDuration = 2000; // Time to view the card before scrolling
  const totalInterval = animationDuration + viewDuration;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function smoothScrollTo(element, target, duration) {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    // Disable snap temporarily to prevent fighting
    const originalSnap = element.style.scrollSnapType;
    element.style.scrollSnapType = 'none';

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      if (elapsed > duration) {
        element.scrollLeft = target;
        // Restore snap
        element.style.scrollSnapType = originalSnap;
        return;
      }

      const progress = elapsed / duration;
      const ease = easeInOutQuad(progress);

      element.scrollLeft = start + change * ease;
      requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);
  }

  function startAutoScroll() {
    // Only run on mobile and if there is overflow
    if (window.innerWidth > 768 || container.scrollWidth <= container.clientWidth) {
      return;
    }

    clearInterval(autoScrollTimer);
    autoScrollTimer = setInterval(() => {
      // Re-check conditions
      if (window.innerWidth > 768) {
        clearInterval(autoScrollTimer);
        return;
      }

      const card = container.querySelector('a');
      if (!card) return;

      // Calculate scroll amount (card width + gap)
      // Gap is 12px from CSS
      const itemWidth = card.offsetWidth + 12;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let nextScrollLeft = container.scrollLeft + itemWidth;

      // Check if we need to loop back
      // If we are close to the end (within half a card width), go back to 0
      if (container.scrollLeft >= maxScroll - 10) {
        smoothScrollTo(container, 0, animationDuration);
      } else {
        // Ensure we don't scroll past the max
        if (nextScrollLeft > maxScroll) {
          nextScrollLeft = maxScroll;
        }
        smoothScrollTo(container, nextScrollLeft, animationDuration);
      }
    }, totalInterval);
  }

  // Start logic
  startAutoScroll();

  // Handle resize
  window.addEventListener('resize', () => {
    clearInterval(autoScrollTimer);
    startAutoScroll();
  });

  // Pause on user interaction
  container.addEventListener('touchstart', () => clearInterval(autoScrollTimer));
  container.addEventListener('touchend', () => {
    // Restart after a delay to let user finish interacting
    setTimeout(startAutoScroll, 2000);
  });
});

// Curriculum Tabs Scroll Hint Animation
document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.getElementById("curriculum-tabs-container");
  if (!tabsContainer) return;

  let hintInterval;
  let userInteracted = false;

  const stopHintLoop = () => {
    userInteracted = true;
    if (hintInterval) clearInterval(hintInterval);
  };

  // Stop animation on user interaction
  tabsContainer.addEventListener("touchstart", stopHintLoop, { passive: true });
  tabsContainer.addEventListener("mousedown", stopHintLoop);
  tabsContainer.addEventListener("wheel", stopHintLoop, { passive: true });

  const runHintAnimation = () => {
    if (userInteracted) return;

    // Check if scrollable (content width > container width)
    if (tabsContainer.scrollWidth > tabsContainer.clientWidth) {
      // Hint animation: Scroll right a bit, then back
      tabsContainer.scrollTo({
        left: 60, // Scroll 60px to the right
        behavior: "smooth",
      });

      setTimeout(() => {
        if (userInteracted) return;
        tabsContainer.scrollTo({
          left: 0, // Scroll back to start
          behavior: "smooth",
        });
      }, 800); // Wait for the scroll to finish
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !userInteracted) {
          // Start the loop
          // Run once after a short delay
          setTimeout(runHintAnimation, 500);

          // Then repeat every 4.5 seconds
          hintInterval = setInterval(runHintAnimation, 4500);

          // Stop observing so we don't restart the loop unnecessarily
          observer.unobserve(tabsContainer);
        }
      });
    },
    { threshold: 0.6 } // Trigger when 60% visible
  );

  observer.observe(tabsContainer);
});

// Generic Scroll to Top Trigger
document.addEventListener('click', function (e) {
  // Check if the clicked element or any of its parents has the class 'scroll-to-top-trigger'
  const trigger = e.target.closest('.scroll-to-top-trigger');
  if (trigger) {
    e.preventDefault(); // Prevent default anchor behavior if it's a link
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

function switchProgramExperienceTab(tabId, element) {
  // Remove active class from all badges
  const badges = document.querySelectorAll('.program-experience-badge');
  badges.forEach(badge => badge.classList.remove('active'));

  // Add active class to the clicked badge
  element.classList.add('active');

  // Hide all grids
  const grids = document.querySelectorAll('.program-experience-grid');
  grids.forEach(grid => grid.classList.add('hidden'));

  // Show the selected grid
  const selectedGrid = document.getElementById(`grid-${tabId}`);
  if (selectedGrid) {
    selectedGrid.classList.remove('hidden');
  }
}

