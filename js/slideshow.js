function initSlideshow(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const slideList = container.querySelector(".slide-list");
  const slides = container.querySelectorAll(".slide-item");
  const prevBtn = container.querySelector(".prev");
  const nextBtn = container.querySelector(".next");
  const pagination = container.querySelector(".pagination");
  let currentIndex = 0;
  let isAnimating = false;
  let autoplayInterval;

  // Create pagination dots
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.dataset.index = index;
    pagination.appendChild(dot);
  });
  const dots = pagination.querySelectorAll(".dot");

  function updateSlide(index, direction = "next") {
    if (isAnimating) return;
    isAnimating = true;

    const newIndex = (index + slides.length) % slides.length;
    slideList.style.transform = `translateX(-${newIndex * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[newIndex].classList.add("active");
    currentIndex = newIndex;

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => updateSlide(currentIndex + 1), 3000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  prevBtn.addEventListener("click", () => {
    updateSlide(currentIndex - 1, "prev");
  });

  nextBtn.addEventListener("click", () => {
    updateSlide(currentIndex + 1, "next");
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      updateSlide(parseInt(dot.dataset.index));
    });
  });

  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);

  // Initialize
  updateSlide(0);
  startAutoplay();
}

initSlideshow(".slideshow-container");
