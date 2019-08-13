const roles = new Vue({
    el:"#roles",
    data: () => ({
        mensaje : " hola aljand ",
        email:' esto ',
        roles: {
            nombre:"",
            apellidop:"",
            apellidom:"",
            ci:"",
            cargo:"",
            direcion:"",
            telefono: "",
            roles:{},
            rolUser: ""

        }
    }),
    methods:{
        traer(id){
            fetch('http://localhost:7000/usuarios/roles/'+id)
            .then(res => res.json())
            .then(res => {              
                this.roles.nombre = res[0].nombre
                this.roles.apellidop   = res[0].apellidop
                this.roles.apellidom = res[0].apellidom
                this.roles.ci = res[0].ci
                this.roles.cargo = res[0].cargo
                this.roles.direcion = res[0].direcion
                this.roles.telefono = res[0].telefono
                this.roles.roles = res[0].Users           
                
                console.log(this.roles.roles)
            })
        },

        mostrar_roles(){
            console.log("click")
            for(var i = 0 ; i < this.roles.roles.length; i++){
                if( this.roles.roles[i].email == this.email){
                    
                    this.roles.rolUser = this.roles.roles[i].role[0].name
                    console.log(this.roles.rolUser)
                }
            }
        }
    }
})