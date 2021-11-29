class KMLMap{
    constructor(){
        if (window.FileReader & !window.File && window.FileList && window.Blob){
            console.log("Ha habido in problema con la API")
        } 
    }

    checkAPI(){
        if (window.FileReader & !window.File && window.FileList && window.Blob){
            $("#messages").html("<p>El navegador no soporta la API File.</p>")
        }
    } 

    load(){

        console.log("Cargando el archivo");
        $("messages").html("");
            
        this.file = $('#fileInput')[0].files[0];
        console.log(this.file);
        
        
        let reader = new FileReader();
        reader.onload= () => {
            console.log("Archivo cargado");

            let map = new google.maps.Map($('#map')[0], 
            {
                zoom: 8,
            });

            let geoXml = new geoXML3.parser({map: map});
            geoXml.parseKmlString(reader.result);
        }
       
        console.log("Leyendo como archivo de texto");
        reader.readAsText(this.file, "UTF-8");
        
    }

}

var kml = new KMLMap();
$(document).ready(function()
{
    kml.checkAPI();
});