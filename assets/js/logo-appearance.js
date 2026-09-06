/* Embedded artwork follows its reference page. A child announces readiness
   after loading its font; send the latest appearance once, then on changes. */
(() => {
  const frames = [...document.querySelectorAll("iframe[src^=\"./assets/images/logotype.svg\"]")];
  const ready = new Set();

  function send(frame) {
    const style = getComputedStyle(document.documentElement);
    frame.contentWindow.postMessage({
      type: "i12e:command", action: "appearance",
      theme: document.documentElement.dataset.theme,
      colors: {
        backgroundColor: style.getPropertyValue("--color-surface").trim().toLowerCase(),
        textColor: style.getPropertyValue("--color-text-primary").trim().toLowerCase(),
      },
    }, "*");
  }

  window.addEventListener("message", event => {
    const frame = frames.find(frame => frame.contentWindow === event.source);
    if (!frame || event.data?.type !== "i12e:state" || ready.has(frame)) return;
    ready.add(frame);
    send(frame);
  });
  window.addEventListener("i12e:themechange", () => ready.forEach(send));
  frames.forEach(frame => {
    const status = () => frame.contentWindow.postMessage({type: "i12e:command", action: "status"}, "*");
    frame.addEventListener("load", () => {
      ready.delete(frame);
      status();
    });
    status();
  });
})();
