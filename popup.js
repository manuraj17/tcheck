document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get('errors', function(data) {
    if (data.errors.length) {
      $('#error-table tbody').append(data.errors.map(renderTableRow));

      let buttons = document.getElementsByClassName('hl-em');

      Array.prototype.forEach.call(buttons, (button) => {

        button.addEventListener('click', function(){
          text = button.getAttribute('data-text');
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              {data: text, message:"highlight"},
              function(response) { console.log('Hihglighting done'); }
            )
          })
        })
      })
    } else {
      $('#error-table tbody').append("None found");
    }

    return true;
  });
});

function renderTableRow(error) {
  return `<tr>
              <td>${error.text}</td>
              <td>${error.key}</td>
              <td>${highlighButton(error.text)}</td>
          </tr>`
}

function highlighButton(text) {
  return `<button class="hl-em" data-text="${text}">Highlight</button>`
}

