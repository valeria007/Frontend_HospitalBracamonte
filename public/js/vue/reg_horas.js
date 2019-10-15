var reghoras = new Vue({
    el:"#reghoras",
    data:()=>({
        ver:false,
        msg:"",
        msg_false:"",
        url:data_url, 

        hora:'', // esto se va a ir insertando el intervalo de horas

        intervalo:'',// aqui va 15 20 30 minutos
        turn:'', // esto es mañana, tarde o noche        
        cantiFicha:"",

        resp_hora:'',
        list_horas:[],
        idT:'',

        view_list_horas:''

    }),
    mounted(){
        
    },
    
    methods:{

        eliminar(){
            
            if(this.list_horas != ''){
                for(var i = 0; i < this.list_horas.length; i++){
                    fetch(this.url.url_front_end+'/cuaderno/VUE_delete_horas/'+this.list_horas[i].id)
                    .then(res => res.json())
                    .then(data => { 
                          
                        this.msg_false="eliminados todos Correctamente"  
                        this.msg=""          
                        console.log(data)
                        this.turn_id(this.idT)
                        
                    })
                } 
                
            }else{
                
                this.msg="no hay nada que eliminar"
                this.msg_false=""  
                console.log('no hay nada que eliminar')
            }
              
        },
        turn_id(id_turno){
            this.idT = id_turno
            fetch(this.url.url_front_end+'/cuaderno/Vuehoraturno/'+id_turno)
            .then(res => res.json())
            .then(data => {
                this.list_horas = data
                console.log(this.list_horas)
            }) 
        },

        sumar_horas(){
            var arr = []
            
            if(this.turn == "Mañanas"){
                
                    var horas = 8;
                    var minutos = 0
                    var num = this.intervalo *1 // intervalo de horas
                    
                    arr.push({h:horas+":"+minutos})
                    for(var i = 0; i < this.cantiFicha - 1; i++){  
                        if(horas == 12){
                            arr = []
                            console.log("Esa cantidad de fichas y el tiempo de atencion sobrepasa las 12 del medio dia")
                            this.resp_hora = "false"
                        }else{
                            if(minutos == 60){
                                minutos = 0
                                horas++  
                                arr.push({h:horas+":"+minutos})
                            }else {
                                minutos = minutos + num; 
                                if (minutos == 60){
                                    minutos = 0
                                    horas++
                                }
                                arr.push({h:horas+":"+minutos})
            
                            } 
                        }                         
                       
        
                    }
            }else if(this.turn == "Tardes"){
                    var horas = 14;
                    var minutos = 0 
                    var num = this.intervalo *1
                    arr.push({h:horas+":"+minutos})
                    for(var i = 0; i < this.cantiFicha - 1; i++){
                        if(horas == 18) {
                            arr = []
                            console.log("se exedio")
                            this.resp_hora = "false"
                        }else{
                            if(minutos == 60){
                                minutos = 0
                                horas++  
                                arr.push({h:horas+":"+minutos})
                            }else {
                                minutos = minutos + num; 
                                if (minutos == 60){
                                    minutos = 0
                                    horas++
                                }
                                arr.push({h:horas+":"+minutos})
            
                            } 
                        }                          
                       
        
                    }
            }else{
                    var horas = 18;
                    var minutos = 0
                    var num = this.intervalo *1
                    arr.push({h:horas+":"+minutos})
                    for(var i = 0; i < this.cantiFicha - 1; i++){    
                        if(horas == 22){
                            arr = []
                            console.log("se exedio en la cantidad de horas")
                            this.resp_hora = "false"
                        } else{
                            if(minutos == 60){
                                minutos = 0
                                horas++  
                                arr.push({h:horas+":"+minutos})
                            }else {
                                minutos = minutos + num; 
                                if (minutos == 60){
                                    minutos = 0
                                    horas++
                                }
                                arr.push({h:horas+":"+minutos})
            
                            } 
                        }                      
                        
        
                    }
            } 
            this.hora = arr
            this.insert()
            console.log(this.hora, " <<<<<<<<<<<<")
            
            
        },
        
        insert(){

            if(this.resp_hora == 'false'){
                this.msg_false= "Horas exedidas"
            }else if (this.list_horas == ""){
                for(var i = 0; i < this.hora.length; i++){
                    var data = {
                        hora:this.hora[i].h
                    };
                    var esto = {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{
                          'Content-type' : "application/json"
                        }
                    };
                    fetch(this.url.url_front_end+'/cuaderno/vuehora_turno/'+this.idT, esto)
                    .then(res => res.json())
                    .then(data => {
                        this.msg="Insertado Correctamente"
                        this.msg_false=""
                        this.turn_id(this.idT)
                        console.log(data)
                    })
                }
                
            }else{
                this.msg_false = "Eliminar las horas antes de insertar"
                this.msg=""
            }
        },
        view(id_turno){

            fetch(this.url.url_front_end+'/cuaderno/vue_list_horas/'+id_turno)
            .then(res => res.json())
            .then(data => {
                console.log(data, "   <<<<<<<<<<<<<<<<<<<  123123")
            })
        }

        
    }
})