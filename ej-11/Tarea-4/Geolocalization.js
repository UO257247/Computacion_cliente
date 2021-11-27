var mapaDinamicoGoogle = new Object();
function initMap(){
    var oviedo = {lat: 43.361571, lng: -5.856219};
    var mapaOviedo = new google.maps.Map(document.getElementById('mapa'),{zoom: 8,center:oviedo});
    var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
}
mapaDinamicoGoogle.initMap = initMap;