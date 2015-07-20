
function registerWorker() {
    navigator.serviceWorker.register("./push-notifications-api-demo/js/sw.js", {scope: "./push-notifications-api-demo/js/"}).then(
            //function(sw) {
                //requestPermission();
            //},
            //function(err) {
                //console.log(err);
                //console.log(this.location.href);
            //}
            function(registration) {
                requestPermission();
                console.log(registration);
            }
    ).catch(function(err) {
        console.log(err);
        console.log(this.location.href);
    });
}

function requestPermission() {
    Notification.requestPermission(function(permission) {
        if (permission === "granted") {
            navigator.serviceWorker.ready.then(function(sw) {
                console.log("sw ready: " + sw);
                var push_manager = sw.pushManager;
                console.log("push_manager: " + push_mnager);
                push_manager.subscribe({userVisibileOnly: true}).then(function(ps) {
                    console.log(JSON.stringify(ps));
                    var endpoint = ps.endpoint;
                    console.log(endpoint);
                });
            });

            return;
        }

        console.log("Notification.requestpermission denied");
    });
}

function sendNotificationToPushService() {
    // TODO:
}
