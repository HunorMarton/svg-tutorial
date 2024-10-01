import { track } from "../utils/analytics";

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target instanceof HTMLElement) {
      const trackId = entry.target.dataset.trackId;

      if (trackId) {
        const baseUrl = window.location.origin;
        const page = window.location.href.replace(baseUrl, "");
        track(
          "Viewed Section",
          { page: page == "/" ? "home" : page, section: trackId },
          true
        );
      }
    }
  });
};
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};
const observer = new IntersectionObserver(callback, options);

document.addEventListener("astro:page-load", () => {
  const elements = document.querySelectorAll("[data-track-id]");
  elements.forEach((element) => observer.observe(element));
});
