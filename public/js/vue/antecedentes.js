const antecedentes = new Vue({
    el:"#antecedentes",
    data:{
        url:data_url.url_front_end,
        msg: "",
        msg_false:'',
        id_paciente:'',

        fecha_registro:'',
        familiares:'',
        personales_patologicos:'',
        personales_no_patologicos:'',
        gineco_obstetrico:'',
        descripcion:'',       
        id_medico:'',

        antc_list:{}
    },
    mounted(){
        this.fecha_registro = moment().format('l'); 
        fetch(this.url+'/datos_generales_paciente/vue_list_antecedentes/'+this.id_paciente)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            this.antc_list = data
            console.log(this.antc_list, " esto es lo quiero ver")
        })
    },
    methods:{
        reg_antecedentes(e){
            e.preventDefault();
            var data = {
                fecha_registro:this.fecha_registro,
                familiares:this.familiares,
                personales_patologicos:this.personales_patologicos,
                personales_no_patologicos:this.personales_no_patologicos,
                gineco_obstetrico:this.gineco_obstetrico,
                descripcion:this.descripcion,       
                id_medico:this.id_medico,
            };
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url+'/datos_generales_paciente/vue_antecedentes/'+this.id_paciente,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                if(data.success == true){
                    this.familiares = ''
                    this.personales_patologicos = ''
                    this.personales_no_patologicos = ''
                    this.gineco_obstetrico = ''
                    this.descripcion = ''  
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
            fetch(this.url+'/datos_generales_paciente/vue_list_antecedentes/'+this.id_paciente)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                this.antc_list = data
                console.log(this.antc_list, " esto es lo quiero ver")
            })
        },
        
    },
})