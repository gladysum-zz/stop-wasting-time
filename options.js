// Save options to chrome.storage.sync.
function save_options() {
  var startTime = document.getElementById('start-time').value;
  var endTime = document.getElementById('end-time').value;
  var startDay = document.getElementById('start-day').value;
  var endDay = document.getElementById('end-day').value;
  var websites = document.getElementById('websites').value;
  var always = document.getElementById('check-box').checked;

  chrome.storage.sync.set({
    startTime: startTime,
    endTime: endTime,
    startDay: startDay,
    endDay: endDay,
    websites: websites,
    always: always
  }, function() {

    // Display a message saying options were saved, then reload the extension.

    var status = document.getElementById('status');
    status.textContent = "Settings were saved.";
    setTimeout(function() {
      status.textContent = '';
    }, 20000);
    chrome.runtime.reload();

  });
}

// Populate the options form with data stored in chrome.storage.
function retrieve_options() {
  chrome.storage.sync.get({
    startTime: '',
    endTime: '',
    startDay: '',
    endDay: '',
    websites: '',
    always: ''
  }, function(items) {
    document.getElementById('start-time').value = items.startTime;
    document.getElementById('end-time').value = items.endTime;
    document.getElementById('start-day').value = items.startDay;
    document.getElementById('end-day').value = items.endDay;
    document.getElementById('websites').value = items.websites;
    document.getElementById('check-box').checked = items.always;
  });
}

document.addEventListener('DOMContentLoaded', retrieve_options);
document.getElementById('save').addEventListener('click',
    save_options);