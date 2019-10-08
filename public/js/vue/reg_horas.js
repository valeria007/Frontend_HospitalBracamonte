var reg_horas = new Vue({
    el:"#reghoras",
    data:()=>({
        msg:"",
        msg_false:"",
        url:data_url, 
        hora:[],
        numero:1,
        cantiFicha:"",
        minutos:"",
        idTurno:"",
        turn:"",
        id_turno:'',

        list_horaturno:'',


    }),
    mounted(){
        fetch(this.url.url_front_end+'/Vuehoraturno/:id_turnos/:turno')
        .then(res => res.json())
        .then(data => {
          this.data_hora = data
        })
    },
    
    methods:{
        data(id){
            this.id_turno =id;
            this.msg =""
        },
        reg_horasturno(e){
            e.preventDefault();
            var data= req.body;
            if(turn == "Mañanas"){
                var horas =8;
                var minutos = 0, num = data.minutos *1
                hora.push({h:horas+":"+minutos})
                for(var i=0; i< data.cantiFicha-1; i++ ){
                    if(horas ==12){
                        hora=[]
                        this.msg_false="Esa cantidad de fichas y el tiempo de atencion sobrepasa las 12 del medio dia"
                    }else{
                        if(minutos ==60){
                            minutos=0
                            horas + 1
                            hora.push({h:horas+":"+minutos})
                        }else{
                            minutos = minutos + num; 
                            if (minutos == 60){
                                minutos = 0
                                horas + 1
                            }
                            hora.push({h:horas+":"+minutos})
                        }
                    }
                }
            }else if(turn == "Tardes"){
                var horas = 14;
                var minutos = 0, num = data.minutos *1
                hora.push({h:horas+":"+minutos})
                for(var i = 0; i < data.cantiFicha - 1; i++){
                    if(horas == 18) {
                        hora = []
                        this.msg_false="se exedio"
                    }else{
                        if(minutos == 60){
                            minutos = 0
                            horas++  
                            hora.push({h:horas+":"+minutos})
                        }else {
                            minutos = minutos + num; 
                            if (minutos == 60){
                                minutos = 0
                                horas++
                            }
                            hora.push({h:horas+":"+minutos})
    
                        } 
                    }                          
                }
            }else{
                var horas = 18;
                var minutos = 0, num = data.minutos *1
                hora.push({h:horas+":"+minutos})
                for(var i = 0; i < data.cantiFicha - 1; i++){    
                    if(horas == 22){
                        hora = []
                        this.msg_false="se exedio en la cantidad de horas"
                    } else{
                        if(minutos == 60){
                            minutos = 0
                            horas++  
                            hora.push({h:horas+":"+minutos})
                        }else {
                            minutos = minutos + num; 
                            if (minutos == 60){
                                minutos = 0
                                horas++
                            }
                            hora.push({h:horas+":"+minutos})
                        } 
                    }                      
                }
            }
            insertar(hora)
            function insertar(hora1){
                fetch(this.url.url_front_end+'/cuaderno/Vue_reg_hora/'+this.id_turno)
                .then(resp => resp.json())
                .then(resp =>{
                    if(resp == ""){
                        for(var i = 0; i < hora1.length; i++){
                            
                            var data = {
                                hora : hora1[i].h
                            }
                            var esto = {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers:{
                                  'Content-type' : "application/json"
                                }
                            };
                            /**esto h  no daaaaaaaaaaaa*/
                            fetch(this.url.url_front_end+'/cuaderno/vuehora_turno/'+this.id_turno,esto)
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(resp => { 
                            })
                            numero++  
                            if(hora1.length -1  == numero){   
                                                  
                                hora = []
                                numero = 0
                                
                            }else{
                                console.log("  esto ")
                            }  
                                                 
                        }      
                    }else{
                       this.msg_false=" porfavor elimine las horas antes de volver a registrar "
                    } 
                }); 
            }
        }

    }
})