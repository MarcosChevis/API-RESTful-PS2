window.onload = function() {
    callAPI("/api/carros", "GET", createCarros);
}

function createCarros(response, status) {
    
    response.forEach(element => {
        let html = "";
        html = html + "<div id='element" + element.id + "'>"                                 //star a line in table of all elements
        html = html + "<div id='id-" + element.id + "'>";                                     //start a table that is an element
        html = html + "<div id='id-from-" + element.id + "'>" + element.id + "</div>";        //add element id
        html = html + "<div id='marca-from-" + element.id + "'>" + element.marca + "</div>";  //add element marca
        html = html + "<div id='modelo-from-" + element.id + "'>" + element.modelo + "</div>";//add element modelo
        html = html + "<div id='button-from-" + element.id + "'>" + "<input type='button' value='inspect' onclick='inspect(" + element.id + ");'/>" + "</div>";
        html = html + "</div>";                                                              //end table of element
        html = html + "</div>";                                                              //end line in table of all elements

        document.getElementById("elements-list").innerHTML = html;
    });

    
}

function inspect(id) {
    
    console.log(id);
}

function addElement() {

    console.log(document.getElementById("add-modelo").value);
}

function editElement() {

    console.log(document.getElementById("edit-modelo").value);
}

function removeElement() {

    console.log(document.getElementById("edit-modelo").value);
}

function filterElements() {
    
    console.log(document.getElementById("filter-elements").value);
}