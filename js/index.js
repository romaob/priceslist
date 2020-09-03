if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/PwaPricesList/sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}

let deferredPrompt;
const addBtn = document.getElementById('btn_add');
addBtn.style.display = "none";

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("beforeinstallprompt");
  addBtn.style.display = "block";
  addBtn.addEventListener('click', (e) => {    
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          addBtn.style.display = "none";
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});