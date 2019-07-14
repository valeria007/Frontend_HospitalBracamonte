var app = new Vue({
    el:"#app",
    data:{
        esto:'',
        ocultar:{
            genData: false
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

        one_epicrisis:[]

    },
    methods:{
        ocultar2: function(){
            this.ocultar.genData = !this.ocultar.genData
        },

        idHistorial(id,historial1){
            this.idHist.id_int = id
            this.idHist.hist = historial1
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
        async oneEpicrisis(id_internacion){
            axios
            .get('http://localhost:7000/internaciones/one_epicrisis/'+id_internacion)
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

        updateEpicrisis(e){
            e.preventDefault();
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
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
            
        }
    }
})