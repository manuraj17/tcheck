const ERROR_CLASS = 'translation_missing';

let elements = document.getElementsByClassName(ERROR_CLASS);

if(elements.length) {
  let errors = Array.prototype.map.call(
    elements,
    element => ({
      key: element.title.split(":")[1],
      text: element.innerHTML
    })
  )

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
