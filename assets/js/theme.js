const storedTheme = localStorage.getItem("theme");

const getPreferredTheme = () => {
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const setTheme = (theme) => {
  document.documentElement.setAttribute(
    "data-bs-theme",
    theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : theme
  );
};

setTheme(getPreferredTheme());

const showActiveTheme = (theme) => {
  const btnToActive = document.querySelector(
    `[data-bs-theme-value="${theme}"]`
  );
  document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
    element.classList.remove("active");
  });
  btnToActive.classList.add("active");

  const modeIcon = document.querySelector(".theme-icon-active");
  modeIcon.className = "fa-solid theme-icon-active fa-fw"; // Resetear las clases
  if (theme === "light") {
    modeIcon.classList.add("fa-sun");
  } else if (theme === "dark") {
    modeIcon.classList.add("fa-moon");
  } else {
    modeIcon.classList.add("fa-circle-half");
  }
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (!["light", "dark"].includes(storedTheme)) {
      setTheme(getPreferredTheme());
      showActiveTheme(getPreferredTheme());
    }
  });

showActiveTheme(getPreferredTheme());

document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const theme = toggle.getAttribute("data-bs-theme-value");
    localStorage.setItem("theme", theme);
    setTheme(theme);
    showActiveTheme(theme);
  });
});
