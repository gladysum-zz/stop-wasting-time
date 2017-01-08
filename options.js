// Save options to chrome.storage.sync.
function save_options() {
  var startTime = document.getElementById('start-time').value;
  var endTime = document.getElementById('end-time').value;
  var startDay = document.getElementById('start-day').value;
  var endDay = document.getElementById('end-day').value;
  var websites = document.getElementById('websites').value;

  chrome.storage.sync.set({
    startTime: startTime,
    endTime: endTime,
    startDay: startDay,
    endDay: endDay,
    websites: websites
  }, function() {
    
    // Display a message saying options were saved, then reload the extension.
    var status = document.getElementById('status');
    status.textContent = "Options saved.";
    setTimeout(function() {
      status.textContent = '';
      chrome.runtime.reload();
    }, 2000);
    
  });
}

// Populate the options form with data stored in chrome.storage.
function retrieve_options() {
  chrome.storage.sync.get({
    startTime: '1',
    endTime: '23',
    startDay: '1',
    endDay: '6',
    websites: ''
  }, function(items) {
    document.getElementById('start-time').value = items.startTime;
    document.getElementById('end-time').value = items.endTime;
    document.getElementById('start-day').value = items.startDay;
    document.getElementById('end-day').value = items.endDay;
    document.getElementById('websites').value = items.websites;
  });
}

document.addEventListener('DOMContentLoaded', retrieve_options);
document.getElementById('save').addEventListener('click',
    save_options);