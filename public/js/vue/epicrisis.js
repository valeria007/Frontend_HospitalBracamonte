var app = new Vue({
    el:"#app",
    data:{
        esto:'',
        mensaje: 'aqui es el mensaje    ',
        ocultar:{
            genData: false,
            table: false,
            list_notasEvolucion:false,
            list_diagReseta: false
        },

        idHist:{
            id_int:'',
            hist:'',
            id_epicrisis:''
        },

        historial:'',
        fecha_internacion:'',
        fecha_alta:'',
        diasnostico_ingreso:'',
        res_examen_clinico:'',
        res_evolucion:'',
        meds_usados:'',
        diag_pos_operatorio:'',
        cirugias:'',
        res_anatomia_patologica:'',
        res_lab:'',
        diagnostico_final:'',
        estado_paciente_alta:'',
        res_autopcia:'',

        one_epicrisis:[],

        orden_internacion:{
            esto1:'',
            list_Orden_intervencion:[],
            reg_orden_intervencion:{

                historial:'',
                fechaOrden:'',
                motivoInternacion:'',
                resumneDatosClinicos:'',
                examenComplementario:'',
                diagnostico:'',
                resumenEgreso:'',
                tratamientoIndicado:'',
                diagnosticoEgreso:'',
                planManejoTratamiento:'',
                resAutopcia:'',
                observacion:'',
                condicionEgreso:'',
                CausaEgreso:''

            },

            one_intervencion:[]
        },

        nota_evolucion:{
            fecha:'',
            nota_evolucion:'',
            listNotas_evolucion:[],
            one_notaEvolucion:''
        },

        //esto es para diagnostico tratamiento
        daigTratameinto:{
            fecha:'',
            sintomas:'',
            examenFisico:'',
            diagnostico:'',
            tratamiento:'',
            medicamentos:[],
            estudios:[],

            listDiagnostico:[],

            med:{
                medic:'',
                dosis:'',
                frecuencia:'',
                duracion:''
            },
            est:{
                estud:'',
                nombre_estudio:''
            },

            one_diagTratamiento:'',
        }

    },
    methods:{       
        ocultar2: function(){
            this.ocultar.genData = !this.ocultar.genData
        },

        idHistorial(id,historial1){
            this.idHist.id_int = id
            this.idHist.hist = historial1

            console.log(id, " ssd ", historial1)
        },

        formSubmit(e){
            e.preventDefault();
            
            axios.post('http://localhost:7000/internaciones/Vue_reg_epicrisis/'+this.idHist.id_int, {
                historial:this.idHist.hist,
                Fecha_internacion:this.fecha_internacion,
                Fecha_alta:this.fecha_alta,
                diagnostico_ingreso:this.diasnostico_ingreso,
                resumenExmen_clinico: this.res_examen_clinico,
                resumen_evolucion:this.res_evolucion,
                medicamentos_usados:this.meds_usados,
                diagnosticoPos_operatorio:this.diag_pos_operatorio,
                intervenciones_quirurgicas:this.cirugias,
                resAnatomia_patologica:this.res_anatomia_patologica,
                resAllasgos_lab:this.res_lab,
                diagnostico_final:this.diagnostico_final,
                estadoPaciente_alta:this.estado_paciente_alta,
                result_autopcia:this.res_autopcia
                })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });

                this.fecha_alta = "";
                this.fecha_internacion = "";
                this.diasnostico_ingreso= "";
                this.res_examen_clinico= "";
                this.res_evolucion= "";
                this.meds_usados= "";
                this.diag_pos_operatorio= "";
                this.cirugias= "";
                this.res_anatomia_patologica= "";
                this.res_lab= "";
                this.diagnostico_final= "";
                this.estado_paciente_alta= "";
                this.res_autopcia= "";
                this.oneEpicrisis(this.idHist.id_int);

        },

        updateEpicrisis(e){
            e.preventDefault();
            var esto;
            axios
            .post('http://localhost:7000/internaciones/update_epicrisis/'+this.idHist.id_epicrisis, {
                Fecha_internacion:this.fecha_internacion,
                Fecha_alta:this.fecha_alta,
                diagnostico_ingreso:this.diasnostico_ingreso,
                resumenExmen_clinico: this.res_examen_clinico,
                resumen_evolucion:this.res_evolucion,
                medicamentos_usados:this.meds_usados,
                diagnosticoPos_operatorio:this.diag_pos_operatorio,
                intervenciones_quirurgicas:this.cirugias,
                resAnatomia_patologica:this.res_anatomia_patologica,
                resAllasgos_lab:this.res_lab,
                diagnostico_final:this.diagnostico_final,
                estadoPaciente_alta:this.estado_paciente_alta,
                result_autopcia:this.res_autopcia
            })
            .then(function (response) {
                
                esto = response.data.success
                console.log(response.data)
                
            })
            .catch(function (error) {
                console.log(error)
            });
            this.mensaje = esto
        },

        //muestar una epicrisis
        oneEpicrisis(){
            console.log(this.idHist.id_int, " <<<<<<<<<<<<<<<<<<   este es el id de internacion")
            axios
            .get('http://localhost:7000/internaciones/one_epicrisis/'+this.idHist.id_int)
            .then(response => {
                this.one_epicrisis = response.data

                this.idHist.id_epicrisis = this.one_epicrisis[0].id; 

                
                this.fecha_internacion = this.one_epicrisis[0].Fecha_internacion;
                this.fecha_alta = this.one_epicrisis[0].Fecha_alta;
                this.diasnostico_ingreso= this.one_epicrisis[0].diagnostico_ingreso;        
                this.res_examen_clinico= this.one_epicrisis[0].resumenExmen_clinico;
                this.res_evolucion= this.one_epicrisis[0].resumen_evolucion;
                this.meds_usados= this.one_epicrisis[0].medicamentos_usados;
                this.diag_pos_operatorio= this.one_epicrisis[0].diagnosticoPos_operatorio;
                this.cirugias= this.one_epicrisis[0].intervenciones_quirurgicas;
                this.res_anatomia_patologica= this.one_epicrisis[0].resAnatomia_patologica;
                this.res_lab= this.one_epicrisis[0].resAllasgos_lab;
                this.diagnostico_final= this.one_epicrisis[0].diagnostico_final;
                this.estado_paciente_alta= this.one_epicrisis[0].estadoPaciente_alta;
                this.res_autopcia= this.one_epicrisis[0].result_autopcia;
                console.log(this.one_epicrisis)       
            })
        },

        // desde aqui es para orden de intervencion
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        postOrden_Intervencion(e){
            e.preventDefault();

            axios.post('http://localhost:7000/internaciones/Vue_regOrden_Intervencion/'+this.idHist.id_int, {
                historial:this.idHist.hist,
                fechaOrden:this.orden_internacion.reg_orden_intervencion.fechaOrden,
                motivoInternacion:this.orden_internacion.reg_orden_intervencion.motivoInternacion,
                resumneDatosClinicos:this.orden_internacion.reg_orden_intervencion.resumneDatosClinicos,
                examenComplementario:this.orden_internacion.reg_orden_intervencion.examenComplementario,
                diagnostico:this.orden_internacion.reg_orden_intervencion.diagnostico,
                resumenEgreso:this.orden_internacion.reg_orden_intervencion.resumenEgreso,
                tratamientoIndicado:this.orden_internacion.reg_orden_intervencion.tratamientoIndicado,
                diagnosticoEgreso:this.orden_internacion.reg_orden_intervencion.diagnosticoEgreso,
                planManejoTratamiento:this.orden_internacion.reg_orden_intervencion.planManejoTratamiento,
                resAutopcia:this.orden_internacion.reg_orden_intervencion.resAutopcia,
                observacion:this.orden_internacion.reg_orden_intervencion.observacion,
                condicionEgreso:this.orden_internacion.reg_orden_intervencion.condicionEgreso,
                CausaEgreso:this.orden_internacion.reg_orden_intervencion.CausaEgreso
                })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });                
                this.orden_internacion.reg_orden_intervencion.fechaOrden=''
                this.orden_internacion.reg_orden_intervencion.motivoInternacion=''
                this.orden_internacion.reg_orden_intervencion.resumneDatosClinicos=''
                this.orden_internacion.reg_orden_intervencion.examenComplementario=''
                this.orden_internacion.reg_orden_intervencion.diagnostico=''
                this.orden_internacion.reg_orden_intervencion.resumenEgreso=''
                this.orden_internacion.reg_orden_intervencion.tratamientoIndicado=''
                this.orden_internacion.reg_orden_intervencion.diagnosticoEgreso='',
                this.orden_internacion.reg_orden_intervencion.planManejoTratamiento=''
                this.orden_internacion.reg_orden_intervencion.resAutopcia=''
                this.orden_internacion.reg_orden_intervencion.observacion=''
                this.orden_internacion.reg_orden_intervencion.condicionEgreso=''
                this.orden_internacion.reg_orden_intervencion.CausaEgreso=''
        },

        async ListOrd_intervencion(id_internacion){
            axios
            .get('http://localhost:7000/internaciones/Vue_list_ord_intervencion/'+id_internacion)
            .then(response => {
                this.orden_internacion.list_Orden_intervencion = response.data
                console.log(this.orden_internacion.list_Orden_intervencion, "  <<<<<<<<<<<<<<<<<<<<<<<<  esto lo que quiero  <<<<<<<")       
            })
        },
        async OneOrd_intervencion(id){
            axios
            .get('http://localhost:7000/internaciones/vueOne_ordintervencion/'+id)
            .then(response => {
                this.orden_internacion.one_intervencion = response.data
                console.log(response.data, " respuesta de one intervencion  ")
                this.orden_internacion.reg_orden_intervencion.fechaOrden = this.orden_internacion.one_intervencion[0].fechaOrden
                this.orden_internacion.reg_orden_intervencion.motivoInternacion = this.orden_internacion.one_intervencion[0].motivoInternacion
                this.orden_internacion.reg_orden_intervencion.resumneDatosClinicos = this.orden_internacion.one_intervencion[0].resumneDatosClinicos
                this.orden_internacion.reg_orden_intervencion.examenComplementario = this.orden_internacion.one_intervencion[0].examenComplementario
                this.orden_internacion.reg_orden_intervencion.diagnostico = this.orden_internacion.one_intervencion[0].diagnostico
                this.orden_internacion.reg_orden_intervencion.resumenEgreso = this.orden_internacion.one_intervencion[0].resumenEgreso
                this.orden_internacion.reg_orden_intervencion.tratamientoIndicado = this.orden_internacion.one_intervencion[0].tratamientoIndicado
                this.orden_internacion.reg_orden_intervencion.diagnosticoEgreso = this.orden_internacion.one_intervencion[0].diagnosticoEgreso
                this.orden_internacion.reg_orden_intervencion.planManejoTratamiento = this.orden_internacion.one_intervencion[0].planManejoTratamiento
                this.orden_internacion.reg_orden_intervencion.resAutopcia = this.orden_internacion.one_intervencion[0].resAutopcia
                this.orden_internacion.reg_orden_intervencion.observacion = this.orden_internacion.one_intervencion[0].observacion
                this.orden_internacion.reg_orden_intervencion.condicionEgreso = this.orden_internacion.one_intervencion[0].condicionEgreso
                this.orden_internacion.reg_orden_intervencion.CausaEgreso = this.orden_internacion.one_intervencion[0].CausaEgreso
                      
            })
        },

        volver(){
            this.orden_internacion.one_intervencion = [];
            this.orden_internacion.reg_orden_intervencion.fechaOrden=''
            this.orden_internacion.reg_orden_intervencion.motivoInternacion=''
            this.orden_internacion.reg_orden_intervencion.resumneDatosClinicos=''
            this.orden_internacion.reg_orden_intervencion.examenComplementario=''
            this.orden_internacion.reg_orden_intervencion.diagnostico=''
            this.orden_internacion.reg_orden_intervencion.resumenEgreso=''
            this.orden_internacion.reg_orden_intervencion.tratamientoIndicado=''
            this.orden_internacion.reg_orden_intervencion.diagnosticoEgreso='',
            this.orden_internacion.reg_orden_intervencion.planManejoTratamiento=''
            this.orden_internacion.reg_orden_intervencion.resAutopcia=''
            this.orden_internacion.reg_orden_intervencion.observacion=''
            this.orden_internacion.reg_orden_intervencion.condicionEgreso=''
            this.orden_internacion.reg_orden_intervencion.CausaEgreso=''
        },

         // Desde aqui es para nota de evolucion
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        reg_nota_evolucion(e){
            e.preventDefault();
            axios
            .post('http://localhost:7000/internaciones/Vue_regNotaEvolucion/'+this.idHist.id_int, { 
                historial : this.idHist.hist,
                fecha : this.nota_evolucion.fecha,
                nota_evolucion : this.nota_evolucion.nota_evolucion,
            })
            .then(function (response) {

                if(response.data.success == true){
                    this.msg = "se guardo con exito"
                    console.log(response.data) 
                }else{
                    msg = " algo salio mal "
                }
            })
            .catch(function (error) {
                console.log(error)
            });
            this.nota_evolucion.fecha = "";
            this.nota_evolucion.nota_evolucion = "";
            this.ocultar.list_notasEvolucion = true
            this.list_notaEvolucion()
           
        },

        list_notaEvolucion(){
            axios
            .get('http://localhost:7000/internaciones/vue_listEvolucion/'+this.idHist.id_int)
            .then(response => {
                this.nota_evolucion.listNotas_evolucion = response.data
                console.log(response.data, "  <<<<<<<<<<<<<<<<<<<<<<<<  esto lo que quiero  <<<<<<<")       
            })
        },

        //One nota de evolucion 

        one_evolucion(id_nota){
            axios
            .get('http://localhost:7000/internaciones/vue_one_notaEvolucion/'+id_nota)
            .then(response => {
                this.nota_evolucion.one_notaEvolucion = response.data

                this.nota_evolucion.fecha = response.data[0].fecha;
                this.nota_evolucion.nota_evolucion = response.data[0].nota_evolucion;
                console.log(response.data.fecha, "  <<<<<<<<<<<<<<<<<<<<<<<<  esto lo que quiero  <<<<<<<")       
            })
        },

        limpiar_oneLista_nota(){
            
            this.nota_evolucion.fecha = '';
            this.nota_evolucion.nota_evolucion = '';
            this.nota_evolucion.one_notaEvolucion = '';
        },

        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>><<<<<<<<<
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        // desde aqui es para daignostico tratamiento
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        eliminarMed(index){
            this.daigTratameinto.medicamentos.splice(index,1)
        },

        eliminarEstudio(index){
            this.daigTratameinto.estudios.splice(index,1)
        },

        inserMed(){
            this.daigTratameinto.medicamentos.push({
                medicamento: this.daigTratameinto.med.medic,
                dosis: this.daigTratameinto.med.dosis,
                frecuencia: this.daigTratameinto.med.frecuencia,
                duracion: this.daigTratameinto.med.duracion
            })
            this.daigTratameinto.med.medic = ""
            this.daigTratameinto.med.dosis = ""
            this.daigTratameinto.med.frecuencia = ""
            this.daigTratameinto.med.duracion = ""
        },

        inserEstudio(){
            this.daigTratameinto.estudios.push({
                estudios : this.daigTratameinto.est.estud,
                nombreEstudio : this.daigTratameinto.est.nombre_estudio
            })
            this.daigTratameinto.est.estud = ""
            this.daigTratameinto.est.nombre_estudio =""
        },

        

        reg_diagnostico(e){
            e.preventDefault();            
            axios
            .post('http://localhost:7000/internaciones/Vue_reg_diagnostico/'+this.idHist.id_int,{
                historial:this.idHist.hist,
                fecha:this.daigTratameinto.fecha,
                sintomas:this.daigTratameinto.sintomas,
                examenFisico:this.daigTratameinto.examenFisico,
                diagnostico:this.daigTratameinto.diagnostico,
                tratamiento:this.daigTratameinto.tratamiento,

                medicamentos:this.daigTratameinto.medicamentos,
                estudios:this.daigTratameinto.estudios,
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
            this.daigTratameinto.fecha = ""
            this.daigTratameinto.sintomas = ""
            this.daigTratameinto.examenFisico = ""
            this.daigTratameinto.diagnostico = " "
            this.daigTratameinto.tratamiento = ""

            this.daigTratameinto.medicamentos = []
            this.daigTratameinto.estudios = []
        },
        
        listaDiagnostico(){
            axios
            .get('http://localhost:7000/internaciones/Vue_list_diagnostico/'+this.idHist.id_int)
            .then(response => {
                this.daigTratameinto.listDiagnostico = response.data
                console.log(response.data, "  <<<<<<<<<<<<<<<<<<<<<<<<  esto lo que quiero  <<<<<<<")       
            })
        },

        one_Diagnostico(id){
            axios
            .get('http://localhost:7000/internaciones/Vue_oneTratamiento/'+id)
            .then(response => {
                this.daigTratameinto.one_diagTratamiento = response.data

                this.daigTratameinto.sintomas = response.data[0].sintomas
                this.daigTratameinto.examenFisico = response.data[0].examenFisico
                this.daigTratameinto.diagnostico = response.data[0].diagnostico
                this.daigTratameinto.tratamiento = response.data[0].tratamiento

                this.daigTratameinto.medicamentos = response.data[0].medicamentos
                this.daigTratameinto.estudios = response.data[0].estudios

                console.log(response.data, " uno ><<<<<<<<<<<<<<")       
            })
        },
        limpiar_oneDiagnostico(){
            this.daigTratameinto.one_diagTratamiento = ""
            this.daigTratameinto.sintomas = ""
            this.daigTratameinto.examenFisico = ""
            this.daigTratameinto.diagnostico = ""
            this.daigTratameinto.tratamiento = ""
            this.daigTratameinto.medicamentos = ""
            this.daigTratameinto.estudios = ""
        }
    }
})
