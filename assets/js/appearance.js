/* Run before styles load to apply appearance before first paint.
   Pages opt into persistence with data-appearance-storage-key on this script. */
(() => {
  const storageKey = document.currentScript?.dataset.appearanceStorageKey;
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

  function save(theme) {
    if (!storageKey) return;
    try {
      if (theme === null) window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, theme);
    } catch {
      // Storage may be unavailable; the current page still follows the control.
    }
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
        save(document.documentElement.dataset.theme);
      });
      window.addEventListener("i12e:themechange", sync);
      sync();
    },
    reset() {
      manual = false;
      save(null);
      followSystem();
    },
  };

  let savedTheme;
  if (storageKey) {
    try {
      savedTheme = window.localStorage.getItem(storageKey);
    } catch {
      // Fall back to the system if storage access is blocked.
    }
  }
  if (savedTheme === "light" || savedTheme === "dark") {
    manual = true;
    apply(savedTheme);
  } else {
    followSystem();
  }
  if (preference?.addEventListener) preference.addEventListener("change", followSystem);
  else if (preference?.addListener) preference.addListener(followSystem);
})();
