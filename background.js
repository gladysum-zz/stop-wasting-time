'use strict';

//Retrieve user preferences.
var startTime, endTime, startDay, endDay, websites;
chrome.storage.sync.get({
  startTime: '',
  endTime: '',
  startDay: '',
  endDay: '',
  websites: ''
}, function(items) {
  startTime = items.startTime;
  endTime = items.endTime;
  startDay = items.startDay;
  endDay = items.endDay;
  websites = items.websites;
  var urlsArray = websites.split(",").map(function(url){return "*://*." + url.trim() + "/*"});
  console.log(urlsArray);
  chrome.webRequest.onBeforeRequest.addListener(
      function () {
          var currentTime = new Date();
          var hour = currentTime.getHours();
          var day = currentTime.getDay();
          // Add logic. If startTime > endTime, if startDay > endDay, undefined, etc.
          if (hour >= startTime && hour <= endTime && day >= startDay  && day <= endDay) {
              return {redirectUrl: chrome.extension.getURL('index.html')};
          }
      },

      {
          urls: urlsArray,


          types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
      },

      ["blocking"]
  );

});






