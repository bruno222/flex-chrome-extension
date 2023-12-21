function showFlex() {
  // document.getElementById("iframe").src = 'https://flex.twilio.com'
  document.getElementById("iframe").src = 'http://localhost:3000/agent-desktop/'
}

function showMicNotGranted() {
  location.href = 'explainHowToEnableMic.html'
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('@@@ onMessage received', request, sender)
  const {micStatus} = request;

  if (micStatus === "allowed") {
    showFlex();
    return
  }
  if (micStatus === 'notAllowed') {
    chrome.tabs.create({ url: "chrome://settings/content/microphone" });
    showMicNotGranted();
    return
  }

  // sendResponse({farewell: "goodbye2"});
});

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(a => showFlex())
    .catch(e => {
        navigator.permissions.query({name: "microphone"}).then(res => {
          console.log('Mic state:',res);

          // Open a popup to ask for permission
          if (res.state == "prompt") {
            chrome.windows.create({
              url: "askMicrophonePermission.html",
              type: "popup",
              height: 200,
              width: 300,
            });
            return;
          }

          // If permission was denied before, open the settings page
          if (res.state == "denied") {            
            showMicNotGranted();            
            return;
          }

        });        
    });