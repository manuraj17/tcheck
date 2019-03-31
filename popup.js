document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get('errors', function(data) {
    if (data.errors.length) {
      $('#error-table tbody').append(data.errors.map(renderTableRow));
    } else {
      $('#error-table tbody').append("None found");
    }
  });
});

function renderTableRow(error) {
  return `<tr>
              <td>${error.text}</td>
              <td>${error.key}</td>
          </tr>`
}

