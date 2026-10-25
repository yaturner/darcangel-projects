// Click a project-page screenshot (the hero image or any image inside the
// rendered README) to view it full-size in an overlay. No-op on pages with
// no matching images (the homepage, 404, etc).
(function () {
  function openLightbox(src, alt) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    var img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    overlay.appendChild(img);

    function close() {
      overlay.remove();
      document.removeEventListener("keydown", onKeydown);
    }
    function onKeydown(event) {
      if (event.key === "Escape") close();
    }

    overlay.addEventListener("click", close);
    document.addEventListener("keydown", onKeydown);
    document.body.appendChild(overlay);
  }

  function init() {
    var images = document.querySelectorAll(".hero, .readme img");
    images.forEach(function (img) {
      img.classList.add("lightbox-trigger");
      img.addEventListener("click", function () {
        openLightbox(img.currentSrc || img.src, img.alt);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
