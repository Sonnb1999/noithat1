$(document).ready(function () {

    let full_url = window.location.href
    let utmParams = {}
    console.log(full_url)
    if (full_url.split('?')[1] != null) {
        const params = new URLSearchParams(full_url.split('?')[1]);
        for (const [key, val] of params) {
            // check for prefix
            if (key.startsWith('utm_')) {
                utmParams[key] = val;

            }
        }

    }
    document.cookie = "odoo_utm_source=" + utmParams['utm_source']
    document.cookie = "odoo_utm_campaign=" + utmParams['utm_campaign']
    document.cookie = "odoo_utm_medium=" + utmParams['utm_medium']
    console.log('utmParams', utmParams)

    myHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        
    }
   
    var raw = JSON.stringify({
        "jsonrpc": "2.0",
        "params": {
            "name": "Kathy"
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://81e7-58-187-249-149.ngrok-free.app/get/back", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
          },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer",
        body: raw,
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

});