const codeString = `

console.log("expressive code plugin module");

document.addEventListener("astro:page-load", () => {
    document.querySelectorAll(".ec-line").forEach((item) => {
        const elementId = item.getAttribute("data-element-id");
        if(!elementId) return;

        item.addEventListener("mouseenter", () => {
            item.parentNode.querySelectorAll(\`div[data-element-id='\${elementId}']\`).forEach((el) => {
                el.setAttribute("data-highlight", "true");
            });
        });

        item.addEventListener("mouseleave", () => {
            item.parentNode.querySelectorAll(\`div[data-element-id='\${elementId}']\`).forEach((el) => {
                el.removeAttribute("data-highlight");
            });
        });
    });
});

`;

export default codeString;
