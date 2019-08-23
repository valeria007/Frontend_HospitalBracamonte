Vue.filter('numeral', function (value) {
    return numeral(value).format('0,0');
})

const pedidos =  new Vue({
    el:"#pedidos",
    data : () => ({
        medicamentos:[],
        itemsCar:[],

        distribucionList : {},
        totalQty : 0,
        totalPrice : 0,

        codigo:'',
        responsable:'',
        recibe:'',
        fechaLlegada:'',

        //respuesta post
        respuestaPost:'',
        rep_post_false:'',
        respFalse: '',
        pass:'',

        listDistribucion:[],

        oneDistrbucion:[],

       //para buscar medicamentos para la desitribucion
       searchMed: '',
       ListMedicamentos:[],
       filteredMeds: [],
       paginatedMeds: [],
       paginationMeds: {
           range: 5,
           currentPage: 1,
           itemPerPage: 2,
           ListMedicamentos: [],
           filteredMeds: [],
       },
       //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }),

    mounted(){
      fetch('http://localhost:7000/distribucion/vueMedicamento')
      .then(res => res.json())
      .then(res => {
        for(var i = 0; i < res.length; i++){
          this.ListMedicamentos.push({
            id : res[i].id,
            nombre : res[i].nombre,
            cantidad : res[i].cantidad,
            codificacion: res[i].codificacion,
            precio : res[i].precio,
            presentacion : res[i].presentacion,
            unidades : res[i].unidades,
            cant:0
          }) 
        }
      })
    },
    ready() {
      //para buscar medicamentos para la desitribucion
      this.filteredMeds = this.ListMedicamentos
      this.buildPaginationMed()
      this.selectPageMed(1)  
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    },

    methods:{
      /*
      <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  buscar medicamentos para el pedido
      <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      */
       clearSearchItemMed(){
        this.searchMed = undefined
        this.searchInTheListMed('')
        },
        searchInTheListMed(searchText, currentPage){
            if(_.isUndefined(searchText)){
              this.filteredMeds = _.filter(this.ListMedicamentos, function(v, k){
                return !v.selected
              })
            }
            else{
              this.filteredMeds = _.filter(this.ListMedicamentos, function(v, k){
                return !v.selected && v.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || !v.selected && v.presentacion.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                || !v.selected && v.unidades.toLowerCase().indexOf(searchText.toLowerCase()) > -1
               
              })
            }
            this.filteredMeds.forEach(function(v, k){
              v.key = k+1
            })  
            this.buildPaginationMed()

            if(_.isUndefined(currentPage)){
              this.selectPageMed(1) 
            }
            else{
              this.selectPageMed(currentPage)
            }
        },
        buildPaginationMed(){
            let numberOfPage = Math.ceil(this.filteredMeds.length/this.paginationMeds.itemPerPage)
            this.paginationMeds.ListMedicamentos = []
            for(var i=0; i<numberOfPage; i++){
              this.paginationMeds.ListMedicamentos.push(i+1)
            }
        },
        selectPageMed(item) {
            this.paginationMeds.currentPage = item

            let start = 0
            let end = 0
            if(this.paginationMeds.currentPage < this.paginationMeds.range-2){
              start = 1
              end = start+this.paginationMeds.range-1
            }
            else if(this.paginationMeds.currentPage <= this.paginationMeds.ListMedicamentos.length && this.paginationMeds.currentPage > this.paginationMeds.ListMedicamentos.length - this.paginationMeds.range + 2){
              start = this.paginationMeds.ListMedicamentos.length-this.paginationMeds.range+1
              end = this.paginationMeds.ListMedicamentos.length
            }
            else{
              start = this.paginationMeds.currentPage-2
              end = this.paginationMeds.currentPage+2
            }
            if(start<1){
              start = 1
            }
            if(end>this.paginationMeds.ListMedicamentos.length){
              end = this.paginationMeds.ListMedicamentos.length
            }

            this.paginationMeds.filteredMeds = []
            for(var i=start; i<=end; i++){
              this.paginationMeds.filteredMeds.push(i);
            }

            this.paginatedMeds = this.filteredMeds.filter((v, k) => {
              return Math.ceil((k+1) / this.paginationMeds.itemPerPage) == this.paginationMeds.currentPage
            })
        },  
         /*
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        */
        
        insertar(id, cantidad){
          if(cantidad == 0 || cantidad <= 0 || cantidad == ""){
            this.pass = "";
            if(cantidad == 0 || cantidad == ""){
              this.respFalse = "Inserte una cantidad del producto"
            }else if(cantidad <= 0){
              this.respFalse = "Las cantidades no pueden ser negativas"
            }
          }else{
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
                this.itemsCar = car 
                this.pass = " Se insertaron  "+cantidad + " productos" + " de " + car.nombre
                this.respFalse = ""
                for(var i = 0; i< cantidad; i++){
                  this.add(car,id);
                }         
            })   
          }
                     
        },       

        add: function(item, id)  {
            let storedItem = this.distribucionList[id];
            if (!storedItem) {
                storedItem = this.distribucionList[id] = {
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
            this.distribucionList[id].qty--;
            this.distribucionList[id].price -= this.distribucionList[id].item.price;
            this.totalQty--;
            this.totalPrice -= this.distribucionList[id].item.price;
    
            if (this.distribucionList[id].qty <= 0) {
                delete this.distribucionList[id];
            }
        },

        removeItem(id) {
            this.totalQty -= this.distribucionList[id].qty;
            this.totalPrice -= this.distribucionList[id].price;
            delete this.distribucionList[id];
        },

        generateArray: function () {
            let arr = [];
            for (const id in this.distribucionList) {
                arr.push(this.distribucionList[id]);
            }
            return arr;
        },
        formSubmit(e) {
            e.preventDefault();
            if( this.generateArray() == ""){
                this.rep_post_false = "No se seleciono un producto"
                this.respuestaPost = ""
                
            }else{
              var data = {
                codigo:this.codigo,
                responsable:this.responsable,
                recibe:this.recibe,
                fechaLlegada:this.fechaLlegada,
                productos:this.generateArray(),
              }
              var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
              fetch('http://localhost:7000/distribucion/vueMedicamento',esto)
              .then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(data => { 

                if(data.success == false){
                  this.rep_post_false = data.msg
                  this.respuestaPost = ""
                 
                }else{
                 
                  this.codigo = '';
                  this.responsable= '';
                  this.recibe = '';
                  this. fechaLlegada = '';
                  this.distribucionList = {};
                  this.totalQty = 0;
                  this.totalPrice = 0;
                  this.respuestaPost = ""

                  this.respuestaPost = data.msg
                  this.rep_post_false = ""
                  this.reduce();
                }
                
              })
               

                
            } 
       
        },

        //ruta para mostrar las distribuciones que se hace
        Listdistribuciones: function (){
            axios
            .get('http://localhost:7000/distribucion/vueDistribucion')
            .then(response => {
             
              this.listDistribucion = response.data;              
            })
        },
        
        //para reducir al estock    
        reduce: function (){
            var producto = this.generateArray();
            if (producto == ""){
                this.respuestaPost = "No se selecciono Producto"
            }else{
                axios.post('http://localhost:7000/distribucion/vueReduceStock', {
                    producto: producto                
                })
                .then(function (response) {
                    console.log(response, "  <<< esto es la respuesta")
                })
                .catch(function (error) {
                    console.log(error)
                });
            }            
        },

        onlyDistrubucion(id){
          fetch('http://localhost:7000/distribucion/onlyDist/'+id)
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(data => { 
            this.oneDistrbucion = data[0]
            console.log(this.oneDistrbucion, " <<<<<<<<<<<<<<<<<")
          })
        }
    }
})

// falta reducir al stock inicial