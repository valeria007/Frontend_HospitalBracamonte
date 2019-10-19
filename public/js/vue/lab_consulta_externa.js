const lab_consulta_externa = new Vue({
    el: '#lab_consulta_externa',    
    data : () => ({
        msg: "alejandro",
        ecografia:[],
        eco_data:{
            ec1:false,
            ec3:false,
            ec4:false,
            ec5:false,
        },

        //rayosX 
        group_rayosX:{
            torax:[],
            abdomen:[],
            craneo_Macizo_Facial:[],

            Placas_Radiograficas:[],
            Columna_vertebral:[],

            Miembros_superiores:[],
            Miembros_inferiores:[]
        }    
    }),
    methods:{  
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //ecografia 
        ecografia_select(id,estudio,descripcion){
            var existe, position
            for(var i = 0; i< this.ecografia.length; i++){
                if(this.ecografia[i].estudio == estudio){
                    existe = "si"
                    position = i                    
                }
            }
            if(existe == "si"){
                this.ecografia.splice(position,1)
                existe = ""
            }else{
                this.ecografia.push({
                    estudio,
                    descripcion
                })
            }
        },
        delete_exografia(index){
            this.ecografia.splice(index,1)
        },
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //rayos X
        rayosX_select(id,descripcion){
            
            if( id==1 ){               
                var t, tp
                for(var i = 0; i < this.group_rayosX.torax.length; i++){
                    if(this.group_rayosX.torax[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_rayosX.torax.splice(tp,1)
                    t = ""
                }else{
                    this.group_rayosX.torax.push({
                        descripcion
                    })
                }
                
                
            }else if(id == 2){
                var t, tp
                for(var i = 0; i < this.group_rayosX.abdomen.length; i++){
                    if(this.group_rayosX.abdomen[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_rayosX.abdomen.splice(tp,1)
                    t = ""
                }else{
                    this.group_rayosX.abdomen.push({
                        descripcion
                    })
                }
                
            }else if(id == 3){
                var t, tp
                for(var i = 0; i < this.group_rayosX.craneo_Macizo_Facial.length; i++){
                    if(this.group_rayosX.craneo_Macizo_Facial[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_rayosX.craneo_Macizo_Facial.splice(tp,1)
                    t = ""
                }else{
                    this.group_rayosX.craneo_Macizo_Facial.push({
                        descripcion
                    })
                }
            }else if ( id == 4 ){
                var t, tp
                for(var i = 0; i < this.group_rayosX.Placas_Radiograficas.length; i++){
                    if(this.group_rayosX.Placas_Radiograficas[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_rayosX.Placas_Radiograficas.splice(tp,1)
                    t = ""
                }else{
                    this.group_rayosX.Placas_Radiograficas.push({
                        descripcion
                    })
                }
            }else if(id == 5){
                var t, tp
                for(var i = 0; i < this.group_rayosX.Columna_vertebral.length; i++){
                    if(this.group_rayosX.Columna_vertebral[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_rayosX.Columna_vertebral.splice(tp,1)
                    t = ""
                }else{
                    this.group_rayosX.Columna_vertebral.push({
                        descripcion
                    })
                }
            }else if (id == 6){
                var t, tp
                for(var i = 0; i < this.group_rayosX.Miembros_superiores.length; i++){
                    if(this.group_rayosX.Miembros_superiores[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_rayosX.Miembros_superiores.splice(tp,1)
                    t = ""
                }else{
                    this.group_rayosX.Miembros_superiores.push({
                        descripcion
                    })
                }
            }else if (id == 7){
                var t, tp
                for(var i = 0; i < this.group_rayosX.Miembros_inferiores.length; i++){
                    if(this.group_rayosX.Miembros_inferiores[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_rayosX.Miembros_inferiores.splice(tp,1)
                    t = ""
                }else{
                    this.group_rayosX.Miembros_inferiores.push({
                        descripcion
                    })
                }
            }
            
        }


       
    }

})