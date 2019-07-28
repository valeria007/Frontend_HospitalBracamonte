const citas = new Vue({
    el:"#citas",
    data: () => ({ 
        dia:'Lunes',
        turno:'Mañanas',
        especialidades:'',
        doctores:'', 

        selectEsp:'',
        listCitas: '',        
        selectDoctor:'sdlfk', // esto es para poder sacar el dato que desde doctor en aqui esta el id       
    }),
    mounted(){
        axios
        .get('http://localhost:7000/paciente/vueEspecialidades_consulta/')
        .then(response => (
          this.especialidades = response.data
        ))
        
    },
    methods:{
        especilida(){
            axios
            .get('http://localhost:7000/paciente/vueDoctores/'+this.selectEsp+"/"+this.dia+"/"+this.turno)
            .then(response => {
                
               var data = []
              for(var i = 0; i< response.data[0].Doctores.length; i++){
                if(response.data[0].Doctores[i].Fechas == ""){
                    console.log("NO HAY DOCOTORES")
                    
                }else{
                     data.push (response.data[0].Doctores[i])                 
                }                 
              }              
              this.doctores = data
            })
        },
        medicoTurnos(){
            /*axios
            .get('http://localhost:7000/paciente/doctorTurno/'+this.selectDoctor)
            .then(response => {
              //this.turno = response.data[0].Fechas[0].Turnos; 

              for(var i = 0; i < response.data[0].Fechas[0].Turnos.length; i++){
                if(response.data[0].Fechas[0].Turnos[i].diasAten == this.dia){
                    console.log(response.data[0].Fechas[0].Turnos[i].diasAten); 
                    this.turno = response.data[0].Fechas[0].Turnos[i].turno
                    console.log(this.turno)
                }
              }
                         
            })*/
        }
    }
})