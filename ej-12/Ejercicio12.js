class Files{
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
    
    this.file = $('#fileInput')[0].files[0];
    console.log(this.file);

    let reader = new FileReader();
    reader.onload= () => this.onFileRead(reader.result);

    console.log("Leyendo como archivo de texto");
    reader.readAsText(this.file, "UTF-8");

}

onFileRead(result){
    $("#data").html("<h2>Archivo</h2>");
    $("#data").append("<p> Nombre: " + this.file.name + "</p>");
    $("#data").append("<p> Tipo: " + this.file.type + "</p>");
    $("#data").append("<p> Tamaño: " + this.file.size + "in bytes" +"</p>" );
    $("#data").append("<p>Ultima modificacion: " + this.file.lastModifiedDate + "</p>");


    $("#content").html("<h2>Contenido</h2>");
    $("#content").append("<p>" + this.toXML(result) + "</p>");
}

toXML(xml){
    let fixed = String(xml)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

    return fixed; 
}
}

var currentFiles = new Files();

$(document).ready(function()
{
    currentFiles.checkAPI();
});