window.onload = function () {
    callAPI("/api/computadores", "GET", createComputadores);
}

function createComputadores(response, status) {

    if (!(status == 200 || status == 201)) {
        alert("Cannot Get The Elements");
        return
    }

    let html = "<div class='row' id='row-0'><div class='col'><h6>id</h6></div><div class='col'><h6>Marca</h6></div><div class='col'><h6>Processador</h6></div><div class='col'><h6>Edit</h6></div></div>";
    response.forEach(element => {
        html = html + "<div id='id-" + element.id + "' class='row'>";                                     //start a table that is an element
        html = html + "<div id='id-from-" + element.id + "' class='col'>" + element.id + "</div>";        //add element id
        html = html + "<div id='marca-from-" + element.id + "' class='col'>" + element.marca + "</div>";  //add element marca
        html = html + "<div id='processador-from-" + element.id + "' class='col'>" + element.processador + "</div>";//add element processador
        html = html + "<div id='button-from-" + element.id + "' class='col'>" + "<input type='button' value='inspect' onclick='inspect(" + element.id + ");'/>" + "</div>";
        html = html + "</div>";                                                              //end table of element
    });
    document.getElementById("elements-list").innerHTML = html;

}

function inspect(id) {

    console.log(id);
    url = "/api/computadores/" + id;
    callAPI(url, "GET", function (response, status) {

        if (!(status == 200 || status == 201)) {
            alert("Cannot Inspect the Object");
        }

        document.getElementById("edit-id").value = response.id;
        document.getElementById("edit-marca").value = response.marca;
        document.getElementById("edit-processador").value = response.processador;
        document.getElementById("edit-qtdRamMB").value = response.qtdRamMB;
        document.getElementById("edit-tamanhoDiscoGB").value = response.tamanhoDiscoGB;
    });
}

function addElement() {

    elementToAdd = {
        "marca": document.getElementById("add-marca").value,
        "processador": document.getElementById("add-processador").value,
        "qtdRamMB": document.getElementById("add-qtdRamMB").value,
        "tamanhoDiscoGB": document.getElementById("add-tamanhoDiscoGB").value
    };
    console.log(elementToAdd);
    callAPI("/api/computadores", "POST", function (response, status) {
        console.log(status);
        if (!(status == 200 || status == 201)) {
            alert("Cannot Add the Object Sent");
        }
        callAPI("/api/computadores", "GET", createComputadores);
    }, elementToAdd);
}

function editElement() {

    elementToAdd = {
        marca: document.getElementById("edit-marca").value,
        processador: document.getElementById("edit-processador").value,
        qtdRamMB: document.getElementById("edit-qtdRamMB").value,
        tamanhoDiscoGB: document.getElementById("edit-tamanhoDiscoGB").value
    };
    url = "/api/computadores/" + document.getElementById("edit-id").value;
    console.log(elementToAdd);
    callAPI(url, "PUT", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Update to the Object Sent");
        }
        inspect(document.getElementById("edit-id").value);
        callAPI("/api/computadores", "GET", createComputadores);
    }, elementToAdd);

}

function removeElement() {

    url = "/api/computadores/" + document.getElementById("edit-id").value;
    callAPI(url, "DELETE", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Delete the Object");
        }
        callAPI("/api/computadores", "GET", createComputadores);
    });
    document.getElementById("edit-id").value = "";
    document.getElementById("edit-marca").value = "";
    document.getElementById("edit-processador").value = "";
    document.getElementById("edit-qtdRamMB").value = "";
    document.getElementById("edit-tamanhoDiscoGB").value = "";

    
}

function filterElements() {

    url = "/api/computadores/computador?marca=" + document.getElementById("filter-elements").value;
    callAPI(url, "GET", createComputadores);
}