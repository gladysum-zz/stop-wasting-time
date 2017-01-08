// Saves options to chrome.storage.sync.
function save_options() {
  var startTime = document.getElementById('start-time').value;
  var endTime = document.getElementById('end-time').value;
  var startDay = document.getElementById('start-day').value;
  var endDay = document.getElementById('end-day').value;
  
  chrome.storage.sync.set({
    startTime: startTime,
    endTime: endTime,
    startDay: startDay,
    endDay: endDay
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    startTime, 
    endTime,
    startDay, 
    endDay
  }, function(items) {
    document.getElementById('start-time').value = items.startTime;
    document.getElementById('end-time').value = items.endTime;
    document.getElementById('start-day').value = items.startDay;
    document.getElementById('end-day').value = items.endDay;
    
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);