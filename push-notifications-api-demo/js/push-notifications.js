
var g_endpoint;

function registerWorker() {
    navigator.serviceWorker.register("./js/sw.js", {scope: "./js/"}).then(
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
                console.log(JSON.stringify(ps));
                g_endpoint = ps.endpoint;
                console.log(g_endpoint);
                // TODO: send {user: endpoint mapping}

            });

            return;
        }

        console.log("Notification.requestpermission denied");
    });
}

function sendNotificationToPushService() {
    console.log("send Notification to push server");
    var data = new FormData();
    data.append("version", "5");

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("notification was successfully send");
        } else {
            console.log("received error from push server");
        }
    };
    xhr.onerror = function() {
        console.log("error while sending to push server endpoint");
    };
    xhr.open('POST', "https://swarm.cs.pub.ro:4443/~rbindar/robertbindar.github.io/push-notifications-api-demo/server");
    xhr.send(data);
}

function unsibscribeServiceWorker() {
    navigator.serviceWorker.getRegistration("/push-notifications-api-demo/js/").then(function(reg) {
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
