const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/role',(req, res) => {
    var esto = {
      method: 'GET',
      headers:{
        'Content-type' : "application/json"
      }
    }
      fetch('http://localhost:3600/api/roleall/',esto)
          .then(resp => resp.json())
          .then(resp =>{
        console.log(resp, "esto es el mensaje")
          res.render('CreRoles',{resp, msg, mg2 });
       })
       .catch(error => {       
        console.error('Error:', error)
        res.render('404error',{
          msg:"No hay conección con el sevidor"
        })
    })
  });
  var msg, mg2;
  router.post('/role', (req,res) => {
    var data = req.body;
    var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
    }
      fetch('http://localhost:3600/api/role/',esto)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
         
          if (data.success == false){
              msg=data.message
              res.redirect('/role/role');
          }else{
              msg = null
              mg2= data.message
              res.redirect('/role/role');
  
          }
          
      })
        
    });

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  ruta para rol
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.post('/register_rol/', (req,res) => {
  var data = req.body;
  console.log(data, "  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
    }
      fetch('http://localhost:3600/api/userrol/crearol',esto)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
        res.status(200).json(data);
      })
})
/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  ruta para eliminar rol
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
router.get('/delrol/:id', (req, res) => {
  const { id }= req.params;
  fetch('http://localhost:3600/api/delrole/'+id)
  .then(resp => resp.json())
  .catch(error => console.error('Error:', error))
  .then(resp =>{
      console.log(resp)
      res.redirect('/role/role');
  });
  
});

module.exports = router;