const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

router.get('/lab_consulta_externa/:id_consulta/:token_id/:token_p', (req,res) => {
    const { id_consulta, token_id, token_p} = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_p){
        fetch('http://localhost:3000/api/OnlyConsulta/'+id_consulta)        
        .then(resp => resp.json())
        .then(ConsultaOnly =>{
            console.log(ConsultaOnly, " <<<<<<<<<<<< esto es lo que quiero ver")
            res.render('consulta_externa/O_Laboratorio',{
                ConsultaOnly,
                data_doc:datas.name.data_user[token_id],
            })
        })
        .catch(error => {
            res.status(500).json({
                success:false,
                msg:"No hay coneccion que el servidor 3000",
                error
            })
        })
    }else{
        res.redirect('/')
    }
})


module.exports = router;

