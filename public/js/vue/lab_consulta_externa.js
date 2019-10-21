const lab_consulta_externa = new Vue({
    el: '#lab_consulta_externa',    
    data : () => ({
        msg: "alejandro",
        // datas
        id_consulta:'',
        historial:'',
        nombre_doctor:'',
        fecha:'',
        hora:'',
        tipo_laboratorio_eco:'ECOGRAFIA',
        tipo_laboratorio_rayosX:'Rayos_x',
        tipo_laboratorio_lab:'LABORATORIO',

        //ecografia        
        ecografia:[],
        eco_data:{
            
            1:{estado:false},
            2:{estado:false},
            3:{estado:false},
            4:{estado:false},
            5:{estado:false}
        },
        otros_eco:'',
        //rayosX 
        x_data:{
            1:{estado:false},
            2:{estado:false},
            3:{estado:false},
            4:{estado:false},
            5:{estado:false},
            6:{estado:false},
            7:{estado:false},
            8:{estado:false},
            9:{estado:false},
            10:{estado:false},
            11:{estado:false},
            12:{estado:false},
            13:{estado:false},
            14:{estado:false},
            15:{estado:false},
            16:{estado:false},
            17:{estado:false},
            18:{estado:false},
            19:{estado:false},
            20:{estado:false},
            21:{estado:false},
            22:{estado:false},
            23:{estado:false},
            24:{estado:false},
            25:{estado:false},
            26:{estado:false},
            27:{estado:false},
            28:{estado:false},
            29:{estado:false},
            30:{estado:false},
            31:{estado:false},
            32:{estado:false},
            33:{estado:false},
            34:{estado:false},
            35:{estado:false},
            36:{estado:false},
            37:{estado:false},
            38:{estado:false},
            39:{estado:false},
            40:{estado:false},
            41:{estado:false},
            42:{estado:false},
            43:{estado:false},
            44:{estado:false},
            45:{estado:false},
            46:{estado:false},
            47:{estado:false},
            48:{estado:false},
            49:{estado:false},
            50:{estado:false},
            51:{estado:false},
            52:{estado:false},
            53:{estado:false},
            54:{estado:false},
            55:{estado:false},
            56:{estado:false},
            57:{estado:false},
            58:{estado:false},
            59:{estado:false},
            60:{estado:false},
            61:{estado:false},
            62:{estado:false},
            63:{estado:false},
            64:{estado:false},
            65:{estado:false},
            66:{estado:false},
            67:{estado:false},
            68:{estado:false},
            69:{estado:false},
            70:{estado:false},
            71:{estado:false},
            72:{estado:false},
            73:{estado:false},
            74:{estado:false},
            75:{estado:false},
            76:{estado:false},
            77:{estado:false},
            78:{estado:false},
            79:{estado:false},
            80:{estado:false},
        },
        group_rayosX:{
            torax:[],
            abdomen:[],
            craneo_Macizo_Facial:[],

            Placas_Radiograficas:[],
            Columna_vertebral:[],

            Miembros_superiores:[],
            Miembros_inferiores:[]
        }, 
         otros_rayosX:'',
        //LABORATORIOS
        group_laboratorio:{
            Hemotología:[],
            Química_Sanguínea:[],
            Orina:[],
            Prueba_Embarazo:[],
            Heces:[],

            Expectoración:[],
            Exámenes_Especiales:[],
            Perfil_Preoperatorio:[],
            Perfil_Obstetrico:[],

            Perfil_Reumático:[],
            Perfil_hepatico:[],
            Perfil_lipidico:[]            
        },
        lab_data:{
            1:{estado:false},
            2:{estado:false},
            3:{estado:false},
            4:{estado:false},
            5:{estado:false},
            6:{estado:false},
            7:{estado:false},
            8:{estado:false},
            9:{estado:false},
            10:{estado:false},
            11:{estado:false},
            12:{estado:false},
            13:{estado:false},
            14:{estado:false},
            15:{estado:false},
            16:{estado:false},
            17:{estado:false},
            18:{estado:false},
            19:{estado:false},
            20:{estado:false},
            21:{estado:false},
            22:{estado:false},
            23:{estado:false},
            24:{estado:false},
            25:{estado:false},
            26:{estado:false},
            27:{estado:false},
            28:{estado:false},
            29:{estado:false},
            30:{estado:false},
            31:{estado:false},
            32:{estado:false},
            33:{estado:false},
            34:{estado:false},
            35:{estado:false},
            36:{estado:false},
            37:{estado:false},
            38:{estado:false},
            39:{estado:false},
            40:{estado:false},
            41:{estado:false},
            42:{estado:false},
            43:{estado:false},
            44:{estado:false},
            45:{estado:false},
            46:{estado:false},
            47:{estado:false},
            48:{estado:false},
            49:{estado:false},
            50:{estado:false},
            51:{estado:false},
            52:{estado:false},
            53:{estado:false},
            54:{estado:false},
            55:{estado:false},
            56:{estado:false},
            57:{estado:false},
            58:{estado:false},
            59:{estado:false},
            60:{estado:false},
            61:{estado:false},
            62:{estado:false},
            63:{estado:false},
            64:{estado:false},
            65:{estado:false},
            66:{estado:false},
            67:{estado:false},
            68:{estado:false},
            
        },
        otros_lab:''
    }),
    mounted(){
        this.fecha = moment().format('l'); 
        this.hora = moment().format('HH:mm:ss')
    },
    methods:{  
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //ecografia 
        ecografia_select(id,estudio,descripcion){
            this.eco_data[id].estado = !this.eco_data[id].estado
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
                    id,
                    estudio,
                    descripcion
                })
            }
        },
        delete_exografia(id,index){           
            this.eco_data[id].estado = false
            this.ecografia.splice(index,1)
        },
        
        register_ecografia(e){
            e.preventDefault();
            var data = {
                tipo_laboratorio : this.tipo_laboratorio_eco,
                fecha : this.fecha,
                hora : this.hora,
                historial : this.historial,
                nombre_doctor : this.nombre_doctor,
                examen : this.ecografia,
                otros : this.otros_eco,
            };
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/laboratorios/vue_insert_lab_consultaExterna/'+this.id_consulta,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                console.log(data, " esto es lo que quiero ver")
            })
        },  
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //rayos X
        rayosX_select(id,num,descripcion){
            this.x_data[num].estado = !this.x_data[num].estado
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
                        id,
                        num,
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
                        id,
                        num,
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
                        id,
                        num,
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
                        id,
                        num,
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
                        id,
                        num,
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
                        id,
                        num,
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
                        id,
                        num,
                        descripcion
                    })
                }
            }
            
        },
        delete_rayosX(id,num, index){
            this.x_data[num].estado = false
            if(id == 1){
                this.group_rayosX.torax.splice(index,1)
            }else if(id == 2){
                this.group_rayosX.abdomen.splice(index,1)
            }else if(id == 3){
                this.group_rayosX.craneo_Macizo_Facial.splice(index,1)
            }else if(id == 4){
                this.group_rayosX.Placas_Radiograficas.splice(index,1)
            }else if (id == 5){
                this.group_rayosX.Columna_vertebral.splice(index,1)
            }else if (id == 6){
                this.group_rayosX.Miembros_superiores.splice(index,1)
            }else if (id == 7){
                this.group_rayosX.Miembros_inferiores.splice(index,1)
            }
            
        },

        //laboratorios
        laboratorios(id,num,descripcion){
            this.lab_data[num].estado = !this.lab_data[num].estado
            if( id == 1 ){               
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Hemotología.length; i++){
                    if(this.group_laboratorio.Hemotología[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Hemotología.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Hemotología.push({
                        id,
                        num,
                        descripcion
                    })
                }
                
                
            }else if(id == 2){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Química_Sanguínea.length; i++){
                    if(this.group_laboratorio.Química_Sanguínea[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Química_Sanguínea.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Química_Sanguínea.push({
                        id,
                        num,
                        descripcion
                    })
                }
                
            }else if( id == 3 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Orina.length; i++){
                    if(this.group_laboratorio.Orina[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Orina.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Orina.push({
                        id,
                        num,
                        descripcion
                    })
                }
                
            }else if ( id == 4 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Prueba_Embarazo.length; i++){
                    if(this.group_laboratorio.Prueba_Embarazo[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Prueba_Embarazo.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Prueba_Embarazo.push({
                        id,
                        num,
                        descripcion
                    })
                }

            }else if ( id == 5 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Heces.length; i++){
                    if(this.group_laboratorio.Heces[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Heces.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Heces.push({
                        id,
                        num,
                        descripcion
                    })
                }

            }else if ( id == 6 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Expectoración.length; i++){
                    if(this.group_laboratorio.Expectoración[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Expectoración.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Expectoración.push({
                        id,
                        num,
                        descripcion
                    })
                }

            }else if ( id == 7 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Exámenes_Especiales.length; i++){
                    if(this.group_laboratorio.Exámenes_Especiales[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Exámenes_Especiales.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Exámenes_Especiales.push({
                        id,
                        num,
                        descripcion
                    })
                }

            }else if ( id == 8 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Perfil_Preoperatorio.length; i++){
                    if(this.group_laboratorio.Perfil_Preoperatorio[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Perfil_Preoperatorio.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Perfil_Preoperatorio.push({
                        id,
                        num,
                        descripcion
                    })
                }

            }else if ( id == 9 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Perfil_Obstetrico.length; i++){
                    if(this.group_laboratorio.Perfil_Obstetrico[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Perfil_Obstetrico.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Perfil_Obstetrico.push({
                        id,
                        num,
                        descripcion
                    })
                }

            }else if ( id == 10 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Perfil_Reumático.length; i++){
                    if(this.group_laboratorio.Perfil_Reumático[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Perfil_Reumático.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Perfil_Reumático.push({
                        id,
                        num,
                        descripcion
                    })
                }
            
            }else if ( id == 11 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Perfil_hepatico.length; i++){
                    if(this.group_laboratorio.Perfil_hepatico[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Perfil_hepatico.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Perfil_hepatico.push({
                        id,
                        num,
                        descripcion
                    })
                }
                
            }else if ( id  == 12 ){
                var t, tp
                for(var i = 0; i < this.group_laboratorio.Perfil_lipidico.length; i++){
                    if(this.group_laboratorio.Perfil_lipidico[i].descripcion == descripcion){                       
                        t = "si"
                        tp = i
                    }
                }
                if( t == "si"){
                    this.group_laboratorio.Perfil_lipidico.splice(tp,1)
                    t = ""
                }else{
                    this.group_laboratorio.Perfil_lipidico.push({
                        id,
                        num,
                        descripcion
                    })
                }

            }
        },
        delete_lab(id,num, index){           
            this.lab_data[num].estado = false
            if(id == 1){
                this.group_laboratorio.Hemotología.splice(index,1)
            }else if(id == 2){
                this.group_laboratorio.Química_Sanguínea.splice(index,1)
            }else if(id == 3){
                this.group_laboratorio.Orina.splice(index,1)
            }else if(id == 4){
                this.group_laboratorio.Prueba_Embarazo.splice(index,1)
            }else if (id == 5){
                this.group_laboratorio.Heces.splice(index,1)
            }else if (id == 6){
                this.group_laboratorio.Expectoración.splice(index,1)
            }else if (id == 7){
                this.group_laboratorio.Exámenes_Especiales.splice(index,1)
            }else if (id == 8){
                this.group_laboratorio.Perfil_Preoperatorio.splice(index,1)
            }else if (id == 9){
                this.group_laboratorio.Perfil_Obstetrico.splice(index,1)
            }else if (id == 10){
                this.group_laboratorio.Perfil_Reumático.splice(index,1)
            }else if (id == 11){
                this.group_laboratorio.Perfil_hepatico.splice(index,1)
            }else if (id == 12){
                this.group_laboratorio.Perfil_lipidico.splice(index,1)
            }
        },
        


       
    }

})