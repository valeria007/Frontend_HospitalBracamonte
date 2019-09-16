const ver_pedido_farmacia =  new Vue({
    el:'#ver_pedido_farmacia',
    data: () => ({
        msg: "aljand",
        id_pedido:'',

        data_pedido:'',
        list:''
    }),
    mounted() {
        fetch('http://localhost:7000/almacen/Vue_one_pedido_farmacia/'+this.id_pedido)
        .then(resp => resp.json())
        .catch(error => console.error('Error',error))
        .then(resp => {
            this.data_pedido = resp
            var arr= []
            for(var i = 0; i < resp[0].medicamentos.list_meds.length; i++){
                arr.push({
                    item: {
                        id : resp[0].medicamentos.list_meds[i].item.id,
                        codificacion : resp[0].medicamentos.list_meds[i].item.codificacion,
                        nombre : resp[0].medicamentos.list_meds[i].item.nombre,
                        price : resp[0].medicamentos.list_meds[i].item.price
                    },
                    fehca_vencimineto: '',
                    qty : resp[0].medicamentos.list_meds[i].qty,
                    price : resp[0].medicamentos.list_meds[i].price
                })
            }
            this.list = arr
        })  
    },
    methods:{
        pedido_farmacia(){
            
        }
    }
})
