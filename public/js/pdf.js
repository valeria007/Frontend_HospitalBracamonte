
  function imprSelec(Imprimeme){
    var ficha=document.getElementById(Imprimeme).innerHTML;
    var winprint= window.open('Impresion');
    var style = "<style>*{ font-family: Verdana, sans-serif; margin: 0; padding: 0; } #pdf { margin: 20px; border: 2px solid #000; } #pdfcab { display: flex; margin: 0 10px; } #pdftitulo { width: 75%; text-align: center; margin: 10px; } #pdftitulo h2 {text-decoration: underline;} #pdftitulo h5 { color: #444; font-size: .75em; margin: 7.5px; } img { width: 96px; height: 96px; } #pdfmat p { font-size: .75em; margin: 2.5px; } .pdfarea { color: #000; font-size: .85em; } .pdft { font-size: .85em; font-weight: bold; border: 1px solid #000; padding: 2px 0 2px 2.5px; color: #fff; background: #3366ff; } .pdfarea div { display: flex; } .pdfarea div p { font-size: .825em; font-weight: justify; border: .1px solid #000; width: 100%; padding: 4px; } #ec div p , #nec div p, #ne div p, #renda div p, #rc div p{ border: none; width: auto; margin: auto; } #rc div p span { color: #555; font-size: .85em; } #info div p { border: none; } .w30{ width: 30%; text-align: center; clip-path: polygon(0 0, 100% 0, 97.5% 100%, 0% 100%); }</style>"
    winprint.document.open();
    
    winprint.document.write('<html><head><style type="text/css">');
    winprint.document.write('th,tr,td { padding: 8px; line-height: 1.42857143; vertical-align: top; border-top: 1px solid #ddd; }.active{ background-color: #f5f5f5; }.success { background-color: #dff0d8; }');
    winprint.document.write(style,'</head><body onload="window.print();">');
    
    winprint.document.write(ficha);
    winprint.document.write('</body></html>');
    winprint.document.close();
    winprint.focus();
    winprint.print();
    winprint.close();
 }
