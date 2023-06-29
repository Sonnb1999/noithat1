
$(document).ready(async function () {

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


    let dataJsonApi = {}

    await $.getJSON('https://jsonip.com/?callback=?').done(function (data) {
        var ip_address = window.JSON.parse(JSON.stringify(data, null, 2));
        dataJsonApi = ip_address;
        alert(ip_address.ip)
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (Object.keys(utmParams).length != 0 && utmParams.constructor === Object && 
    Object.keys(dataJsonApi).length != 0 && dataJsonApi.constructor === Object) {
        await fetch("https://3323-58-187-249-149.ngrok-free.app/get/back", {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            credentials: "same-origin",
            headers: myHeaders,
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "params": {
                    "full_url": full_url,
                    "utm": utmParams,
                    "ip_client": dataJsonApi.ip,
                    "country": dataJsonApi.country,
                    "url": full_url.split('?')[0],
                }
            }),
        })
            .then(response => response.text())
            .then(result => alert(result))
            .catch(error => alert('error', error));
    }

});