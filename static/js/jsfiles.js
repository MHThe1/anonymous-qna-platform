function copyToClipboard(copyTextId, shareInstagramId) {
  // Log to the console to check if the function is being called
  console.log("copyToClipboard called with copyTextId: " + copyTextId + " and shareInstagramId: " + shareInstagramId);

  // Get the input element containing the text to copy
  var copyText = document.getElementById(copyTextId);

  // Select the text inside the input element
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Log to the console to check if the copy operation is successful
  console.log("Copied to clipboard: " + copyText.value);

  // Show the "Share to Instagram Story" button
  var instagramButton = document.getElementById(shareInstagramId);
  instagramButton.style.display = "block";

  // Log to the console to check if the button display property is being changed
  console.log("Instagram button display set to block: " + shareInstagramId);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
