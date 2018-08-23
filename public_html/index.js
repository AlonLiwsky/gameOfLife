var rows = parseInt($(window).height() / 24);
var columns = parseInt($(window).width() / 20.32);
var timeOut;


var table = new Array(rows);
for (var i = 0; i < rows; i++) {
    table[i] = new Array(columns);
}

limpiar();

$(document).ready(function () {
    renderTable();
});


function renderTable() {
    $("#Mines").empty();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            $("#Mines").append("<input type='button' class='square " + table[i][j] + "' id=" + i + "_" + j + " value='' onclick='seleccionar(this.id)' />");
        }
        $("#Mines").append('<br>');
    }
}

function seleccionar(id) {
    id = id.split('_');
    table[id[0]][id[1]] = !table[id[0]][id[1]];
    renderTable();
}

function ejecutar() {
    var velocidad = $("#velocidad").prop("value");
    alert(velocidad);
    $("#velocidad").prop( "disabled", true );
    $("#ejecutar").prop( "disabled", true );
    $("#ejecutar").css('background-color','red');
    timeOut = setInterval(ejecutar1, velocidad);
}

function ejecutar1() {

    var vecinos = new Array(rows);
    for (var i = 0; i < rows; i++) {
        vecinos[i] = new Array(columns);
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            vecinos[i][j] = 0;
            if (i > 0) {
                if (j > 0) {
                    if (table[i - 1][j - 1]) {
                        vecinos[i][j]++;
                    }
                }
                if (table[i - 1][j]) {
                    vecinos[i][j]++;
                }
                if (j < columns - 1) {
                    if (table[i - 1][j + 1]) {
                        vecinos[i][j]++;
                    }
                }
            }

            if (j > 0) {
                if (table[i][j - 1]) {
                    vecinos[i][j]++;
                }
            }
            if (j < columns - 1) {
                if (table[i][j + 1]) {
                    vecinos[i][j]++;
                }
            }

            if (i < rows - 1) {
                if (j > 0) {
                    if (table[i + 1][j - 1]) {
                        vecinos[i][j]++;
                    }
                }
                if (table[i + 1][j]) {
                    vecinos[i][j]++;
                }
                if (j < columns - 1) {
                    if (table[i + 1][j + 1]) {
                        vecinos[i][j]++;
                    }
                }
            }
        }
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            if (table[i][j] && (vecinos[i][j] <= 1 || vecinos[i][j] >= 4)) {
                table[i][j] = !table[i][j];
            } else if (!table[i][j] && vecinos[i][j] === 3) {
                table[i][j] = !table[i][j];
            }
        }
    }

    renderTable();

}

function detener() {
    window.clearTimeout(timeOut);
    $("#ejecutar").css('background-color','grey');
    $("#ejecutar").prop( "disabled", false );
    $("#velocidad").prop( "disabled", false );
}

function limpiar() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            table[i][j] = false;
        }
    }
    
    renderTable();
}
