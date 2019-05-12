chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "update_count") {
      chrome.browserAction.setBadgeText({text: request.count});

      chrome.storage.sync.set({errors: request.errors}, function() {
        console.log("errors stored");
      });
    }
  }
);
