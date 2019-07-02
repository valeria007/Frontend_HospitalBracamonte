const pedidos =  new Vue({
    el:"#pedidos",
    data : () =>({
        medicamentos:[],
        carrito:'', // esto es para que se añada en la lista de medicamentos

        items : {},
        totalQty : 0,
        totalPrice : 0,

        codigo:'',
        responsable:'',
        recibe:'',
        fechaLlegada:'',

        respuestaPost:''
    }),

    methods:{
        medicamento: function (){
            axios
            .get('http://localhost:7000/distribucion/vueMedicamento')
            .then(response => {
              this.medicamentos = response.data;              
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
                    presentacion: response.data.presentacion,
                    price: response.data.price,
                   
                }                
                this.add(car,id);
                this.carrito = this.generateArray()
                console.log(this.carrito);   
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
                axios.post('http://localhost:7000/distribucion/vueMedicamento', {
                    codigo:this.codigo,
                    responsable:this.responsable,
                    recibe:this.recibe,
                    fechaLlegada:this.fechaLlegada,
                    productos:this.generateArray(),
                
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
    }
})