const languageButton = document.querySelector("#language");
let language = "en";
try {
  language = localStorage.getItem("homepage-language") === "zh" ? "zh" : "en";
} catch {}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-en]").forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageButton.textContent = language === "zh" ? "EN" : "中文";
  languageButton.setAttribute(
    "aria-label",
    language === "zh" ? "Switch to English" : "切换到中文",
  );
  document.querySelector("#copy-status").textContent = "";
  try {
    localStorage.setItem("homepage-language", language);
  } catch {}
}

languageButton.addEventListener("click", () =>
  setLanguage(language === "en" ? "zh" : "en"),
);
setLanguage(language);

const citationToggle = document.querySelector("#citation-toggle");
const citation = document.querySelector("#citation");
citationToggle.addEventListener("click", () => {
  citation.hidden = !citation.hidden;
  citationToggle.setAttribute("aria-expanded", String(!citation.hidden));
});

document.querySelector("#copy-citation").addEventListener("click", async () => {
  const code = citation.querySelector("code");
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(code.textContent);
    status.textContent = language === "zh" ? "已复制" : "Copied";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent =
      language === "zh"
        ? "已选中，请按 Ctrl/Cmd+C 复制"
        : "Selected. Press Ctrl/Cmd+C to copy.";
  }
});
