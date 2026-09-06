/* Shared responsive typography. The stylesheet owns the scale and width bounds.
   Public markup: data-type-scope="viewport" on html, "container" on specimens.
   i12e:typographychange lets specimen readouts refresh after a width update. */
(() => {
  const root = document.documentElement;
  const scopes = [...document.querySelectorAll("[data-type-scope]")];
  const tokens = getComputedStyle(root);
  const minimum = parseFloat(tokens.getPropertyValue("--type-width-min"));
  const maximum = parseFloat(tokens.getPropertyValue("--type-width-max"));
  if (!Number.isFinite(minimum) || !(maximum > minimum)) return;

  const pending = new Set();
  let animationFrame = 0;

  function update() {
    animationFrame = 0;
    for (const scope of pending) {
      const width = scope.dataset.typeScope === "viewport"
        ? window.innerWidth : scope.getBoundingClientRect().width;
      const progress = String(Math.max(0, Math.min(1, (width - minimum) / (maximum - minimum))));
      if (scope.style.getPropertyValue("--type-progress") !== progress) {
        scope.style.setProperty("--type-progress", progress);
        scope.dispatchEvent(new Event("i12e:typographychange", {bubbles: true}));
      }
    }
    pending.clear();
  }

  function schedule(scopesToUpdate = scopes) {
    for (const scope of scopesToUpdate) pending.add(scope);
    if (!animationFrame) animationFrame = requestAnimationFrame(update);
  }

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(entries => schedule(entries.map(entry => entry.target)));
    scopes.filter(scope => scope.dataset.typeScope === "container").forEach(scope => observer.observe(scope));
  }
  window.addEventListener("resize", () => schedule());
  window.addEventListener("pageshow", () => schedule());
  if (document.fonts) document.fonts.ready.then(() => schedule());
  schedule();
})();
