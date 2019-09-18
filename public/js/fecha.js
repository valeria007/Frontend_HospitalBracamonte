


function actualizaReloj(){  

	/* CAPTURAMOS LA HORA, LOS MINUTOS Y LOS SEGUNDOS */ 
marcacion = new Date()  

	/* CAPTURAMOS LA HORA */ 
Hora = marcacion.getHours()  

	/* CAPTURAMOS LOS MINUTOS */ 
Minutos = marcacion.getMinutes()  

	/* CAPTURAMOS LOS SEGUNDOS */ 
Segundos = marcacion.getSeconds()  

	/* SI LA HORA, LOS MINUTOS O LOS SEGUNDOS 
SIN MENORES O IGUAL A 9, LE AÑADIMOS UN 0 */ 

if (Hora<=9) 
Hora = "0" + Hora 

if (Minutos<=9) 
Minutos = "0" + Minutos 

if (Segundos<=9) 
Segundos = "0" + Segundos 
	/* TERMINA EL SCRIPT DEL RELOJ */

	/* COMIENZA EL SCRIPT DE LA FECHA */ 
var Dia = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"); 
var Mes = new 

Array("01","02","03","04","05","06","07","08","09","10","11","12"); 
var Hoy = new Date(); 
var Anio = Hoy.getFullYear(); 
var Fecha = "Potosí" + Dia[Hoy.getDay()] + ", " + Hoy.getDate() + " de " + Mes[Hoy.getMonth()] + " de " + Anio + ". Hora local: "; 
var Fecha2 = Hoy.getDate() + "/" + Mes[Hoy.getMonth()] + "/" + Anio ; 
    /* TERMINA EL SCRIPT DE LA FECHA */ 
   /* var Script2, Total2
    Script2 = Fecha2
    Total2 = Script2 
    document.getElementById('Fecha_Reloj2').innerHTML = Total2*/
    
	/* CREAMOS 4 VARIABLES PARA DARLE FORMATO A NUESTRO SCRIPT */ 
var Inicio, Script,  Script2, Final, Total

	/* EN INICIO LE INDICAMOS UN COLOR DE FUENTE Y UN TAMAÑO */ 
Inicio = " " 

	/* EN RELOJ LE INDICAMOS LA HORA, LOS MINUTOS Y LOS SEGUNDOS */ 
Script = " Potosí " + Fecha2+ "  " + Hora + ":" + Minutos + ":" + Segundos 


	/* EN FINAL CERRAMOS EL TAG DE LA FUENTE */ 
Final = " " 

	/* EN TOTAL FINALIZAMOS EL RELOJ UNIENDO LAS VARIABLES */ 
Total = Inicio + Script + Final 

	/* CAPTURAMOS UNA CELDA PARA MOSTRAR EL RELOJ */ 
document.getElementById('Fecha_Reloj').innerHTML = Total 



	/* INDICAMOS QUE NOS REFRESQUE EL RELOJ CADA 1 SEGUNDO */ 
setTimeout("actualizaReloj()",1000)  
} 
