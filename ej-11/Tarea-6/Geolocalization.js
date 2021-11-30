var mapaDinamicoGoogle = new Object();

function initMap() {
    var madrid = { lat: 40.416679, lng: -3.703907 };
    var europeMap = new google.maps.Map(document.getElementById('mapa'), { zoom: 4, center: madrid });

    //Creando los marcadores
    //Madrid
    var madridMark = new google.maps.Marker({ position: madrid, map: europeMap, title: 'Madrid' });

    //London
    var london = { lat: 51.507222, lng: 0.1275 };
    var londonMark = new google.maps.Marker({ position: london, map: europeMap, title: 'Londres' });

    //Berlin
    var berlin = { lat: 52.519330, lng: 13.405864 };
    var berlinMark = new google.maps.Marker({ position: berlin, map: europeMap, title: 'Berlin' });
    //Rome
    var rome = { lat: 41.9, lng: 12.5 };
    var romeMark = new google.maps.Marker({ position: rome, map: europeMap, title: 'Uluru (Ayers Rock)' });

    //Paris
    var paris = { lat: 48.8567, lng: 2.3508 };
    var parisMark = new google.maps.Marker({ position: paris, map: europeMap, title: 'Uluru (Ayers Rock)' });


    //Creando ventanas de informacion
    var madridInfo = new google.maps.InfoWindow({
        content: "Madrid es un municipio y ciudad de España. La localidad, con categoría histórica de villa, ​ es la capital del Estado​ y de la Comunidad de Madrid. Dentro del término municipal de Madrid, el más poblado de España, viven 3 182 981 personas empadronadas, según el INE de 2017."
    });

    var berlinInfo = new google.maps.InfoWindow({
        content: "Berlín es la capital de Alemania y uno de los dieciséis estados federados alemanes. Se localiza al noreste de Alemania. Por la ciudad fluyen los ríos Esprea, Havel, Panke, Dahme y Wuhle."
    });

    var romeInfo = new google.maps.InfoWindow({
        content: "Roma es una ciudad italiana de 2 877 215 habitantes, ​​ capital de la región del Lacio y de Italia. Es el municipio más poblado de Italia y es la cuarta ciudad más poblada de la Unión Europea.​ Por antonomasia se la conoce desde fines de la Antigüedad como la Urbe. También es llamada 'La Ciudad Eterna'."
    });

    var londonInfo = new google.maps.InfoWindow({
        content: "Londres es la capital y mayor ciudad de Inglaterra y del Reino Unido.​​ Situada a orillas del río Támesis, Londres es un importante asentamiento humano desde que fue fundada por los romanos con el nombre de Londinium hace casi dos milenios.​"
    });

    var parisInfo = new google.maps.InfoWindow({
        content: "París es la capital de Francia y su ciudad más poblada. Capital de la región de Isla de Francia, es constituida en la única comuna unidepartamental del país."
    });


    //Añadiendo ventanas a los marcadores
    madridMark.addListener('click', function() {
        madridInfo.open(europeMap, madridMark);
    });

    londonMark.addListener('click', function() {
        londonInfo.open(europeMap, londonMark);
    });

    berlinMark.addListener('click', function() {
        berlinInfo.open(europeMap, berlinMark);
    });

    romeMark.addListener('click', function() {
        romeInfo.open(europeMap, romeMark);
    });

    parisMark.addListener('click', function() {
        parisInfo.open(europeMap, parisMark);
    });
}
mapaDinamicoGoogle.initMap = initMap;