
async function getUserPermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true })
    closePopup('allowed');
  } catch (error) {
    console.error("Error requesting microphone permission", error)
    closePopup('notAllowed');
  }
}

function closePopup(micStatus) {
  window.close();
  chrome.runtime.sendMessage({micStatus});  
}
getUserPermission()

