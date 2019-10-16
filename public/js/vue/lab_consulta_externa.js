const lab_consulta_externa = new Vue({
    el: '#lab_consulta_externa',    
    data : () => ({
        msg: "alejandro",
        ecografia:false,
        rayosX:false,
        laboratorio:false
    }),
    methods:{  
        ver_ecografia(){
            this.ecografia = true
            this.rayosX = false
            this.laboratorio = false
        },
        ver_rayosX(){
            this.rayosX = true
            this.ecografia = false
            this.laboratorio = false
        },
        ver_lab(){
            this.laboratorio = true
            this.rayosX = false
            this.ecografia = false
            
        }
    }

})