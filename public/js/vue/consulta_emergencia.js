const consulta_emergencia = new Vue({
    el:"#consulta_emergencia",
    data:() => ({
        msg:'aljand321',
        one_consulta:''
    }),
    methods:{
        One_consulta(id){
            fetch('http://localhost:3000/api/EmergenciaP/'+id)
            .then(resp => resp.json())
            .then(resp =>{
                console.log(resp)
                this.one_consulta ={
                    Nhistorial:resp[0].Nhistorial,
                    nombreDoctor:resp[0].nombreDoctor,
                    apellidoD1:resp[0].apellidoD1,
                    apellidoD2:resp[0].apellidoD2,
                    motivoConsulta:resp[0].motivoConsulta,
                    diagnostico:resp[0].diagnostico,
                    tratamiento:resp[0].tratamiento,
                    observaciones:resp[0].observaciones,
                    nombre:resp[0].Citas_Medica.Paciente.nombre,
                    apellidop:resp[0].Citas_Medica.Paciente.apellidop,
                    apellidom:resp[0].Citas_Medica.Paciente.apellidom,
                    fechanacimiento:resp[0].Citas_Medica.Paciente.fechanacimiento,
                    sexo:resp[0].Citas_Medica.Paciente.sexo
                }
                console.log(this.one_consulta)
            })
        }
    }
})
