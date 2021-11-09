class Meteo {
    loadData(city) {
        let result = new Object();

        result.city = city;
        result.lang = "&lang=es";
        result.units = "&units=metric";
        result.apiKey = "e3406e3784f7fd8fd3696eae89d02394";
        result.url = "http://api.openweathermap.org/data/2.5/weather?q=" + result.city + result.units + result.lang + "&APPID=" + result.apiKey;

        result.onSuccess = this.onSuccess.bind(this);
        result.onError = this.onError.bind(this);

        $.ajax({
            dataType: "json",
            url: result.url,
            method: 'GET',
            success: function (data) {
                result.data = data;
                result.onSuccess(result);
            },
            error: function () {
                result.onError();
            }
        });
    }

    onSuccess(result) {
        $("#city").html(result.city);
        $("#weather").html(result.data.weather[0].description);
        $("#temp").html("" + result.data.main.temp + " ºC");

        this.displayIcon(result);

        $("#results").html("<h3>Datos</h3>");
        $("#results").append("<p>Ciudad: " + result.data.name + "</p>");
        $("#results").append("<p>País: " + result.data.sys.country + "</p>");
        $("#results").append("<p>Latitud: " + result.data.coord.lat + " grados</p>");
        $("#results").append("<p>Longitud: " + result.data.coord.lon + " grados</p>");
        $("#results").append("<p>Temperatura: " + result.data.main.temp + " grados Celsius</p>");
        $("#results").append("<p>Temperatura máxima: " + result.data.main.temp_max + " grados Celsius</p>");
        $("#results").append("<p>Temperatura mínima: " + result.data.main.temp_min + " grados Celsius</p>");
        $("#results").append("<p>Presión: " + result.data.main.pressure + " hPa</p>");
        $("#results").append("<p>Humedad: " + result.data.main.humidity + "%</p>");
        $("#results").append("<p>Amanece a las: " + new Date(result.data.sys.sunrise * 1000).toLocaleTimeString() + "</p>");
        $("#results").append("<p>Oscurece a las: " + new Date(result.data.sys.sunset * 1000).toLocaleTimeString() + "</p>");
        $("#results").append("<p>Dirección del viento: " + result.data.wind.deg + "  grados</p>");
        $("#results").append("<p>Velocidad del viento: " + result.data.wind.speed + " metros/segundo</p>");
        $("#results").append("<p>Hora de la medida: " + new Date(result.data.dt * 1000).toLocaleTimeString() + "</p>");
        $("#results").append("<p>Fecha de la medida: " + new Date(result.data.dt * 1000).toLocaleDateString() + "</p>");
        $("#results").append("<p>Descripción: " + result.data.weather[0].description + "</p>");
        $("#results").append("<p>Visibilidad: " + result.data.visibility + " metros</p>");
        $("#results").append("<p>Nubosidad: " + result.data.clouds.all + " %</p>");
    }

    displayIcon(result) {
        let code = result.data.weather[0].icon;
        let url = "http://openweathermap.org/img/wn/" + code + "@2x.png"

        console.log("Setting image url: " + url);
        $("#icon").attr("src", url);
        $("#icon").attr("alt", result.data.weather[0].description);
    }

    onError() {
        $("#results").html("<p>Ha ocurrido un error</p>");
    }
}


var meteo = new Meteo();

$(document).ready(function () {
    meteo.loadData("Muros de Nalon");

    $("#murosDeNalon").click(function () {
        meteo.loadData("Muros de Nalon");
    });

    $("#cangasDeOnis").click(function () {
        meteo.loadData("Cangas de Onís");
    });

    $("#cudillero").click(function () {
        meteo.loadData("Cudillero");
    });
});