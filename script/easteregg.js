(function () {
  const title = document.querySelector(".title");

  title.addEventListener("mouseover", (e) =>
    handleMouseOver(e.target, "animated")
  );
  title.addEventListener("mouseout", (e) =>
    handleMouseOut(e.target, "animated")
  );

  let effectDelay;

  function handleMouseOver(el, className) {
    effectDelay = setTimeout(() => el.classList.add(className), 5000);
  }

  function handleMouseOut(el, className) {
    el.classList.remove(className);
    clearTimeout(effectDelay);
  }
})();
