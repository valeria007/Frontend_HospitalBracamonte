function Pregunta_m(ide,arg){ 
  if (confirm('¿Estas seguro de '+arg+' la compra?')){ 
     
  } 
} 
     function imprSelec(nombre) {
            var divToPrint =                       document.getElementById(nombre);
            newWin = window.open("");
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
        };