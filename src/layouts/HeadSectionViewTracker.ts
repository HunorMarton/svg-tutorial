import { track } from "@vercel/analytics";

const analyticsSent = new Set<string>();

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target instanceof HTMLElement) {
      const trackId = entry.target.dataset.trackId;

      // Only send analytics once per session
      if (trackId && !analyticsSent.has(trackId)) {
        analyticsSent.add(trackId);
        track("Viewed Section", {
          page: "home",
          section: trackId,
        });
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
