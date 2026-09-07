/* Embedded artwork owns its palette and follows the reference page's mode. A child announces readiness
   after loading its font; send the latest appearance once, then on changes. */
(() => {
  function logoURL(frame) {
    try {
      const url = new URL(frame.getAttribute("src"), document.baseURI);
      return ["http:", "https:", "file:"].includes(url.protocol)
      && /\/assets\/images\/(?:logo|logotype)\.svg$/.test(url.pathname) ? url : null;
    } catch {
      return null;
    }
  }

  const frames = [...document.querySelectorAll("iframe[src]")]
    .map(frame => ({frame, url: logoURL(frame), ready: false}))
    .filter(entry => entry.url);

  function currentURL(entry) {
    const url = logoURL(entry.frame);
    if (url?.href !== entry.url?.href) entry.ready = false;
    entry.url = url;
    return url;
  }

  function command(entry, message) {
    const url = currentURL(entry);
    if (!url || !entry.frame.contentWindow) return;
    // file:// children have opaque origins; their exact window is still checked.
    entry.frame.contentWindow.postMessage(message, url.origin === "null" ? "*" : url.origin);
  }

  function send(entry) {
    if (!currentURL(entry) || !entry.ready) return;
    command(entry, {
      type: "i12e:command", action: "appearance",
      theme: document.documentElement.dataset.theme,
    });
  }

  window.addEventListener("message", event => {
    const entry = frames.find(entry => entry.frame.contentWindow === event.source);
    if (!entry || event.data?.type !== "i12e:state") return;
    const url = currentURL(entry);
    if (!url || event.origin !== url.origin || entry.ready) return;
    entry.ready = true;
    send(entry);
  });
  window.addEventListener("i12e:themechange", () => frames.forEach(send));
  frames.forEach(entry => {
    const status = () => command(entry, {type: "i12e:command", action: "status"});
    entry.frame.addEventListener("load", () => {
      entry.ready = false;
      status();
    });
    status();
  });
})();
