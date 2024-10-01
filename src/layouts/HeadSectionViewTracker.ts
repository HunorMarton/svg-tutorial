import { track } from "../utils/analytics";

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target instanceof HTMLElement) {
      const baseUrl = window.location.origin;
      let page = window.location.href.replace(baseUrl, "");
      page = page == "/" ? "home" : page;

      const trackId = entry.target.dataset.trackId;
      if (trackId) {
        track("Viewed Section", { page, section: trackId }, true);
      }

      const fallbackId = entry.target.dataset.fallbackId;
      if (fallbackId) {
        track("Fallback", { page, section: fallbackId }, true);
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

  const fallbackElements = document.querySelectorAll("[data-fallback-id]");
  fallbackElements.forEach((element) => observer.observe(element));
});
