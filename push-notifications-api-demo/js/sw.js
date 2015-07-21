"use strict";

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

    evt.waitUntil(clients.matchAll({
        type: "window",
        includeUncontrolled: true
    }).then(function(clientList) {
        // TODO: client.focus()
    }));
});

console.log('Logged from inside SW');

