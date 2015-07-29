
var BACKEND_SERVER = "http://swarm.cs.pub.ro:4443/~rbindar/robertbindar.github.io/push-notifications-api-demo/server";

function registerWorker() {
    navigator.serviceWorker.register("./js/sw.js", {scope: "./"}).then(
            function(registration) {
                requestPermission(registration);
                console.log(registration);
            }).catch(function(err) {
                console.log(err);
                console.log(this.location.href);
            });
}

function requestPermission(swRegistration) {
    Notification.requestPermission(function(permission) {
        if (permission === "granted") {
            console.log("permission granted");
            console.log("sw ready: " + swRegistration);
            var push_manager = swRegistration.pushManager;
            console.log("push_manager: " + push_manager);
            push_manager.subscribe({userVisibileOnly: true}).then(function(ps) {
                console.log(ps.endpoint);

                postEndpointToServer(ps.endpoint);
            }).catch(function(e) {
                console.log("subscribe error");
                console.log(e);
            });

            return;
        }

        console.log("Notification.requestpermission denied");
    });
}

function postEndpointToServer(endpoint) {
    console.log("sending endpoint server");
    var data = new FormData();
    data.append("endpoint", endpoint);

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("successfully sent the endpoint");
        } else {
            console.log("received error from server");
        }
    };
    xhr.onerror = function() {
        console.log("error while sending endpoint to backend");
    };
    xhr.open('POST', BACKEND_SERVER);
    xhr.send(data);

}

function sendNotificationToPushService() {
    console.log("send Notification to push server");
    var data = new FormData();
    data.append("broadcastNotification", "");

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("notification was successfully sent");
        } else {
            console.log("received error from server");
        }
    };
    xhr.onerror = function() {
        console.log("error while sending broadcastNotification to server");
    };
    xhr.open('POST', BACKEND_SERVER);
    xhr.send(data);
}

function unsubscribeServiceWorker() {
    navigator.serviceWorker.getRegistration("./js/").then(function(reg) {
        console.log("calling getSubscription()");
        reg.pushManager.getSubscription().then(function(subscription) {
            console.log("calling unsubscribe");
            subscription.unsubscribe().then(function(successful) {
                console.log("successfully unsubscribed");
            }).catch(function(e) {
                console.log("unsubscribe failed");
                console.log(e);
            });
        });
    });
}
