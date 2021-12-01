'use strict';

class MapaGeoJSON {
    constructor() {
        if (!window.File && window.FileReader && window.FileList && window.Blob) {
            console.log("El navegador no soporta la API File!");
        }
    }

    checkFileApi() {
        if (!window.File && window.FileReader && window.FileList && window.Blob) {
            $("#map").html("<p>El navegador no soporta la API File!</p>");
        }
    }

    loadFile() {
        console.log("Loading file...");

        let file = $("#fileInput")[0].files[0];

        if (!file.name.includes('.geoJSON')) {
            $("#map").html("<p>Archivo inválido!</p>");
            return;
        }

        let reader = new FileReader();
        reader.onload = () => {
            console.log("File loaded!");

            let map = new google.maps.Map($("#map")[0], {
                zoom: 11,
                center: {
                    lat: 43.30,
                    lng: -5.9
                }
            });
            let json = JSON.parse(reader.result);
            map.data.addGeoJson(json);
        };
        console.log("Reading file...");
        reader.readAsText(file, "UTF-8");
    }
}

var geoJson = new MapaGeoJSON();

$(document).ready(function() {
    geoJson.checkFileApi();
})