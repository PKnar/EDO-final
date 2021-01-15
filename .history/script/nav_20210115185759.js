(function () {
  // NAVIGATION

  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-nav");
  const topLine = document.querySelector(".top");
  const middleLine = document.querySelector(".middle");
  const bottomLine = document.querySelector(".bottom");

  burgerMenu.addEventListener("click", (e) => {
    mobileMenu.classList.toggle("show");
    middleLine.classList.toggle("hidden");
    bottomLine.classList.toggle("rotate45");
    topLine.classList.toggle("rotate-45");
    mobileMenu.classList.toggle("slideLeft");
  });
})();
