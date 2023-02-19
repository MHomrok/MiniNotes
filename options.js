// Saves options to chrome.storage
function save_options() {
    var font = document.getElementById('input-font').value;
    var fontsize = document.getElementById('input-fontsize').value;
    chrome.storage.sync.set({
      selectedFont: font,
      selectedFontSize: fontsize
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
// Restores select box using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value
  chrome.storage.sync.get({
    selectedFont: "Select Font",
    selectedFontSize: "Select Font Size",
  }, function(items) {
    document.getElementById('input-font').value = items.selectedFont;
    document.getElementById('input-fontsize').value = items.selectedFontSize;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById("save").addEventListener("click", save_options);

document.getElementById("reset").addEventListener("click", function () {
  chrome.storage.sync.remove("selectedFont")
  chrome.storage.sync.remove("selectedFontSize")
  localStorage.removeItem("page")
  location.reload();
})