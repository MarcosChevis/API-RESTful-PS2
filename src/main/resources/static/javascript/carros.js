window.onload = function () {
    callAPI("/api/carros", "GET", createcarros);
}

function createcarros(response, status) {

    if (!(status == 200 || status == 201)) {
        alert("Cannot Get The Elements");
        return
    }

    let html = "<div class='row' id='row-0'><div class='col'><h6>id</h6></div><div class='col'><h6>modelo</h6></div><div class='col'><h6>marca</h6></div><div class='col'><h6>Edit</h6></div></div>";
    response.forEach(element => {
        html = html + "<div id='id-" + element.id + "' class='row'>";                                     //start a table that is an element
        html = html + "<div id='id-from-" + element.id + "' class='col'>" + element.id + "</div>";        //add element id
        html = html + "<div id='modelo-from-" + element.id + "' class='col'>" + element.modelo + "</div>";  //add element modelo
        html = html + "<div id='marca-from-" + element.id + "' class='col'>" + element.marca + "</div>";//add element marca
        html = html + "<div id='button-from-" + element.id + "' class='col'>" + "<input type='button' value='inspect' onclick='inspect(" + element.id + ");'/>" + "</div>";
        html = html + "</div>";                                                              //end table of element
    });
    document.getElementById("elements-list").innerHTML = html;

}

function inspect(id) {

    console.log(id);
    url = "/api/carros/" + id;
    callAPI(url, "GET", function (response, status) {

        if (!(status == 200 || status == 201)) {
            alert("Cannot Inspect the Object");
        }

        document.getElementById("edit-id").value = response.id;
        document.getElementById("edit-modelo").value = response.modelo;
        document.getElementById("edit-marca").value = response.marca;
        document.getElementById("edit-ano").value = response.ano;
        document.getElementById("edit-categoria").value = response.categoria;
    });
}

function addElement() {

    elementToAdd = {
        "modelo": document.getElementById("add-modelo").value,
        "marca": document.getElementById("add-marca").value,
        "ano": document.getElementById("add-ano").value,
        "categoria": document.getElementById("add-categoria").value
    };
    console.log(elementToAdd);
    callAPI("/api/carros", "POST", function (response, status) {
        console.log(status);
        if (!(status == 200 || status == 201)) {
            alert("Cannot Add the Object Sent");
        }
        callAPI("/api/carros", "GET", createcarros);
    }, elementToAdd);
}

function editElement() {

    elementToAdd = {
        modelo: document.getElementById("edit-modelo").value,
        marca: document.getElementById("edit-marca").value,
        ano: document.getElementById("edit-ano").value,
        categoria: document.getElementById("edit-categoria").value
    };
    url = "/api/carros/" + document.getElementById("edit-id").value;
    console.log(elementToAdd);
    callAPI(url, "PUT", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Update to the Object Sent");
        }
        inspect(document.getElementById("edit-id").value);
        callAPI("/api/carros", "GET", createcarros);
    }, elementToAdd);

}

function removeElement() {

    url = "/api/carros/" + document.getElementById("edit-id").value;
    callAPI(url, "DELETE", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Delete the Object");
        }
        callAPI("/api/carros", "GET", createcarros);
    });
    document.getElementById("edit-id").value = "";
    document.getElementById("edit-modelo").value = "";
    document.getElementById("edit-marca").value = "";
    document.getElementById("edit-ano").value = "";
    document.getElementById("edit-categoria").value = "";

    
}

function filterElements() {

    url = "/api/carros/carro?marca=" + document.getElementById("filter-elements").value;
    callAPI(url, "GET", createcarros);
}