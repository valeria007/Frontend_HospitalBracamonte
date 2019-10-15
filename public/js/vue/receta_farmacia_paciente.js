Vue.filter('numeral', function (value) {
    return numeral(value).format('0,0');
})
const receta_paciente = new Vue({
    el: '.receta_paciente', 
    data : () => ({
        url:data_url.url_front_end,
        msg: 'aljand',

        alert: "",
        pass:"",

        msg_true_post: '',
        msg_false_post: '',

        false_msg_product:[],
        product_false:[],

        id_receta:'',
        id_user:'',

        //data_post
        codigo_venta:'',
        empleado:'',
        historial:'',
        tipo_consulta:'',
        nombre_doctor:'',

        medicamentos: [],
        itemsCar:[],
        qty:[],
        cantidadMedicamento:'',
        showModal: false,

        listItems : {},
        totalQty : 0,
        totalPrice : 0,
        iva:0,
        total:0,

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
    mounted(){
        fetch(this.url+'/farmacia/vue_one_receta/'+this.id_receta)
        .then(resp => resp.json())
        .then(data_receta_paciente => { 
          console.log(data_receta_paciente, "  esto es el 1")
            for(var i = 0; i < data_receta_paciente[0].medicamentos.length; i++){
                this.insert_men_receta(data_receta_paciente[0].medicamentos[i].id,data_receta_paciente[0].medicamentos[i].cantidad,data_receta_paciente[0].medicamentos[i].medicamento)
            }         
        })
    },
    created:function() {
        fetch(this.url+'/farmacia/Vue_medicamentos_farmacia')
        .then(res => res.json())
        .then(res => {
            for(var i = 0; i < res.length; i++){
              this.ListMedicamentos.push({
                id : res[i].id,
                nombre : res[i].nombre,
                cantidad : res[i].cantidad_unidad,
                codificacion: res[i].codificacion,
                precio : res[i].precio_compra,
                presentacion : res[i].presentacion,
                cant:0
              }) 
            }
        })       
    },
    ready() {   
        //esta parte es para el modal de buscar mecicamentos
        this.filteredMeds = this.ListMedicamentos
        this.buildPaginationMed()
        this.selectPageMed(1)  
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    },
    methods:{ 
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

        insert_men_receta: function (id, cantidad,nom_medicamento){
          if(cantidad == 0 || cantidad <= 0 || cantidad == ""){
            //this.msg = "Inserte una cantidad del producto"
            if(cantidad == 0 || cantidad == ""){
              this.alert = "Inserte una cantidad del producto"
            }else if(cantidad <= 0){
              this.alert = "Las cantidades no pueden ser negativas"
            }
    
          }  else {
            axios
            .get(this.url+'/farmacia/vue_medicamento/'+id)
            .then(response => {
              //console.log(response, "  esto inserta 2")
              if( response.data.success == false){
                this.product_false.push({
                  product:"No existe el producto "+nom_medicamento
                })
              }else{
                var numero = response.data[0].cantidad_unidad - cantidad
                if(numero <= 0){
                  this.false_msg_product.push({
                    cantidad_requerida: cantidad,
                    cantidad_actual: response.data[0].cantidad_unidad,
                    nombre: response.data[0].nombre
                  })
                }else{
                  var car = {
                    id: response.data[0].id,
                    codificacion: response.data[0].codificacion,
                    nombre: response.data[0].nombre,
                    //cantidad: response.data[0].cantidad_unidad,
                    price: response.data[0].precio_compra
                  }   
                  for(var i=0; i< cantidad; i++){
                    this.add(car,id);
                  }  
                  this.cantidad = 0 
                }
              }              
              
            })   

          }                      
        },

        insert: function (id, cantidad){
          if(cantidad == 0 || cantidad <= 0 || cantidad == ""){
            //this.msg = "Inserte una cantidad del producto"
            if(cantidad == 0 || cantidad == ""){
              this.alert = "Inserte una cantidad del producto"
            }else if(cantidad <= 0){
              this.alert = "Las cantidades no pueden ser negativas"
            }
    
          }  else {
            axios
            .get(this.url+'/farmacia/vue_medicamento/'+id)
            .then(response => {
              console.log(response.data[0].cantidad_unidad, " esto es un medicamentos insertado <<<<")
              var numero = response.data[0].cantidad_unidad - cantidad
              if(numero <= 0){
                this.alert = " No se puede insertar ya no hay esa cantidad de " + response.data[0].nombre + " en stock"
                this.pass = ""
              }else{
                var car = {
                  id: response.data[0].id,
                  codificacion: response.data[0].codificacion,
                  nombre: response.data[0].nombre,
                  //cantidad: response.data[0].cantidad_unidad,
                  price: response.data[0].precio_compra
                }   
                this.pass = " Se insertaron  "+cantidad + " productos" + " de " + car.nombre
                this.alert = ""
                for(var i=0; i< cantidad; i++){
                  this.add(car,id);
                }  
                this.cantidad = 0 
              }
              
            })   

          }                      
        },

        add: function(item, id)  {
            let storedItem = this.listItems[id];
            if (!storedItem) {
              storedItem = this.listItems[id] = {
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
            this.listItems[id].qty--;
            this.listItems[id].price -= this.listItems[id].item.price;
            this.totalQty--;
            this.totalPrice -= this.listItems[id].item.price;
    
            if (this.listItems[id].qty <= 0) {
                delete this.listItems[id];
            }
        },
  
        removeItem(id) {
            this.totalQty -= this.listItems[id].qty;
            this.totalPrice -= this.listItems[id].price;
            delete this.listItems[id];
        },
  
        generateArray: function () {
            let arr = [];
            for (const id in this.listItems) {
                arr.push(this.listItems[id]);
            }
            return arr;
        },  

        reg_receta_paciente(e){
          e.preventDefault();
          if( this.generateArray() == ""){
            this.msg_false_post = "No se seleciono un producto"
          }else{
            var datos = {
              codigo_venta:this.codigo_venta,
              empleado:this.empleado,
              historial:this.historial,
              tipo_consulta:this.tipo_consulta,
              nombre_doctor:this.nombre_doctor,
              medicamentos:{
                medicamentos:this.generateArray(),
                totalQty : this.totalQty,
                totalPrice : this.totalPrice, 
                iva : this.totalPrice * 0.18,
                total : this.totalPrice + this.totalPrice * 0.18                  
              },
              id_receta:this.id_receta,
              id_user:this.id_user,
            }
            var esto = {
              method: 'POST',
              body: JSON.stringify(datos),
              headers:{
                'Content-type' : "application/json"
              }
            };
            fetch(this.url+'/farmacia/vue_reg_receta_paciente',esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
              console.log(data, "esto es lo que quiero ver")
              if(data.success == true){
                this.msg_true_post = data.msg
                this.update_cantidad()
                this.msg_false_post = ""
              }else{
                this.msg_false_post = data.msg
                this.msg_true_post = ""
              }
              
            })
          }
        },

      update_cantidad(){
        var lista  = this.generateArray()
        for(var i = 0; i < lista.length; i++){
          console.log(lista[i].qty, lista[i].item.id)
        
          var datos = {
            cantidad:lista[i].qty
          }
          var esto = {
            method: 'post',
            body: JSON.stringify(datos),
            headers:{
              'Content-type' : "application/json"
            }
          };
          fetch(this.url+'/farmacia/vue_update_cantidad/'+lista[i].item.id,esto)
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(data => {
            console.log(data)
          })

        }
      }
    }
})