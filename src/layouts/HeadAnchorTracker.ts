import { track } from "@vercel/analytics";

document.addEventListener("astro:page-load", () => {
  const elements = document.querySelectorAll("a");
  elements.forEach((element) =>
    element.addEventListener("click", () => {
      const to = element.getAttribute("href");
      if (to) {
        const baseUrl = window.location.origin;
        const from = window.location.href.replace(baseUrl, "");
        const destination = to.replace(baseUrl, "");
        track("Navigate", { from, to: destination });
      }
    })
  );
});
