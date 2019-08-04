const citas = new Vue({
    el:"#citas",
    data: () => ({ 
        dia:'Lunes',
        turno:'Mañanas',
        especialidades:'',
        doctores:[], 

        selectEsp:'',
        listCitas: '',        
        selectDoctor:'sdlfk', // esto es para poder sacar el dato que desde doctor en aqui esta el id 
        
        horas_Turno:[],
        horas_Turno_reservado:[],
        horas_Turno_atendido:[]
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
      saca_horas(){
       
        var horas_turnos, mayor = 0;
        for(var i = 0; i < this.doctores.length; i++){
          if(this.doctores[i].nombre == this.selectDoctor){
           
            horas_turnos = this.doctores[i].Fechas
            console.log(this.doctores[i].nombre)
          }
        }
        //console.log(horas_turnos, "  fechas")
        for(var i = 0; i < horas_turnos.length; i++){
          if (horas_turnos[i].id > mayor){
            mayor = horas_turnos[i].id;
          };
          
        }
         var orden =[]
        for(var i = 0; i<horas_turnos.length; i++){
          if(horas_turnos[i].id == mayor){
           
           orden = horas_turnos[i].Turnos[0].horas_of_trunos
          }
        }
        
        arr = []
        for(var i = 0; i < orden.length; i++){
          if(orden[i].estado == "libre"){
            arr.push({h:orden[i].hora, id:orden[i].id})
            console.log(orden[i], "  <<<<")
          }else{
            console.log(" no hay nada ¿")
          }
          
        }
        this.horas_Turno = arr.sort()
      },
      saca_horas_reservadas(){
       
        var horas_turnos, mayor = 0;
        for(var i = 0; i < this.doctores.length; i++){
          if(this.doctores[i].nombre == this.selectDoctor){
           
            horas_turnos = this.doctores[i].Fechas
            console.log(this.doctores[i].nombre)
          }
        }
        //console.log(horas_turnos, "  fechas")
        for(var i = 0; i < horas_turnos.length; i++){
          if (horas_turnos[i].id > mayor){
            mayor = horas_turnos[i].id;
          };
          
        }
         var orden =[]
        for(var i = 0; i<horas_turnos.length; i++){
          if(horas_turnos[i].id == mayor){
           
           orden = horas_turnos[i].Turnos[0].horas_of_trunos
          }
        }
        
        arr = []
        for(var i = 0; i < orden.length; i++){
          if(orden[i].estado == "reservado"){
            arr.push({h:orden[i].hora, id:orden[i].id})
            console.log(orden[i], "  <<<<")
          }else{
            console.log(" no <<<<<<<<<<<<<")
          }
          
        }
        this.horas_Turno_reservado = arr.sort()
      },
      saca_horas_atendidas(){
       
        var horas_turnos, mayor = 0;
        for(var i = 0; i < this.doctores.length; i++){
          if(this.doctores[i].nombre == this.selectDoctor){
           
            horas_turnos = this.doctores[i].Fechas
            console.log(this.doctores[i].nombre)
          }
        }
        //console.log(horas_turnos, "  fechas")
        for(var i = 0; i < horas_turnos.length; i++){
          if (horas_turnos[i].id > mayor){
            mayor = horas_turnos[i].id;
          };
          
        }
         var orden =[]
        for(var i = 0; i<horas_turnos.length; i++){
          if(horas_turnos[i].id == mayor){
           
           orden = horas_turnos[i].Turnos[0].horas_of_trunos
          }
        }
        
        arr = []
        for(var i = 0; i < orden.length; i++){
          if(orden[i].estado == "atendido"){
            arr.push({h:orden[i].hora, id:orden[i].id})
            console.log(orden[i], "  <<<<")
          }else{
            console.log(" no 12 <<<<<<<<<<<<<")
          }
          
        }
        this.horas_Turno_atendido = arr.sort()
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