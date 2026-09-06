/* Run before styles load to apply the system appearance before first paint. */
(() => {
  let preference;
  let manual = false;
  try {
    preference = window.matchMedia("(prefers-color-scheme: dark)");
  } catch {
    // Missing or unavailable system preference: retain the light fallback.
  }

  const systemTheme = () => preference?.matches ? "dark" : "light";

  function apply(theme) {
    document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
    window.dispatchEvent(new Event("i12e:themechange"));
  }

  function followSystem() {
    if (!manual) apply(systemTheme());
  }

  window.i12eAppearance = {
    bind(select, onChange = () => {
    }) {
      const sync = () => {
        select.value = document.documentElement.dataset.theme;
        onChange(select.value);
      };
      select.addEventListener("change", () => {
        manual = true;
        apply(select.value);
      });
      window.addEventListener("i12e:themechange", sync);
      sync();
    },
    reset() {
      manual = false;
      followSystem();
    },
  };

  followSystem();
  if (preference?.addEventListener) preference.addEventListener("change", followSystem);
  else if (preference?.addListener) preference.addListener(followSystem);
})();
