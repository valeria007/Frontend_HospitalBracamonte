const carMedicamentos = new Vue({
    el: '#carMedicamentos',    
    data : () => ({
        medicamentos: [],
        itemsCar:[],
        qty:[],
        
        items : {},
        totalQty : 0,
        totalPrice : 0,
        
        carrito:'',

        codigoCompra:'',
        boletaPago:'',
        tipoMaterial:'',
        fechaIngreso:'',
        proveedor:'',
        Observaciones:'',

        respuestaPost:'',

        getPedido:[]
    }),
    methods:{
        agregar: function (){
            axios
            .get('http://localhost:7000/pedidos/vuePedidos')
            .then(response => {
              this.medicamentos = response.data;
              //console.log(response.data)
              
            })
        },
        insertar: function (id){
            axios
            .get('http://localhost:7000/pedidos/carrito/'+id)
            .then(response => {
                var car = {
                    id: response.data.id,
                    codificacion: response.data.codificacion,
                    nombre: response.data.nombre,
                    cantidad: response.data.cantidad,
                    price: response.data.price
                }   
                this.itemsCar = car;
                this.add(car,id);
                this.carrito = this.generateArray()
            })            
        },       

        add: function(item, id)  {
            let storedItem = this.items[id];
            if (!storedItem) {
                storedItem = this.items[id] = {
                    item: item,
                    qty: 0,
                    price: 0
                };
                
            }
            storedItem.qty++;
            storedItem.price = storedItem.item.price * storedItem.qty;
            this.totalQty++;
            this.totalPrice += 1*storedItem.item.price;
            
        },

        reduceByOne (id) {
            this.items[id].qty--;
            this.items[id].price -= this.items[id].item.price;
            this.totalQty--;
            this.totalPrice -= this.items[id].item.price;
    
            if (this.items[id].qty <= 0) {
                console.log(this.items[id])
                delete this.items[id];
            }
        },

        removeItem(id) {
            this.totalQty -= this.items[id].qty;
            this.totalPrice -= this.items[id].price;
            delete this.items[id];
        },

        generateArray: function () {
            let arr = [];
            for (const id in this.items) {
                arr.push(this.items[id]);
            }
            return arr;
        },
        
        formSubmit(e) {
            e.preventDefault();
            if( this.generateArray() == ""){
                this.respuestaPost = "No se seleciono un producto"
                console.log(this.respuestaPost)
            }else{
                axios.post('http://localhost:7000/pedidos/PostCarrito', {
                    codigoCompra:this.codigoCompra,
                    boletaPago:this.boletaPago,
                    tipoMaterial:this.tipoMaterial,
                    fechaIngreso:this.fechaIngreso,
                    proveedor:this.proveedor,
                    productosDelPedido: this.generateArray(),
                    Observaciones:this.Observaciones,
                    subTotal:this.totalPrice,
                    iva:this.totalPrice * 0.13,
                    total:this.totalPrice + this.totalPrice * 0.13
                })
                .then(function (response) {
                    console.log(response)
                    this.respuestaPost = '';
                })
                .catch(function (error) {
                    console.log(error)
                });
            }            
        },
        pedidos(){
            axios
            .get('http://localhost:7000/pedidos/vuePEDIDOS1')
            .then(response => {
              this.getPedido = response.data
              console.log(this.getPedido)
            })
        }
    }    
})
