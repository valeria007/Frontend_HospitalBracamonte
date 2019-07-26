Vue.component('modal', {
  template: '#modal-template'
})

Vue.filter('numeral', function (value) {
    return numeral(value).format('0,0');
  })
const carMedicamentos = new Vue({
    el: '#carMedicamentos',    
    data : () => ({
      

        aljand:'aljand 321',

        medicamentos: [],
        itemsCar:[],
        qty:[],
        cantidadMedicamento:'',
        showModal: false,
        
        items : {},
        totalQty : 0,
        totalPrice : 0,

        codigoCompra:'',
        boletaPago:'',
        tipoMaterial:'',
        fechaIngreso:'',
        proveedor:'',
        Observaciones:'',

        respuestaPost:'',

        searchItem: '',
        getPedido:[],
        filteredItems: [],
        paginatedItems: [],
        pagination: {
            range: 5,
            currentPage: 1,
            itemPerPage: 8,
            getPedido: [],
            filteredItems: [],
        },

        //Buaqueda de medicamentos
        searchQuery:'',
        resources:[],
        //<<<<<<<<<<<<<<<<<<<<<<<<<

        //pra medicamentos pag search
        
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
       
  
    }),
    created:function() {
      fetch('http://localhost:7000/pedidos/vuePedidos')
      .then(res => res.json())
      .then(res => {
        this.ListMedicamentos = res;
      })

      axios
            .get('http://localhost:7000/pedidos/vuePEDIDOS1')
            .then(response => {
              this.getPedido = response.data
              console.log(this.getPedido)
            })
    },
    ready() {
      this.filteredItems = this.getPedido
      this.buildPagination()
      this.selectPage(1)    
      //esta parte es para el modal de buscar mecicamentos
      this.filteredMeds = this.ListMedicamentos
      this.buildPaginationMed()
      this.selectPageMed(1)  
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    },
    //esto es de busqueda de medicamentos
    computed:{
      filteredResources (){
        if(this.searchQuery){
        return this.resources.filter((item)=>{
          return item.nombre.startsWith(this.searchQuery) || item.presentacion.startsWith(this.searchQuery)
          || item.unidades.startsWith(this.searchQuery)
        })
        }else{
          return this.resources;
        }
      },
    },
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    methods:{
        clearSearchItem(){
            this.searchItem = undefined
            this.searchInTheList('')
        },
        searchInTheList(searchText, currentPage){
            if(_.isUndefined(searchText)){
              this.filteredItems = _.filter(this.getPedido, function(v, k){
                return !v.selected
              })
            }
            else{
              this.filteredItems = _.filter(this.getPedido, function(v, k){
                return !v.selected && v.proveedor.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || !v.selected && v.boletaPago.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                || !v.selected && v.fechaIngreso.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || !v.selected && v.codigoCompra.toLowerCase().indexOf(searchText.toLowerCase()) > -1
              })
            }
            this.filteredItems.forEach(function(v, k){
              v.key = k+1
            })  
            this.buildPagination()
            
            if(_.isUndefined(currentPage)){
              this.selectPage(1) 
            }
            else{
              this.selectPage(currentPage)
            }
        },
        buildPagination(){
            let numberOfPage = Math.ceil(this.filteredItems.length/this.pagination.itemPerPage)
            this.pagination.getPedido = []
            for(var i=0; i<numberOfPage; i++){
              this.pagination.getPedido.push(i+1)
            }
        },
        selectPage(item) {
            this.pagination.currentPage = item
            
            let start = 0
            let end = 0
            if(this.pagination.currentPage < this.pagination.range-2){
              start = 1
              end = start+this.pagination.range-1
            }
            else if(this.pagination.currentPage <= this.pagination.getPedido.length && this.pagination.currentPage > this.pagination.getPedido.length - this.pagination.range + 2){
              start = this.pagination.getPedido.length-this.pagination.range+1
              end = this.pagination.getPedido.length
            }
            else{
              start = this.pagination.currentPage-2
              end = this.pagination.currentPage+2
            }
            if(start<1){
              start = 1
            }
            if(end>this.pagination.getPedido.length){
              end = this.pagination.getPedido.length
            }
            
            this.pagination.filteredItems = []
            for(var i=start; i<=end; i++){
              this.pagination.filteredItems.push(i);
            }
            
            this.paginatedItems = this.filteredItems.filter((v, k) => {
              return Math.ceil((k+1) / this.pagination.itemPerPage) == this.pagination.currentPage
            })
        },
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //esto
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        /*
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                             esta parte es para el modal de buscar mecicamentos
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        */

        
        agregar: function (){
            axios
            .get('http://localhost:7000/pedidos/vuePedidos')
            .then(response => {
              this.resources = response.data;
              console.log(this.resources)
              
            })
        },
        insertar: function (id){
          for(var i = 0; i < this.cantidadMedicamento; i++){
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
            }) 
          }           
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

                this.codigoCompra = ""
                this.boletaPago = ""
                this.tipoMaterial = ""
                this.fechaIngreso = ""
                this.proveedor = ""
                this.Observaciones = ""
                this.totalPrice = 0;
                this.totalQty = 0;
                this.items = {};
                
                
            }            
        },
        pedidos(){
            axios
            .get('http://localhost:7000/pedidos/vuePEDIDOS1')
            .then(response => {
              this.getPedido = response.data
              console.log(this.getPedido)
            })
        },

        quitar(a,b){
            this.items = {};
        }
    }    
})