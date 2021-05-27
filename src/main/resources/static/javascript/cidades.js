window.onload = function () {
    callAPI("/api/cidades", "GET", createcidades);
}

function createcidades(response, status) {

    if (!(status == 200 || status == 201)) {
        alert("Cannot Get The Elements");
        return
    }

    let html = "<div class='row' id='row-0'><div class='col'><h6>id</h6></div><div class='col'><h6>nome</h6></div><div class='col'><h6>estado</h6></div><div class='col'><h6>Edit</h6></div></div>";
    response.forEach(element => {
        html = html + "<div id='id-" + element.id + "' class='row'>";                                     //start a table that is an element
        html = html + "<div id='id-from-" + element.id + "' class='col'>" + element.id + "</div>";        //add element id
        html = html + "<div id='nome-from-" + element.id + "' class='col'>" + element.nome + "</div>";  //add element nome
        html = html + "<div id='estado-from-" + element.id + "' class='col'>" + element.estado + "</div>";//add element estado
        html = html + "<div id='button-from-" + element.id + "' class='col'>" + "<input type='button' value='inspect' onclick='inspect(" + element.id + ");'/>" + "</div>";
        html = html + "</div>";                                                              //end table of element
    });
    document.getElementById("elements-list").innerHTML = html;

}

function inspect(id) {

    console.log(id);
    url = "/api/cidades/" + id;
    callAPI(url, "GET", function (response, status) {

        if (!(status == 200 || status == 201)) {
            alert("Cannot Inspect the Object");
        }

        document.getElementById("edit-id").value = response.id;
        document.getElementById("edit-nome").value = response.nome;
        document.getElementById("edit-estado").value = response.estado;
        document.getElementById("edit-pais").value = response.pais;
        document.getElementById("edit-populacao").value = response.populacao;
    });
}

function addElement() {

    elementToAdd = {
        "nome": document.getElementById("add-nome").value,
        "estado": document.getElementById("add-estado").value,
        "pais": document.getElementById("add-pais").value,
        "populacao": document.getElementById("add-populacao").value
    };
    console.log(elementToAdd);
    callAPI("/api/cidades", "POST", function (response, status) {
        console.log(status);
        if (!(status == 200 || status == 201)) {
            alert("Cannot Add the Object Sent");
        }
        callAPI("/api/cidades", "GET", createcidades);
    }, elementToAdd);
}

function editElement() {

    elementToAdd = {
        nome: document.getElementById("edit-nome").value,
        estado: document.getElementById("edit-estado").value,
        pais: document.getElementById("edit-pais").value,
        populacao: document.getElementById("edit-populacao").value
    };
    url = "/api/cidades/" + document.getElementById("edit-id").value;
    console.log(elementToAdd);
    callAPI(url, "PUT", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Update to the Object Sent");
        }
        inspect(document.getElementById("edit-id").value);
        callAPI("/api/cidades", "GET", createcidades);
    }, elementToAdd);

}

function removeElement() {

    url = "/api/cidades/" + document.getElementById("edit-id").value;
    callAPI(url, "DELETE", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Delete the Object");
        }
        callAPI("/api/cidades", "GET", createcidades);
    });
    document.getElementById("edit-id").value = "";
    document.getElementById("edit-nome").value = "";
    document.getElementById("edit-estado").value = "";
    document.getElementById("edit-pais").value = "";
    document.getElementById("edit-populacao").value = "";

    
}

function filterElements() {

    url = "/api/cidades/cidade?pais=" + document.getElementById("filter-elements").value;
    callAPI(url, "GET", createcidades);
}