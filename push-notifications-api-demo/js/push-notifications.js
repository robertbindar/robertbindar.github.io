
function registerWorker() {
    navigator.serviceWorker.register("/js/sw.js", {scope: "/js/"}).then(
            function(sw) {
                requestPermission();
            },
            function(err) {
                console.log(err);
            }
    );
}

function requestPermission() {
    Notification.requestPermission(function() {
        if (permission === "granted") {
            navigator.serviceWorker.ready.then(function(sw) {
                var push_manager = sw.pushManager;
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
