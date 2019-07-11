var tableLIst = new Vue({
    el : "#tableLIst",
    data: () =>({
        lista : [],
        historial:'',
        doctor:'',
        fecha_prescripcion:'',
        receta_de:'',

        id:1,
        prescripcion:"",
        instruciones: "",
        duracion_tratamiento:"",
        observaciones: ""
    }),
    methods:{
        insertar(){
            this.lista.push({
                id:this.id ++,
                prescripcion:this.prescripcion,
                instruciones:this.instruciones,
                duracion_tratamiento:this.duracion_tratamiento,
                observaciones:this.observaciones
            })
            this.prescripcion="";
            this.instruciones="";
            this.duracion_tratamiento="";
            this.observaciones="";
        },
        post(id) {
                var data = {
                    receta_de: this.receta_de,
                    historial: this.historial,
                    fechaEmicion: this.fecha_prescripcion,
                    nombre_doctor: this.doctor,
                    medicamentos: this.lista
                }
                axios.post('http://localhost:3000/api/receta_interncaion/'+id,data)
                .then(function (response) {
                    console.log(response, " <<<<<<<<<<<<<<<<<")
                })
                .catch(function (error) {
                    console.log(error)
                });          
        }
    } 
})