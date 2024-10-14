const valoresIngresados = [];
const usuarioIngresados = [];

document.addEventListener('DOMContentLoaded', function() {
    let formulario = document.getElementById('formulario');
   
    formulario.addEventListener('submit', function(event){
        event.preventDefault();

        // Limpiar el array valoresIngresados
        valoresIngresados.length = 0;

        valoresIngresados.push(document.getElementById('tipo').value);
        valoresIngresados.push(document.getElementById('placa').value);
        valoresIngresados.push(document.getElementById('marca').value);
        valoresIngresados.push(document.getElementById('modelo').value);
        valoresIngresados.push(document.getElementById('color').value);

        let fecha=agregarFecha();
        valoresIngresados.push(fecha)
        
        let radioHora = document.getElementById('hora');
        let radioDia = document.getElementById('dia');
        let radioMes = document.getElementById('mes');

        if (radioHora.checked) {
            valoresIngresados.push("hora");
        } else if (radioDia.checked) {
            valoresIngresados.push("día");
        } else if (radioMes.checked) {
            valoresIngresados.push("mes");
        }

        // Alerta con los valores ingresados
        alert(valoresIngresados); 
        console.log(valoresIngresados);

        // Validar y mostrar resultados
        Tipovehiculo(valoresIngresados[0]);
        validarPlaca(valoresIngresados[1], valoresIngresados[0]);

        // Console.log con los valores actuales
        console.log("Placa válida:", valoresIngresados[1], valoresIngresados[0]);
       
        let vehiculoIngresado = new Vehiculo(
            valoresIngresados[0], // tipo
            valoresIngresados[1], // placa
            valoresIngresados[2], // marca
            valoresIngresados[3], // modelo
            valoresIngresados[4], // color
            valoresIngresados[5],  // estadia
            valoresIngresados[6], // fecha
        );

        vehiculoIngresado.imprimirInformacion();
        reiniciar();
    });
    let formulario2 = document.getElementById("formulario2");
    formulario2.addEventListener("submit",function(event){
        event.preventDefault();

        
        if (validarUsuario()=== "error"){
            alert ("faltan datos de usuario")
            return
        }
       
        let nombUsuario= document.getElementById("nombre").value;
        let apellUsuario= document.getElementById('apellido').value;
        let identificacion=document.getElementById("identificacion").value;
        let email =document.getElementById('email').value;
        let celular=document.getElementById('celular').value;

        usuarioIngresados.push(nombUsuario,apellUsuario,identificacion,email,celular);

        //console.log("Datos del usuario: ", "Nombre: ", ${nombUsuario}, ", Apellido: ", apellUsuario ,"Numero de identificacion: ",identificacion,"Correo: ",email,"Numero de contacto: ",celular);
        console.log(`Nombre: ${nombUsuario}, Apellido: ${apellUsuario}, Identificacion: ${identificacion}, Correo: ${email}, Contacto: ${celular},`);

        
        //usuarioIngresados=[nombUsuario,apellUsuario,identificacion,email,celular];
        
        console.log(usuarioIngresados)
    
        // usuarioIngresados.push(document.getElementById('identificacion').value);
        // usuarioIngresados.push(document.getElementById('email').value);
        // usuarioIngresados.push(document.getElementById('celular').value);


        //console.log(usuarioIngresados);

        // let usuarioIngresados = new usuario(
        //     usuarioIngresados[0], // nombre
        //     usuarioIngresados[1], // apellido
        //     usuarioIngresados[2], // identificacion
        //     usuarioIngresados[3], // correo
        //     usuarioIngresados[4], // celular
        // )

       // usuarioIngresados.imprimirInformacion();
        //reiniciar();
    }); 
});


function validarUsuario(){
    let nombreInput = document.getElementById("nombre").value;
    let apellidoInput = document.getElementById("apellido").value;
    
    if (/\d/.test(nombreInput) || /\d/.test(apellidoInput) ){ 
        alert ("No se permiten numeros en este campo")
        return "error"
    }
    return "correcto"
}

function usuario(){
    document.getElementById("formulario2").style.display = "block";
}

function ocultar(){
    document.getElementById("formulario2").style.display = "none";
}

function agregarFecha(){
    let fecha = new Date();
    let dia =fecha.getDate();
    let mes = fecha.getMonth()+1;
    let año = fecha.getFullYear();
    let hora = fecha.toLocaleTimeString();

    const fechas = [dia,mes,año,hora]
    return fechas
}

function validarPlaca(placa, vehiculo) {
    let regex;
    let mensajeError;
    let pla;

    if (vehiculo === "Automovil") {
        regex = /^[A-Za-z]{3}\d{3}$/;
        pla = regex.test(placa);
        if(pla === false){
            mensajeError = "El formato de la placa de automóvil es incorrecto. Debe tener tres letras seguidas de tres números.";
        }
    }else if (vehiculo === "Moto") {
        regex = /^[A-Za-z]{3}\d{2}[A-Za-z]{1}$/;
        pla = regex.test(placa);
        if(pla === false){
            mensajeError = "El formato de la placa de motocicleta es incorrecto. Debe tener tres letras seguidas de dos números, otro número y una letra.";
        }
    }
    if (!pla) {
        alert(mensajeError);
        console.error("Placa incorrecta:", placa, vehiculo);
        return false; // Retorna false si la placa no pasa la validación
    }
    console.log("Placa válida:", placa, vehiculo);
    return true; // Retorna true si la placa pasa la validación
}

function Tipovehiculo(vehiculo){
    if(vehiculo === "Automovil" || vehiculo === "Moto"){
        alert("Puede ingresar su vehiculo")
    }else{
        alert("No puede ingresar el vehiculo")
    }
}
function reiniciar(){
    document.getElementById('tipo').value = "";
    document.getElementById('placa').value = "";
    document.getElementById('marca').value = "";
    document.getElementById('modelo').value = "";
    document.getElementById('color').value = "";

    document.getElementById('hora').checked = false;
    document.getElementById('dia').checked = false;
    document.getElementById('mes').checked = false;
}

class Vehiculo{
    constructor(tipo,placa,marca,modelo,color,fechaHora,estadia){
        this.tipo = tipo;
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.fechaHora = fechaHora;
        this.estadia = estadia;
    }
    imprimirInformacion(){
        console.log(`Tipo de vehiculo: ${this.tipo}, Placa: ${this.placa}, Marca: ${this.marca}, Modelo: ${this.modelo}, Color: ${this.color}, Fecha y hora: ${this.fechaHora}, Tipo de estadia: ${this.estadia}`);
    }

}
