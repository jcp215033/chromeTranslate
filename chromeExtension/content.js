function translateText(text, srcLang, destLang) {
  const payload = {
    text: text,
    src: srcLang,
    dest: destLang,
  };

  fetch("http://127.0.0.1:5000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      replaceSelectedText(data.translatedText);
    })
    .catch((error) => console.error("Error translating text:", error));
}

function replaceSelectedText(translatedText) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const selectedElement =
    range.commonAncestorContainer.nodeType === 3
      ? range.commonAncestorContainer.parentNode
      : range.commonAncestorContainer;

  function replaceTextInNode(node) {
    if (node.nodeType === 3) {
      node.textContent = translatedText;
    } else if (node.nodeType === 1) {
      Array.from(node.childNodes).forEach(replaceTextInNode);
    }
  }

  replaceTextInNode(selectedElement);

  selection.removeAllRanges();
}

document.addEventListener("mouseup", function (event) {
  const selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    chrome.storage.local.get(["destLang"], function (result) {
      const srcLang = "auto";
      const destLang = result.destLang || "en";
      translateText(selectedText, srcLang, destLang);
    });
  }
});
