const recetas = new Vue({
    el: '#recetas', 
    data : () => ({
        id_consulta:'',
        data_msg:{
            msg_true:'',
            msg_false:''
        },
        lista:{
            medicamento:'',
            dosis:'',
            frecuencia:'',
            duracion:'',
            cantidad:''
        },
        medicamentos:[],


        data_receta:{
            tipoConsulta:'',
            historiaClinica:'',
            fecha:'',
            doctor:'',
            unidades:23,
            id_medico:''
            
        },

        One_receta:'',


        //datos para receta
        data_receta: ''
    }),
    mounted(){

        fetch('http://localhost:7000/consulta_externa/vueReceta/'+this.id_consulta)        
        .then(resp => resp.json())
        .then(data =>{   
            if(data != ""){
                this.One_receta = {
                    id:data[0].id,
                    estado:data[0].estado,
                    tipoConsulta: data[0].tipoConsulta,
                    historiaClinica:data[0].historiaClinica,
                    fecha:data[0].fecha,
                    medicamentos:data[0].medicamentos,
                    fecha:data[0].fecha,
                    medico:data[0].Consulta.Citas_Medica.medico,
                    tipoConsulta:data[0].tipoConsulta
                }
            }     
            
        })

        fetch('http://localhost:7000/consulta_externa/medicamentos')
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => { 
            this.data_receta = data
        })
    },
    methods:{
        get_receta(){
            fetch('http://localhost:7000/consulta_externa/vueReceta/'+this.id_consulta)        
            .then(resp => resp.json())
            .then(data =>{            
                this.One_receta = {
                    id:data[0].id,
                    estado:data[0].estado,
                    tipoConsulta: data[0].tipoConsulta,
                    historiaClinica:data[0].historiaClinica,
                    fecha:data[0].fecha,
                    medicamentos:data[0].medicamentos,
                    fecha:data[0].fecha,
                    medico:data[0].Consulta.Citas_Medica.medico,
                    tipoConsulta:data[0].tipoConsulta
                }
            })
        },
        insertar(){

            if(this.lista.medicamento == "" || this.lista.medicamento == undefined){
                this.data_msg.msg_false = "Inserte nombre del medicamento"
            }else if (this.lista.dosis == "" || this.lista.dosis == undefined){
                this.data_msg.msg_false = "Inserte dosis"                
            }else if (this.lista.frecuencia == "" || this.lista.frecuencia == undefined){
                this.data_msg.msg_false = "Inserte Frecuencia"   
            }else if (this.lista.duracion == "" || this.lista.duracion == undefined){
                this.data_msg.msg_false = "Inserte duracion"                  
            }else if(this.lista.cantidad == "" || this.lista.cantidad == undefined || isNaN(this.lista.cantidad)){
                if(isNaN(this.lista.cantidad)){
                    this.data_msg.msg_false = "Cantidad solo puede contener numeros"
                }else{
                    this.data_msg.msg_false = "Inserte cantidad"
                }                
            }else{
                console.log(" entro ", this.lista.medicamento)
                fetch('http://localhost:7000/consulta_externa/vue_one_medicamentos/'+this.lista.medicamento)        
                .then(resp => resp.json())
                .then(data =>{  
                    
                    this.medicamentos.push({
                        id:data[0].id,
                        medicamento:data[0].nombre,
                        dosis:this.lista.dosis,
                        frecuencia:this.lista.frecuencia,
                        duracion:this.lista.duracion,
                        cantidad:this.lista.cantidad
                    });
                    console.log(this.medicamentos, " esto es <<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    this.data_msg.msg_false = ""
                    this.lista = {};
                })
            }         
        },
        eliminar(index){
            this.medicamentos.splice(index, 1)
        },
        post_recetas(e){
            e.preventDefault();
            console.log(this.medicamentos, " esto es lo que me esta mostrando")
            if(this.medicamentos.length != 0 ){
                if(this.data_receta.fecha == "" || this.data_receta.fecha == undefined){
                    this.data_msg.msg_false = "Inserte la fecha actual por favor"
                }else{
                    var data  = {
                        tipoConsulta:this.data_receta.tipoConsulta,
                        historiaClinica:this.data_receta.historiaClinica,
                        fecha:this.data_receta.fecha,
                        doctor:this.data_receta.doctor,
                        unidades:this.data_receta.unidades,
                        medicamentos:this.medicamentos,
                        id_medico:this.data_receta.id_medico
                    };
                    var esto = {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{
                          'Content-type' : "application/json"
                        }
                    };
                    fetch('http://localhost:7000/consulta_externa/receta/'+this.id_consulta,esto)
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(data => { 
                        console.log(data.success)
                        if(data.success == true){
                            this.data_msg.msg_true = data.message
                            this.data_msg.msg_false = ""
                            this.medicamentos=[]
                            this.get_receta()
                        }else{
                            console.log(data)
                            this.data_msg.msg_false = data.msg
                        }
                        
                    })   
                }                
            }else{
                this.data_msg.msg_false = "Porfavor inserte medicamentos"
                console.log(this.data_msg.msg_false)
            }
                  
        },
        insertar_update(){
            if(this.lista.medicamento == "" || this.lista.medicamento == undefined){
                this.data_msg.msg_false = "Inserte nombre del medicamento"
            }else if (this.lista.dosis == "" || this.lista.dosis == undefined){
                this.data_msg.msg_false = "Inserte dosis"                
            }else if (this.lista.frecuencia == "" || this.lista.frecuencia == undefined){
                this.data_msg.msg_false = "Inserte Frecuencia"   
            }else if (this.lista.duracion == "" || this.lista.duracion == undefined){
                this.data_msg.msg_false = "Inserte duracion"                  
            }else if(this.lista.cantidad == "" || this.lista.cantidad == undefined || isNaN(this.lista.cantidad)){
                if(isNaN(this.lista.cantidad)){
                    this.data_msg.msg_false = "Cantidad solo puede contener numeros"
                }else{
                    this.data_msg.msg_false = "Inserte cantidad"
                }
            }else{
                console.log(" entro ", this.lista.medicamento)
                fetch('http://localhost:7000/consulta_externa/vue_one_medicamentos/'+this.lista.medicamento)        
                .then(resp => resp.json())
                .then(data =>{  
                    
                    this.One_receta.medicamentos.push({
                        id:data[0].id,
                        medicamento:data[0].nombre,
                        dosis:this.lista.dosis,
                        frecuencia:this.lista.frecuencia,
                        duracion:this.lista.duracion,
                        cantidad:this.lista.cantidad
                    });
                    console.log(this.medicamentos, " esto es <<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    this.data_msg.msg_false = ""
                    this.lista = {};
                })
            }   
            /* this.One_receta.medicamentos.push({
                medicamento:this.lista.medicamento,
                dosis:this.lista.dosis,
                frecuencia:this.lista.frecuencia,
                duracion:this.lista.duracion
            });

            this.lista = {}; */
        },
        eliminar_update(index){
            this.One_receta.medicamentos.splice(index, 1)
        },

        update_recedta(e){
            e.preventDefault();
            if(this.One_receta.medicamentos == ""){
                this.data_msg.msg_true = ""
                this.data_msg.msg_false = "La lista de meciamentos no puede ser vacio"
            }else{            
                var data  = {            
                    estado:true,    
                    tipoConsulta: this.One_receta.tipoConsulta,
                    historiaClinica:this.One_receta.historiaClinica,
                    medicamentos:this.One_receta.medicamentos
                }
                var esto = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                      'Content-type' : "application/json"
                    }
                };
                fetch('http://localhost:7000/consulta_externa/VueupdateReceta/'+this.One_receta.id,esto)
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(data => { 
                    console.log(data)
                    if(data.success == true){
                        this.data_msg.msg_true = data.msg
                        this.data_msg.msg_false = ""
                        this.get_receta()
                    }else{
                        this.data_msg.msg_false = "Algo salio mal no se pudo actualizar la receta"
                    }
                }) 
            }  
        }
    }
})