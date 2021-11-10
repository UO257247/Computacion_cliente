class Meteo
{
    loadData(city)
    {
        let result = new Object();

        result.city = city;
        result.lang = "&lang=es";
        result.units = "&units=metric";
        result.apiKey = "e3406e3784f7fd8fd3696eae89d02394";
        result.url = "http://api.openweathermap.org/data/2.5/weather?q=" + result.city +"&mode=xml" + result.units + result.lang + "&APPID=" + result.apiKey;


        result.onSuccess = this.onSuccess.bind(this);
        result.onError = this.onError.bind(this);

        $.ajax({
            dataType: "xml",
            url: result.url,
            method: 'GET',
            success: function(data)
            {
                result.data = data;
                result.onSuccess(result);
            },
            error:function()
            {
                result.onError();  
            }
        });
    }

    onSuccess(result)
    {
        let xml = result.data;

        let city = $("city", xml.documentElement);
        let weather = $("weather", xml.documentElement);
        let temp = $("temperature", xml.documentElement);

        $("#city").html(city.attr("name"));
        $("#weather").html(weather.attr("value"));
        $("#temp").html("" + temp.attr("value") + " ºC");

        this.displayIcon(weather);

        $("#results").html("<h3>Datos</h3>");

        $("#results").append("<p>Ciudad: " + city.attr("name") + "</p>");
        $("#results").append("<p>País: " + $("country", city).text() + "</p>");

        let coord = $("coord", city);
        $("#results").append("<p>Latitud: " + coord.attr("lat") + " grados</p>");
        $("#results").append("<p>Longitud: " + coord.attr("lon") + " grados</p>");

        $("#results").append("<p>Temperatura: " + temp.attr("value") + " grados Celsius</p>");
        $("#results").append("<p>Temperatura máxima: " + temp.attr("max") + " grados Celsius</p>");
        $("#results").append("<p>Temperatura mínima: " + temp.attr("min") + " grados Celsius</p>");
        
        $("#results").append("<p>Presión: " + $("pressure", xml.documentElement).attr("value") + " hPa</p>");
        $("#results").append("<p>Humedad: " + $("humidity", xml.documentElement).attr("value") + "%</p>"); 
        
        let sun = $("sun", city);
        $("#results").append("<p>Amanece a las: " + new Date(sun.attr("rise")).toLocaleTimeString() + "</p>"); 
        $("#results").append("<p>Oscurece a las: " + new Date(sun.attr("set")).toLocaleTimeString() + "</p>"); 
        
        let wind = $("wind", xml.documentElement);
        $("#results").append("<p>Dirección del viento: " + $("direction", wind).attr("value") + "  grados</p>");
        $("#results").append("<p>Velocidad del viento: " + $("speed", wind).attr("value") + " metros/segundo</p>");
        
        let update = $("lastupdate", xml.documentElement);
        $("#results").append("<p>Hora de la medida: " + new Date(update.attr("value")).toLocaleTimeString() + "</p>");
        $("#results").append("<p>Fecha de la medida: " + new Date(update.attr("value")).toLocaleDateString() + "</p>");
        
        $("#results").append("<p>Descripción: " + weather.attr("value") + "</p>");
        $("#results").append("<p>Visibilidad: " + $("visibility", xml.documentElement).attr("value") + " metros</p>");
        $("#results").append("<p>Nubosidad: " + $("clouds", xml.documentElement).attr("value") + " %</p>");
    }

    displayIcon(weather)
    {
        let code = weather.attr("icon");
        let url = "http://openweathermap.org/img/wn/" + code + "@2x.png"

        console.log("Setting image url: " + url);
        $("#icon").attr("src", url);
        $("#icon").attr("alt", weather.attr("value"));
    }

    onError()
    {
        $("#results").html("<p>Ha ocurrido un error</p>");
    }
}


var meteo = new Meteo();

$(document).ready(function()
{
    meteo.loadData("Muros de Nalon");

    $("#murosDeNalon").click(function()
    {
        meteo.loadData("Muros de Nalon");
    });

    $("#cangasDeOnis").click(function()
    {
        meteo.loadData("Cangas de Onís");
    });

    $("#cudillero").click(function()
    {
        meteo.loadData("Cudillero");
    });

    $("#oviedo").click(function()
    {
        meteo.loadData("Oviedo");
    });

    $("#aviles").click(function()
    {
        meteo.loadData("Avilés");
    });

});