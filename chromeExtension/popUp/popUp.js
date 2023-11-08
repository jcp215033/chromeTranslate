document.addEventListener(
  "DOMContentLoaded",
  function () {
    var translateButton = document.getElementById("translate-button");
    translateButton.addEventListener(
      "click",
      function () {
        var srcLang = document.getElementById("srcLang").value || "auto"; // If no input, use 'auto' detection
        var destLang = document.getElementById("destLang").value || "en"; // Default to English if no input

        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
              action: "translate",
              srcLang: srcLang,
              destLang: destLang,
            });
          }
        );
      },
      false
    );
  },
  false
);
