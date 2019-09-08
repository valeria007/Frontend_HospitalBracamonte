var reg_sala = new Vue({
    el : "#reg_sala",
    data: () =>({
        msg: "",

        sigla:"",
        nombre:"",

        id_especialidad: ''
        
    }),

    

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
                this.id_especialidad = "",
                this.sigla = "",
                this.nombre = ""
              }else{
                this.msg = data.msg
              }
            })
        }
    }
})