const cuadernos = new Vue({
    el:"#cuadernos",
    data:() => ({
        mensaje: " Hola ",
        url:data_url,
        fechas:[],
        id:'',
        Turnos:'',

        //esta parte es para el buscador
        buscar:{
            lists:[],
            name: ''
        }
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }),
    methods:{
        mostrar(id){
            fetch(this.url.url_front_end+'/cuaderno/vueCuaderno/'+id)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.fechas = res[0].Fechas 
                this.turnosFechas()      
                  
            })
        },
        turnosFechas(){
            
            for(var i = 0; i < this.fechas.length; i++){
                if (this.fechas[i].id == this.id){  
                    
                    this.Turnos = this.fechas[i].Turnos
                
                }
            }
        },

        buscador(id){
            console.log(id, " esto es el id del cuaderno")
            fetch(this.url.url_front_end+'/cuaderno/VueDoctores/'+id)
            .then(res => res.json())
            .then(res => {
                this.buscar.lists = res
                console.log(this.buscar.lists, " esto son los doctores de este cuaderno")                  
            })
        },
        deleteList(){
            this.buscar.lists = [];
        }
    },
    computed:{
        search(){
            return this.buscar.lists.filter((item) => item.nombre.includes(this.buscar.name));
        }
    }

})