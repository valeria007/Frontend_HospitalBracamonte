var reg_sala = new Vue({
    el : "#reg_sala",
    data: () =>({
        msg: "",

        sigla:"",
        nombre:"",

        id_especialidad: '',
        list_consulta_especialidad:'',


        data_medicos:'',
        ci_medico:'',
        nombre_medico: '',
        especilidad_lista_medicas:''
        
    }),
    mounted(){
      fetch('http://localhost:7000/cuaderno/VUe_lista_medicos')
      .then(res => res.json())
      .then(data => {
        this.data_medicos = data
      })
    },
    methods:{
        data(id){
            this.id_especialidad = id;
            this.msg = ""
        },
        reg_consultorio(e){
            e.preventDefault();
            data = {
                nombre:this.nombre,
                sigla: this.sigla                
            }
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch('http://localhost:7000/cuaderno/vue_regConsultorio/'+this.id_especialidad,esto)
            .then(res => res.json())
            .then(data => {
              if (data.success == true){
                this.msg = data.msg
                this.sigla = "",
                this.nombre = ""
              }else{
                this.msg = data.msg
              }
            })
        },

        list_medicos(){
          for(var i = 0; i < this.data_medicos.length; i++){
            if(this.data_medicos[i].ci == this.ci_medico){
              console.log(this.data_medicos[i].nombre)
              this.nombre_medico = this.data_medicos[i].nombre+' '+this.data_medicos[i].apellidop+' '+this.data_medicos[i].apellidom
            }
          }
        },
        register_medicos(e){
          e.preventDefault();
          data = {
            nombre_doctor: this.nombre_medico,       
            ci:this.ci_medico        
          }
          var esto = {
              method: 'POST',
              body: JSON.stringify(data),
              headers:{
                'Content-type' : "application/json"
              }
          };
          fetch('http://localhost:7000/cuaderno/Vue_reg_doctor_especialidad/'+this.id_especialidad,esto)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.success == true){
              this.msg = data.msg
              this.nombre_medico = ""
            }else{
              this.msg = data.msg
            }
          })
          
        },
        lista_doctores(){
          fetch('http://localhost:7000/cuaderno/vue_only_list_doctores_especialidad/'+this.id_especialidad)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            this.especilidad_lista_medicas = data
          })
        },
        lista_consulta(){
          fetch('http://localhost:7000/cuaderno/vue_list_EspCons/'+this.id_especialidad)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            this.list_consulta_especialidad = data
          })
        }
    }
})