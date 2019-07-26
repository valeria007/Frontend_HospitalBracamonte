Vue.filter('numeral', function (value) {
    return numeral(value).format('0,0');
})

Vue.component('modal', {
    template: '#modal-template'   //<<<<<<<<<<<<< para modal view
})

const pedidos =  new Vue({
    el:"#pedidos",
    data : () => ({
        medicamentos:[],
        itemsCar:[],

        items : {},
        totalQty : 0,
        totalPrice : 0,

        codigo:'',
        responsable:'',
        recibe:'',
        fechaLlegada:'',

        respuestaPost:'',

        listDistribucion:[],

        //table search pagination distribucion
        searchItem: '',
        lis_pedidos: [],
        filteredItems: [],
        paginatedItems: [],
        selectedItems: [],
        pagination: {
          range: 5,
          currentPage: 1,
          itemPerPage: 8,
          lis_pedidos: [],
          filteredItems: [],
        },

        //pra modal view
        showModal: false,
       //<<<<<<<<<<<<<

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
        axios
        .get('http://localhost:7000/distribucion/vueDistribucion')
        .then(response => {
          console.log(response)
          this.lis_pedidos = response.data;              
        })

        axios
        .get('http://localhost:7000/distribucion/vueMedicamento')
        .then(response => {
          this.ListMedicamentos = response.data;          
        })
    },
    ready() {
        this.filteredItems = this.lis_pedidos
        this.buildPagination()
        this.selectPage(1)    

        //para buscar medicamentos para la desitribucion
        this.filteredMeds = this.ListMedicamentos
        this.buildPaginationMed()
        this.selectPageMed(1)  
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    },

    methods:{
        
        /*
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    table search pagination distribucion
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        */

        clearSearchItem(){
            this.searchItem = undefined
            this.searchInTheList('')
        },
        searchInTheList(searchText, currentPage){
            if(_.isUndefined(searchText)){
              this.filteredItems = _.filter(this.lis_pedidos, function(v, k){
                return !v.selected
              })
            }
            else{
              this.filteredItems = _.filter(this.lis_pedidos, function(v, k){
                return !v.selected && v.responsable.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || !v.selected && v.recibe.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                || !v.selected && v.fechaLlegada.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
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
            this.pagination.lis_pedidos = []
            for(var i=0; i<numberOfPage; i++){
              this.pagination.lis_pedidos.push(i+1)
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
            else if(this.pagination.currentPage <= this.pagination.lis_pedidos.length && this.pagination.currentPage > this.pagination.lis_pedidos.length - this.pagination.range + 2){
              start = this.pagination.lis_pedidos.length-this.pagination.range+1
              end = this.pagination.lis_pedidos.length
            }
            else{
              start = this.pagination.currentPage-2
              end = this.pagination.currentPage+2
            }
            if(start<1){
              start = 1
            }
            if(end>this.pagination.lis_pedidos.length){
              end = this.pagination.lis_pedidos.length
            }

            this.pagination.filteredItems = []
            for(var i=start; i<=end; i++){
              this.pagination.filteredItems.push(i);
            }

            this.paginatedItems = this.filteredItems.filter((v, k) => {
              return Math.ceil((k+1) / this.pagination.itemPerPage) == this.pagination.currentPage
            })
        },
        selectItem(item){
            item.selected = true
            this.selectedItems.push(item)
            this.searchInTheList(this.searchItem, this.pagination.currentPage)
        },    
        removeSelectedItem(item){
            item.selected = false
            this.selectedItems.$remove(item)
            this.searchInTheList(this.searchItem, this.pagination.currentPage)
        },   
        /*
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        */
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
        

        medicamento: function (){
            axios
            .get('http://localhost:7000/distribucion/vueMedicamento')
            .then(response => {
              this.medicamentos = response.data;          
            })
        },
        insertar(id){
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
                this.add(car,id);
                
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
                })
                .catch(function (error) {
                    console.log(error)
                });

                this.codigo = '';
                this.responsable= '';
                this.recibe = '';
                this. fechaLlegada = '';
                this.items = {};
                this.totalQty = 0;
                this.totalPrice = 0;
                this.respuestaPost = "listo"
            } 
       
        },

        //ruta para mostrar las distribuciones que se hace
        Listdistribuciones: function (){
            axios
            .get('http://localhost:7000/distribucion/vueDistribucion')
            .then(response => {
              console.log(response)
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
        }
    }
})

// falta reducir al stock inicial