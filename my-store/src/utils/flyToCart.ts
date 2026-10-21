export function flyToCart(sourceImg: HTMLImageElement) {
  const target = document.getElementById("cart-icon-target");
  if (!target) return;

  const start = sourceImg.getBoundingClientRect();
  const end = target.getBoundingClientRect();

  const clone = sourceImg.cloneNode(true) as HTMLImageElement;
  Object.assign(clone.style, {
    position: "fixed",
    left: `${start.left}px`,
    top: `${start.top}px`,
    width: `${start.width}px`,
    height: `${start.height}px`,
    objectFit: "contain",
    zIndex: "9999",
    pointerEvents: "none",
    transition:
      "left 750ms cubic-bezier(0.5, -0.3, 0.7, 1.2), top 750ms cubic-bezier(0.3, 0.2, 0.6, 1), width 750ms ease-in, height 750ms ease-in, opacity 750ms ease-in, transform 750ms ease-in",
    borderRadius: "9999px",
  });
  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    Object.assign(clone.style, {
      left: `${end.left + end.width / 2 - 10}px`,
      top: `${end.top + end.height / 2 - 10}px`,
      width: "20px",
      height: "20px",
      opacity: "0.2",
      transform: "rotate(540deg)",
    });
  });

  setTimeout(() => {
    clone.remove();
    window.dispatchEvent(new CustomEvent("cart:bump"));
  }, 750);
}
