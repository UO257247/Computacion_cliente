$(document).ready(function () {
    var _pHidden = false;
    var _numCols = 3;
    var _numRows = 3;


    //===================TAREA 1===================//
    $("#hideP").click(function () {
        if (!_pHidden) {
            $("#hiddenP").hide();
        } else {
            $("#hiddenP").show();

        }

        _pHidden = !_pHidden;
    })


    //===================TAREA 2 ===================//
    $("#modify").click(function () {
        $("h2").html("Este es el nuevo encabezado")
    })


    //===================TAREA 3 ===================//
    //Añadir elementos 
    $("#addRow").click(function () {
        let str = "<tr>";
        for (let i = 0; i < _numCols; i++) {
            str += "<td>" + Math.round(Math.random() * 100) + "</td>";
        }
        str += "</tr>";

        $("table").append(str)
        _numRows++;
    })

    // ================= TAREA 4 ================= //
    // Eliminar elementos

    $('#delRow').click(function () {
        if (_numRows <= 0)
            return;
        $('tr').last().remove();
        _numRows--;
    });

    // ================= TAREA 5 ================= //
    //Recorrer el html
    $('#checkElements').click(function () {
        let result = "<ul>";
        $("*", document).each(function () {
            result += "<li>";

            result += "Elemento: " + $(this).get(0).tagName;
            result += " || Padre: " + $(this).parent().get(0).tagName;

            result += "</li>";
        })
        $('#htmlP').html(result);
    })

    // ================= TAREA 6 ================= //
    $("#sumRows").click(function () {
        if (_numRows <= 0) {
            return;
        }
        let result = new Array();
        for (let i = 0; i < _numCols; i++) {
            result.push(0)
        }

        $('td').each((i, value) => {
            let index = i % _numCols;
            result[index] += parseInt($(value).text());
        });

        let str = "<tr>";
        for (let i = 0; i < _numCols; i++) {
            str += "<td>" + result[i] + "</td>";
        }
        str += "</tr>";

        $("table").append(str);
        _numRows++;

    })

    $('#sumCols').click(function()
    {
        if (_numCols <= 0)
            return;

        $('tr').each((i, value) => 
        {
            let result = 0;
            
            $(value).children().each((j, value) => 
            {
                result += parseInt($(value).text());
            });

            $(value).append( "<td>" + result + "</td>" );
        });

        _numCols ++;
    });
})