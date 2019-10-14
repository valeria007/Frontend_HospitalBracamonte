
const ver_pedido_farmacia =  new Vue({
    el:'#ver_pedido_farmacia',
    data: () => ({
        msg: "aljand",
        id_pedido:'',

        data_pedido:'',
        list:[],
        totalPrice:'',
        total_cantidad:'',

        list_almacen:'',

        list_acep_farmacia:''
    }),
    mounted() {
        fetch('http://localhost:7000/almacen/Vue_one_pedido_farmacia/'+this.id_pedido)
        .then(resp => resp.json())
        .catch(error => console.error('Error',error))
        .then(resp => {
            this.list_acep_farmacia = resp[0].medicamento_aceptado_farmacia
            this.list_almacen = resp[0].medicamento_mandado_almacen
            this.data_pedido = resp
            this.totalPrice = resp[0].medicamentos.totalPrice
            this.total_cantidad = resp[0].medicamentos.total_cantidad
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

        list_acep(){
            fetch('http://localhost:7000/almacen/Vue_one_pedido_farmacia/'+this.id_pedido)
            .then(resp => resp.json())
            .catch(error => console.error('Error',error))
            .then(resp => {
                this.list_acep_farmacia = resp[0].medicamento_aceptado_farmacia
            })
        },
        add_medicamento(id_medicamento, index){
           
            fetch('http://localhost:7000/farmacia/vue_medicamento/'+id_medicamento)
            .then(resp => resp.json())
            .catch(error => console.error('Error',error))
            .then(response => {
                console.log(index)
                var car = {
                    id: response[0].id,
                    codificacion: response[0].codificacion,
                    nombre: response[0].nombre,
                    //cantidad: response[0].cantidad_unidad,
                    price: response[0].precio_compra
                } 
                this.add(car, index)
                
            })
        },
        add: function(item, id)  {
            let storedItem = this.list[id];
            if (!storedItem) {
              storedItem = this.list[id] = {
                item: item,
                qty: 0,
                price: 0
              };
            }
            storedItem.qty++;
            storedItem.price = storedItem.item.price * storedItem.qty;
            this.total_cantidad++;
            this.totalPrice += 1*storedItem.item.price;
    
          },

        reduceByOne (id) {
           
            this.list[id].qty--;
            this.list[id].price -= this.list[id].item.price;
            this.total_cantidad--;
            this.totalPrice -= this.list[id].item.price;
        
            if (this.list[id].qty <= 0) {
                this.list.splice(id, 1)
            }
        },
        generateArray: function () {
            let arr = [];
            for (const id in this.list) {
                arr.push(this.list[id]);
            }
            return arr;
        },

        update_pedido(e){
            e.preventDefault();
            var data  = {
                medicamento_aceptado_farmacia:{
                
                    lista_med:this.list,
                    totalQty : this.total_cantidad,
                    totalPrice : this.totalPrice,
                
              }
            };
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch('http://localhost:7000/farmacia/update_pedido/'+this.id_pedido,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                if (data.success == true){
                    console.log(data, "   <<<<<<<<<<<<<<<<<<<")
                    this.insertar()
                    this.update_cantidad()                    
                    this.list_acep()
                }else{
                    console.log(data, "no esta dando")
                }
            })
        },
        insertar(){

            for(var i = 0; i < this.list.length; i++){
                 data = {
                    fehca_vencimineto: this.list[i].fehca_vencimineto,
                    cantidad_unidad : this.list[i].qty,
                    precio :  this.list[i].price
                }
                var esto = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                      'Content-type' : "application/json"
                    }
                };
                fetch('http://localhost:7000/farmacia/register_cantidad_fecha/'+this.list[i].item.id,esto)
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(resp => {  
                    console.log(resp);
                }) 
            }
        },
        update_cantidad(){

            for(var i=0; i < this.list.length; i++){
                data = { 
                    entradas: this.list[i].qty,
                    cantidad_unidad: this.list[i].qty 
                }
                var esto = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                      'Content-type' : "application/json"
                    }
                };
                fetch('http://localhost:7000/farmacia/sumar_cantidad/'+this.list[i].item.id,esto)
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(resp => {  
                    console.log(resp);
                })
            }

        }
    }
})