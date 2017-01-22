'use strict';

//Retrieve user preferences, then execute a callback function that redirects to the "Stop wasting time page" if user navigates to a specified website during specified time.
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
  chrome.webRequest.onBeforeRequest.addListener(
    function () {
      var currentTime = new Date();
      var hour = currentTime.getHours();
      var day = currentTime.getDay();

      if (startTime < endTime && startDay < endDay){
        if (hour >= startTime && hour < endTime && day >= startDay  && day <= endDay) {
          return {redirectUrl: chrome.extension.getURL('index.html')};
        }
      }

      if (startTime > endTime && startDay < endDay){
        if (hour >= startTime || hour < endTime && day >= startDay  && day <= endDay) {
          return {redirectUrl: chrome.extension.getURL('index.html')};
        }
      }

      if (startTime < endTime && startDay > endDay){
        if (hour >= startTime && hour < endTime && day >= startDay || day <= endDay) {
          return {redirectUrl: chrome.extension.getURL('index.html')};
        }
      }

      if (startTime > endTime && startDay > endDay){
        if (hour >= startTime || hour < endTime && day >= startDay || day <= endDay) {
          return {redirectUrl: chrome.extension.getURL('index.html')};
        }
      }

    },

    {
      urls: urlsArray,
      types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },

    ["blocking"]
  );

});






