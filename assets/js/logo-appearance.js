/* Embedded artwork owns its palette and follows the reference page's mode. A child announces readiness
   after loading its font; send the latest appearance once, then on changes. Opted-in frames also fit
   their container to the artwork's intrinsic aspect ratio. Load this helper in the head so the
   browser's initial iframe canvas stays hidden until the artwork confirms its appearance. */
(() => {
  document.documentElement.setAttribute("data-logo-loading", "");

  function bindPreviews() {
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
      .map(frame => ({frame, url: logoURL(frame), ready: false, intrinsicSize: null, fitURL: null}))
      .filter(entry => entry.url);

    function currentURL(entry) {
      const url = logoURL(entry.frame);
      if (url?.href !== entry.url?.href) {
        entry.ready = false;
        entry.frame.removeAttribute("data-logo-ready");
      }
      entry.url = url;
      return url;
    }

    function command(entry, message) {
      const url = currentURL(entry);
      if (!url || !entry.frame.contentWindow) return;
      // File destinations require '*', regardless of how URL.origin is serialized.
      entry.frame.contentWindow.postMessage(message, url.protocol === "file:" ? "*" : url.origin);
    }

    function send(entry) {
      if (!currentURL(entry) || !entry.ready) return;
      command(entry, {
        type: "i12e:command", action: "appearance",
        theme: document.documentElement.dataset.theme,
      });
    }

    function resetFit(entry) {
      if (entry.intrinsicSize) entry.frame.style.removeProperty("--logo-aspect-ratio");
      entry.intrinsicSize = null;
      entry.fitURL = null;
    }

    function fit(entry, url, size) {
      if (!entry.frame.hasAttribute("data-logo-fit")) {
        resetFit(entry);
        return;
      }
      // A replacement SVG that does not report sizing must use the CSS fallback.
      if (entry.fitURL && entry.fitURL !== url.href) resetFit(entry);
      entry.fitURL = url.href;
      if (!size || ![size.width, size.height].every(value =>
        typeof value === "number" && Number.isFinite(value) && value > 0)) return;
      if (entry.intrinsicSize?.width === size.width && entry.intrinsicSize?.height === size.height) return;
      entry.frame.style.setProperty("--logo-aspect-ratio", `${size.width} / ${size.height}`);
      entry.intrinsicSize = {width: size.width, height: size.height};
    }

    window.addEventListener("message", event => {
      const entry = frames.find(entry => entry.frame.contentWindow === event.source);
      if (!entry || event.data?.type !== "i12e:state") return;
      const url = currentURL(entry);
      if (!url) return;
      // Browsers can serialize a file message's origin differently from URL.origin.
      // This exception applies only to a recognized file SVG in its exact window.
      const matchesOrigin = event.origin === url.origin
        || (url.protocol === "file:" && ["null", "file://"].includes(event.origin));
      if (!matchesOrigin) return;
      fit(entry, url, event.data.intrinsicSize);
      if (!entry.ready) {
        entry.ready = true;
        send(entry);
      }
      // A generic readiness message can still describe the previous appearance.
      // Keep the reserved space hidden until the child has painted the current one.
      if (!entry.frame.hasAttribute("data-logo-ready")
        && event.data.appearance?.theme === document.documentElement.dataset.theme) {
        entry.frame.setAttribute("data-logo-ready", "");
      }
    });
    window.addEventListener("i12e:themechange", () => frames.forEach(send));
    frames.forEach(entry => {
      const status = () => command(entry, {type: "i12e:command", action: "status"});
      entry.frame.addEventListener("load", () => {
        entry.ready = false;
        entry.frame.removeAttribute("data-logo-ready");
        resetFit(entry);
        status();
      });
      status();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindPreviews, {once: true});
  } else bindPreviews();
})();
