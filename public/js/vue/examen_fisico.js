const examen_f = new Vue({
    el:"#examen_f",
    data:{
        url:data_url.url_front_end,
        id_paciente:'',
        msg: "",
        msg_false:'',
       
        peso:'',
        talla:'',
        temperatura:'',
        frecuencia_cardiaca:'',
        respiracion:'',
        presion:'',
        saturacion_oxigeno:'',
        fecha_revision:'',        
        id_user :'',

        examen_list:'',
        idExamen:'',
        one_examen:''
    },
    mounted(){
        this.fecha_revision = moment().format('l'); 
        fetch(this.url+'/datos_generales_paciente/vue_list_examenFisico/'+this.id_paciente)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            this.examen_list = data
            console.log(this.examen_list, " esto es lo quiero ver")
        })
    },
    methods:{
        //registrar examen fisico
        reg_examen_fisico(e){
            e.preventDefault();
            var data = {
                peso:this.peso,
                talla:this.talla,
                temperatura:this.temperatura,
                frecuencia_cardiaca:this.frecuencia_cardiaca,
                respiracion:this.respiracion,
                presion:this.presion,
                saturacion_oxigeno:this.saturacion_oxigeno,
                fecha_revision:this.fecha_revision,        
                id_user :this.id_user,
            };
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/datos_generales_paciente/vue_reg_exFisico/'+this.id_paciente,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                if(data.success == true){
                    this.peso = ""
                    this.talla = ""
                    this.temperatura = ""
                    this.frecuencia_cardiaca = ""
                    this.respiracion = ""
                    this.presion = ""
                    this.saturacion_oxigeno = ""
                    this.fecha_revision = "" 

                    this.msg = data.msg
                    this.msg_false = ""
                    this.list()
                }else{
                    this.msg_false = data.msg
                    this.msg = ""
                }
            })
        },
        list(){
            fetch(this.url+'/datos_generales_paciente/vue_list_examenFisico/'+this.id_paciente)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                this.examen_list = data
                console.log(this.examen_list, " esto es lo quiero ver")
            })
        },
        oneExamen(id_examen){
            this.idExamen = id_examen;
            fetch(this.url+'/datos_generales_paciente/Vue_one_ExFisico/'+id_examen)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                this.one_examen = data[0]     
                console.log(this.one_examen)          
            })
        },
        update_examen(e){
            e.preventDefault();
            var data = {     
                peso:this.one_examen.peso,
                talla:this.one_examen.talla,
                temperatura:this.one_examen.temperatura,
                frecuencia_cardiaca:this.one_examen.frecuencia_cardiaca,
                respiracion:this.one_examen.respiracion,
                presion:this.one_examen.presion,
                saturacion_oxigeno:this.one_examen.saturacion_oxigeno,
                fecha_revision:this.one_examen.fecha_revision, 
            };
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/datos_generales_paciente/vue_update_exFisico/'+this.idExamen,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                if(data.success == true){
                    this.msg = data.msg
                    this.msg_false = ""
                    this.list()   
                    this.oneExamen(this.idExamen)
                                    
                }else{
                    this.msg_false = data.msg
                    this.msg = ""
                }
            })
        }
    }
})