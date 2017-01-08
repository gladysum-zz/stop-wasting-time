'use strict';

//Retrieve user preferences.
var startTime, endTime, startDay, endDay, websites;
chrome.storage.sync.get({
  startTime: '0',
  endTime: '23',
  startDay: '0',
  endDay: '6',
  websites: ''
}, function(items) {
  startTime = items.startTime;
  endTime = items.endTime;
  startDay = items.startDay;
  endDay = items.endDay;
  websites = items.websites;
});

var urlsArray = websites.split(",").map(function(website){return "*://*." +website+ "/*"});

//Redirect to the "Stop Wasting Time" page before request to a blocked website occurs.
chrome.webRequest.onBeforeRequest.addListener(    
    function () {
        var currentTime = new Date();
        var hour = currentTime.getHours();
        var day = currentTime.getDay();
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
     




