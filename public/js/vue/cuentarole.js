
var reg_roles = new Vue({
    el: "#cuentarole",
    data: () =>({
        msg: "",
        msg_false:"",
        url:data_url,
        iduser: '',
        nomrol: ""

    }),
     
    methods:{
        id_data(id){
            this.iduser = id
            this.msg= ""
        },
        
        crear_rol(e){
            e.preventDefault();
            var data = {
                user_id:this.iduser,
                name: this.nomrol
            }
            var esto = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch(this.url.url_front_end+'/role/register_rol',esto)
            .then(res => res.json())
            .then(data => {
                if (data.success == true){
                    console.log(data,"aqueiiiiiiiiiiiiiiiiiiiiiiii")
                    this.msg = data.msg
                    this.msg_false=""
                    this.idUser = "",
                    this.nomrol = ""
                }else{
                    console.log(data,"aqueiiiiiiiiiiiiiiiiiiiiiiii")
                    this.msg_false = data.msg
                    this.msg=""
                }
             console.log(data)
            })
        }
    }
})