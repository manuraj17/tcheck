const ERROR_CLASS = 'translation_missing';

let elements = document.getElementsByClassName(ERROR_CLASS);

if(elements.length) {
  let errors = [];
  let parsedErrors = new Map();

  Array.prototype.map.call(elements, (error) => {
    if(parsedErrors.get(error.innerHTML) == undefined){
      // Error not yet parsed
      errors.push(
        {
          text: error.innerHTML,
          key: error.title.split(":")[1]
        }
      )

      parsedErrors.set(error.innerHTML, true);
    }
  })

  sendErrors(errors);
} else {
  sendErrors([]);
}

function sendErrors(errors) {
  chrome.runtime.sendMessage({
    "message": "update_count",
    "count": ''+errors.length+'',
    "errors": errors
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message == "highlight") {
      let elements = document.getElementsByClassName(ERROR_CLASS);

      let element = Array.prototype.forEach.call(elements, (element) => {
        if(element.innerHTML == request.data){
          element.style.border = '1px solid red';
        }
      });
    }
    sendResponse({data: request.data, success: true});
  }
);
