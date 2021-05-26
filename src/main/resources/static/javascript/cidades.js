window.onload = function () {
    callAPI("/api/cidades", "GET", createCidades);
}

function createCidades(response, status) {

    if (!(status == 200 || status == 201)) {
        alert("Cannot Create This Element");
        return
    }

    let html = "";
    response.forEach(element => {
        html = html + "<div id='element" + element.id + "'>"                                 //star a line in table of all elements
        html = html + "<div id='id-" + element.id + "'>";                                     //start a table that is an element
        html = html + "<div id='id-from-" + element.id + "'>" + element.id + "</div>";        //add element id
        html = html + "<div id='nome-from-" + element.id + "'>" + element.nome + "</div>";  //add element nome
        html = html + "<div id='estado-from-" + element.id + "'>" + element.estado + "</div>";//add element estado
        html = html + "<div id='button-from-" + element.id + "'>" + "<input type='button' value='inspect' onclick='inspect(" + element.id + ");'/>" + "</div>";
        html = html + "</div>";                                                              //end table of element
        html = html + "</div>";                                                              //end line in table of all elements
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
        document.getElementById("edit-populacao").value = response.populacao;
        document.getElementById("edit-pais").value = response.pais;
    });
}

function addElement() {

    elementToAdd = {
        "nome": document.getElementById("add-nome").value,
        "estado": document.getElementById("add-estado").value,
        "populacao": document.getElementById("add-populacao").value,
        "pais": document.getElementById("add-pais").value
    };
    callAPI("/api/cidades", "POST", function (response, status) {
        console.log(status);
        if (!(status == 200 || status == 201)) {
            alert("Cannot Add the Object Sent");
        }
    }, elementToAdd);
    callAPI("/api/cidades", "GET", createCidades);
}

function editElement() {

    elementToAdd = {
        "nome": document.getElementById("edit-nome").value,
        "estado": document.getElementById("edit-estado").value,
        "populacao": document.getElementById("edit-populacao").value,
        "pais": document.getElementById("edit-pais").value
    };
    url = "/api/cidades/" + document.getElementById("edit-id").value;
    callAPI(url, "PUT", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Update to the Object Sent");
        }
    }, element);
    inspect(document.getElementById("edit-id").value);
    callAPI("/api/cidades", "GET", createCidades);
}

function removeElement() {

    url = "/api/cidades/" + document.getElementById("edit-id").value;
    callAPI(url, "DELETE", function (response, status) {
        if (!(status == 200 || status == 201)) {
            alert("Cannot Delete the Object");
        }
    });
        document.getElementById("edit-id").value = "";
        document.getElementById("edit-nome").value = "";
        document.getElementById("edit-estado").value = "";
        document.getElementById("edit-populacao").value = "";
        document.getElementById("edit-pais").value = "";
    callAPI("/api/cidades", "GET", createCidades);
}

function filterElements() {

    url = "/api/cidades/cidade?pais=" + document.getElementById("filter-elements").value;
    callAPI(url, "GET", createCidades);
}