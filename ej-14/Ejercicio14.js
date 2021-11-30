class FileManager {

    checkSupport() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {

            console.log("<p>Este navegador soporta el API File </p>");
        } else console.log("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }

    leerArchivoTexto(files) {
        var archivo = files[0];
        //Solo archivos de texto
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto) || archivo.type == "application/json") {
            var lector = new FileReader();
            lector.onload = function(evento) {

                var postit = $("<div id='list" + (g.n++) + "' class='list' draggable='true' ondragstart='g.dragStart(event)'></div>").text(lector.result);
                $("#last").append(postit);
            }
            lector.readAsText(archivo);
        } else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    }
}

var fm = new FileManager();
fm.checkSupport();


class ArrangeGame {

    constructor() {
        this.n = 0;
    }
    dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    allowDrop(event) {
        event.preventDefault();
    }

    drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const element = document.querySelector(`#${data}`);
        event.currentTarget.style.background = 'white'
        try {
            event.target.appendChild(element);
        } catch (error) {
            console.warn("you can't move the item to the same place")
        }
    }
}
var g = new ArrangeGame();


"use strict";
class MapaDinamicoGoogle {
    initMap() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.initGoogleMap();
    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }

    initGoogleMap() {
        var oviedo = { lat: this.latitud, lng: this.longitud };
        var mapaOviedo = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: oviedo });
        var marcador = new google.maps.Marker({ position: oviedo, map: mapaOviedo });
    }

}

var mapaDinamicoGoogle = new MapaDinamicoGoogle();