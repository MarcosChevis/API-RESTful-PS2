var urlBase = "/api/";

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url, true);
    if (method == "POST" || method == "PATCH") {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function() {
        callback(xhr.response, xhr.status);
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}