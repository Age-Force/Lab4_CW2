if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function(registration){
        console.log("service worker Registered");
    })
    .catch(function(err){
        console.log("service worker failed to Register", err)
    })
}