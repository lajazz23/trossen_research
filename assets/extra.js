document.querySelectorAll("#mkdocs-terminal-content pre").forEach((block) => {
  const button = document.createElement("button");
  button.className = "copy-button";
  button.textContent = "Copy";

  block.style.position = "relative";
  block.appendChild(button);

  button.addEventListener("click", () => {
    const code = block.querySelector("code").innerText;
    navigator.clipboard.writeText(code);

    button.textContent = "Copied!";
    setTimeout(() => (button.textContent = "Copy"), 1500);
  });
});