document.getElementById("take-screenshot").addEventListener("click", function () {
  // Function to take a screenshot and display a download link
  html2canvas(document.getElementById("mobile-container")).then(function (canvas) {
    // Convert canvas to a data URL
    var screenshotDataUrl = canvas.toDataURL("image/png");

    // Create a download link
    var downloadLink = document.getElementById("download-link");
    downloadLink.href = screenshotDataUrl;
    downloadLink.download = "screenshot.png";

    // Show the download link
    downloadLink.style.display = "block";

    // Show the save message
    var message = document.getElementById("save-message");
    message.style.display = "block";
  });
});
