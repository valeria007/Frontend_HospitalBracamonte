
console.log(moment().format('HH:mm:ss')); // 16:13:11
var hospital = new Vue({
    el:"#hospital",
    data:{
        url:data_url.url_front_end,
        
        alta_paciente: false,
        idHist:{
            id_int:'',
            hist:'',
            id_medico:'',
            id_cama:''
        },
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        //De notas de evolucion 
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        nota_evolucion:{
            msg:"",
            msg_false:"",
            fecha:'',
            hora:'',
            nota_evolucion:'',
            listNotas_evolucion:[],
            one_notaEvolucion:''
        },
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        //DIAGNOSTICO
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        daigTratameinto:{
            msg:'',
            msg_false:'',

            fecha:'',
            hora:'',
            evolucion:'',            
            medicamentos:[],

            listDiagnostico:[],

            med:{
                medic:'',
                dosis:'',
                frecuencia:''
            },
            est:{
                estud:'',
                nombre_estudio:''
            },

            one_diagTratamiento:'',
        },
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        //INTERVENCIONES
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        ord_int:{
            msg:'',
            msg_false:'',
            fechaOrden:'',
            nombre_cirujano:'',
            ayudantes:'',
            diag_pre_operatorio:'',
            intr_parcticada:'',
            diag_pos_operatorio:'',

            list_operaciones:'',
            one_intervencion:''
        },
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        //EPICRISIS
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        epicrisis:{
            msg:'',
            msg_false:'',
            Fecha_internacion:'',
            Fecha_alta:'',
            datos_clinicos:'',
            diagnostico_admicion:'',
            diagnostico_egreso:'',
            condicion_egreso:'',
            causa_egreso:'',
            examenes_complementario:'',
            tratamiento_quirurgico:'',
            tratamiento_medico:'',
            complicaciones:'',
            pronostico_vital:'',
            pronostico_funcional:'',
            control_tratamiento:'',
            recomendaciones:''
        },

        /*
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
                        estado alta
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
         */
        estado_alta:'',
        msg1:'',
        msg_false1:'',

        estado_cama:'',
        msg_cama:''
        
    },
    mounted(){
        //notas de evolucion
        this.nota_evolucion.fecha = moment().format('l'); 
        this.nota_evolucion.hora = moment().format('HH:mm:ss')
        //diagnostico
        this.daigTratameinto.fecha = moment().format('l'); 
        this.daigTratameinto.hora = moment().format('HH:mm:ss')
        axios
        .get(this.url+'/internaciones/vue_listEvolucion/'+this.idHist.id_int)
        .then(response => {
            this.nota_evolucion.listNotas_evolucion = response.data   
        })

        axios
        .get(this.url+'/internaciones/Vue_list_ord_intervencion/'+this.idHist.id_int)
        .then(response => {
            this.ord_int.list_operaciones = response.data 
            console.log(this.ord_int.list_operaciones, "  <<<< lista de ordenes de intervencion")    
        })
    },
    methods:{  
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        //De notas de evolucion 
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        reg_nota_evolucion(e){
            e.preventDefault();

            var data = {
                historial : this.idHist.hist,
                fecha : this.nota_evolucion.fecha,
                hora: this.nota_evolucion.hora,
                nota_evolucion : this.nota_evolucion.nota_evolucion,
                id_medico: this.idHist.id_medico
            };
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/internaciones/Vue_regNotaEvolucion/'+this.idHist.id_int,esto)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success == true){
                    this.nota_evolucion.msg = data.msg,
                    this.nota_evolucion.fecha = "";
                    this.nota_evolucion.nota_evolucion = "";
                    this.nota_evolucion.msg_false = ""
                    this.list_notaEvolucion()
                }else{
                    this.nota_evolucion.msg_false = data.msg
                    this.nota_evolucion.msg = ""

                }

            })
            .catch(error => {
                this.nota_evolucion.msg_false = "Algo salio mal"
            })
           
        },  
        list_notaEvolucion(){

            axios
            .get(this.url+'/internaciones/vue_listEvolucion/'+this.idHist.id_int)
            .then(response => {
                this.nota_evolucion.listNotas_evolucion = response.data 
            })
        }, 

        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        //De diagnostico
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        inserMed(){
            if(this.daigTratameinto.med.medic == "" || this.daigTratameinto.med.dosis == "" || this.daigTratameinto.med.frecuencia == ""){
                
                this.daigTratameinto.msg_false = "Todos los campos son obligados en medicamento"
            }else{
                this.daigTratameinto.medicamentos.push({
                    medicamento: this.daigTratameinto.med.medic,
                    dosis: this.daigTratameinto.med.dosis,
                    frecuencia: this.daigTratameinto.med.frecuencia
                })
                this.daigTratameinto.med.medic = ""
                this.daigTratameinto.med.dosis = ""
                this.daigTratameinto.med.frecuencia = ""
                this.daigTratameinto.msg_false = ""
            }
           
        },
        eliminarMed(index){
            this.daigTratameinto.medicamentos.splice(index,1)
        },

        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //registrar diagnostico
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        reg_diagnostico(e){
            e.preventDefault(); 
            
            var data = {
                historial:this.idHist.hist,
                fecha:this.daigTratameinto.fecha,
                hora: this.daigTratameinto.hora,
                evolucion: this.daigTratameinto.evolucion,
                medicamentos:this.daigTratameinto.medicamentos,
                id_medico: this.idHist.id_medico
            }
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/internaciones/Vue_reg_diagnostico/'+this.idHist.id_int,esto)
            .then(res => res.json())
            .then(data => {
                console.log(data, "<<<<<<<<<<<<<<<<asd ")
                if (data.success == true){
                    this.daigTratameinto.msg = data.msg
                    this.daigTratameinto.fecha = ""
                    this.daigTratameinto.evolucion=""
                    this.daigTratameinto.medicamentos=[]
                    this.daigTratameinto.msg_false = ""
                }else{
                    this.daigTratameinto.msg_false = data.msg
                    this.daigTratameinto.msg = ""
                }
            })
        },  
        listaDiagnostico(){
            axios
            .get(this.url+'/internaciones/Vue_list_diagnostico/'+this.idHist.id_int)
            .then(response => {
                this.daigTratameinto.listDiagnostico = response.data
                console.log(response.data, "  <<<<<<<<<<<<<<<<<<<<<<<<  esto lo que quiero  <<<<<<<")       
            })
        }, 
        one_Diagnostico(id){
            axios
            .get(this.url+'/internaciones/Vue_oneTratamiento/'+id)
            .then(response => {               
                this.daigTratameinto.one_diagTratamiento = response.data
                console.log(this.daigTratameinto.one_diagTratamiento, " uno ><<<<<<<<<<<<<<")       
            })
        },
        clean_one_diagnostico(){
            this.daigTratameinto.one_diagTratamiento = ''
        }, 

        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                //registrar oreden de intervencion
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        postOrden_Intervencion(e){
            e.preventDefault();

            var data = {
                historial:this.idHist.hist,
                fechaOrden: this.ord_int.fechaOrden,
                nombre_cirujano: this.ord_int.nombre_cirujano,
                ayudantes: this.ord_int.ayudantes,
                diag_pre_operatorio: this.ord_int.diag_pre_operatorio,
                intr_parcticada: this.ord_int.intr_parcticada,
                diag_pos_operatorio: this.ord_int.diag_pos_operatorio,
                id_medico: this.idHist.id_medico
            }
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/internaciones/Vue_regOrden_Intervencion/'+this.idHist.id_int,esto)
            .then(res => res.json())
            .then(data => {
                console.log(data, " <<<<<<<<<< asdasd <<<<<<<<<<<<<< asd")
                if(data.success == true){
                    this.ord_int.msg = data.msg
                    this.ord_int.fechaOrden = ""
                    this.ord_int.nombre_cirujano = ""
                    this.ord_int.ayudantes = ""
                    this.ord_int.diag_pre_operatorio = ""
                    this.ord_int.intr_parcticada = ""
                    this.ord_int.diag_pos_operatorio = ""
                    this.ord_int.msg_false = ""
                    this.list_orden_intervencion()
                }else{
                    this.ord_int.msg_false = data.msg
                    this.ord_int.msg = ""
                }
            })
        },
        list_orden_intervencion(){
            axios
            .get(this.url+'/internaciones/Vue_list_ord_intervencion/'+this.idHist.id_int)
            .then(response => {
                this.ord_int.list_operaciones = response.data 
                console.log(this.ord_int.list_operaciones, "  <<<< lista de ordenes de intervencion")    
            })
        },
        OneOrd_intervencion(id){
            axios
            .get(this.url+'/internaciones/vueOne_ordintervencion/'+id)
            .then(response => {
                this.ord_int.one_intervencion = response.data                      
            })
        },

        formSubmit(e){
            e.preventDefault();

            var data = {
                historial:this.idHist.hist,
                Fecha_internacion:this.epicrisis.Fecha_internacion,
                Fecha_alta:this.epicrisis.Fecha_alta,
                datos_clinicos:this.epicrisis.datos_clinicos,
                diagnostico_admicion:this.epicrisis.diagnostico_admicion,
                diagnostico_egreso:this.epicrisis.diagnostico_egreso,
                condicion_egreso:this.epicrisis.condicion_egreso,
                causa_egreso:this.epicrisis.causa_egreso,
                examenes_complementario:this.epicrisis.examenes_complementario,
                tratamiento_quirurgico:this.epicrisis.tratamiento_quirurgico,
                tratamiento_medico:this.epicrisis.tratamiento_medico,
                complicaciones:this.epicrisis.complicaciones,
                pronostico_vital:this.epicrisis.pronostico_vital,
                pronostico_funcional:this.epicrisis.pronostico_funcional,
                control_tratamiento:this.epicrisis.control_tratamiento,
                recomendaciones:this.epicrisis.recomendaciones,
                id_medico: this.idHist.id_medico
            }
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/internaciones/Vue_reg_epicrisis/'+this.idHist.id_int,esto)
            .then(res => res.json())
            .then(data => { 
                if (data.success == true){
                    this.epicrisis.msg = data.msg
                    this.epicrisis.Fecha_internacion = ""
                    this.epicrisis.Fecha_alta = ""
                    this.epicrisis.datos_clinicos = ""
                    this.epicrisis.diagnostico_admicion = ""
                    this.epicrisis.diagnostico_egreso = ""
                    this.epicrisis.condicion_egreso = ""
                    this.epicrisis.causa_egreso = ""
                    this.epicrisis.examenes_complementario = ""
                    this.epicrisis.tratamiento_quirurgico = ""
                    this.epicrisis.tratamiento_medico = ""
                    this.epicrisis.complicaciones = ""
                    this.epicrisis.pronostico_vital = ""
                    this.epicrisis.pronostico_funcional = ""
                    this.epicrisis.control_tratamiento = ""
                    this.epicrisis.recomendaciones = ""
                    this.epicrisis.msg_false = ""
                    this.update_estado_internacion()
                    this.liverar_cama()
                
                    this.estado_alta = 'false'
                }else{
                    this.epicrisis.msg_false = data.msg
                    this.epicrisis.msg = ""
                    this.estado_alta = 'false'
                }
            
            })
        },

        update_estado_internacion(){   
            
            var data = {
                estado_alta : 'true'
            }
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/internaciones/vue_update_estado_alta/'+this.idHist.id_int,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                console.log(data)
            })
            
        },
        
        liverar_cama(){
            var data = { 
                historial: '0',              
                estado: 'true'
            };
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/internaciones/vue_update_cama_estado/'+this.idHist.id_cama,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                console.log(data)
            })
        }
        
    }
})
