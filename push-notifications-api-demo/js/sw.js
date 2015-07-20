"use strict";

var baseUrl = new URL("/", this.location.href) + "";

this.addEventListener("install", function(evt) {
    console.log("SW oninstall");
});

this.addEventListener("activate", function(evt) {
    console.log("SW onactivate");
    evt.waitUntil(self.clients.claim());
});

this.addEventListener('push', function(evt) {
    console.log("worker: received push");
    var title = "new Notification";
    var options = {
        body: 'test body',
        tag: 'testtag'
    };

    self.registration.showNotification(title, options);
});

this.addEventListener('notificationclick', function(evt) {
    console.log("worker: notificationclick");
    evt.notification.close();

    // Enumerate windows, and call window.focus(), or open a new one.
    evt.waitUntil(clients.matchAll({
        type: "window",
        includeUncontrolled: true
    }).then(function(clientList) {
        //for (var i = 0; i < clientList.length; i++) {
            //var client = clientList[i];
            //if (client.focus)
                //return client.focus();
        //}
        //if (clients.openWindow)
            //return clients.openWindow("/chat/");
    }));
});

console.log('Logged from inside SW');

