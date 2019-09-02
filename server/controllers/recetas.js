import model from '../models';

const { Recetas} = model;
const { Consultas } = model;
const { emergencia } = model;
const { Citas_Medicas } = model;
const { Pacientes } = model;
class Receta {

  static post_recetaConsulta(req, res) {
    const { id_consulta } = req.params;
    Recetas.findAll({
       where: {id_consulta: id_consulta},
       //attributes: ['id', ['description', 'descripcion']]
       include:[
         {model : emergencia, attributes:['id'],
        include:[{
          model : Citas_Medicas, attributes:['id'],
          include:[{
            model : Pacientes, attributes:['id','nombre', 'apellidop','apellidom']
          }]
        }]}
       ]
     }).then((data) => {
       if (data != ""){
        res.status(400).json({
          success: false,
          message: 'Al paciente  '+data[0].emergencium.Citas_Medica.Paciente.nombre+'  '+data[0].emergencium.Citas_Medica.Paciente.apellidop+ " ya se le dio una receta en esta consulta medica" ,
          data
        })
       }else {
        const { tipoConsulta,historiaClinica,fecha,posologia,farmaco,viaAdmincion,doctor,indicaciones,unidades,informacionAd,instruciones,medicamentos,id_medico } = req.body;
        const { id_consulta } = req.params;
        const { id_emergencia } = req.params;
        return Recetas
          .create(  {
            id_consulta,
            id_emergencia,
            tipoConsulta,
            historiaClinica,
            fecha,
            posologia,
            farmaco,
            viaAdmincion,
            doctor,
            indicaciones,
            unidades,
            informacionAd,
            instruciones,

            medicamentos,
            id_medico 
          })
           .then(consultaData => res.status(201).send({
              success: true,
              message: 'Se guardaron los datos',
              consultaData
          }))
          .catch(error => res.status(400).send({
            success: false,
            msg:"No se pudo guardar los datos", 
            error
          }));
         }
        
     });   
    
  }    
    static post_receta(req, res) {
      const { id_emergencia } = req.params;
      Recetas.findAll({
         where: {id_emergencia: id_emergencia},
         //attributes: ['id', ['description', 'descripcion']]
         include:[
           {model : emergencia, attributes:['id'],
          include:[{
            model : Citas_Medicas, attributes:['id'],
            include:[{
              model : Pacientes, attributes:['id','nombre', 'apellidop','apellidom']
            }]
          }]}
         ]
       }).then((data) => {
         if (data != ""){
          res.status(400).json({
            success: false,
            message: 'Al paciente  '+data[0].emergencium.Citas_Medica.Paciente.nombre+'  '+data[0].emergencium.Citas_Medica.Paciente.apellidop+ " ya se le dio una receta en esta consulta medica" ,
            data
          })
         }else {
          const { tipoConsulta,historiaClinica,fecha,posologia,farmaco,viaAdmincion,doctor,indicaciones,unidades,informacionAd,instruciones,medicamentos,id_medico  } = req.body;
          const { id_consulta } = req.params;
          const { id_emergencia } = req.params;
          return Recetas
            .create(  {
              id_consulta,
              id_emergencia,
              tipoConsulta,
              historiaClinica,
              fecha,
              posologia,
              farmaco,
              viaAdmincion,
              doctor,
              indicaciones,
              unidades,
              informacionAd,
              instruciones,
              
              medicamentos,
              id_medico
            })
             .then(consultaData => res.status(201).send({
                success: true,
                message: 'Se guardaron los datos',
                consultaData
            }))
            .catch(error => res.status(400).send({
              success: false,
              msg:"No se pudo guardar los datos", 
              error
            }));
           }
          
       });   
      
    }
  static getReceta(req, res) {
    return Recetas
     .findAll()
     .then(Recetas => res.status(200).send(Recetas));
    }

    //para mostrar receta segun consulta
    static onlyReceta(req, res){                
      var id = req.params.id;  
      Recetas.findAll({
         where: {id_consulta: id}
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });     
      }
    //receta segun emergencia
    static RecetaEmergencia(req, res){                
      var id = req.params.id;  
      Recetas.findAll({
         where: {id_emergencia: id}
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });     
    }
    //mostar recetas solo de emergencia
    static recOfEmg(req, res){    
      const { id } = req.params;            
      Recetas.findAll({
         where: { tipoConsulta : null, historiaClinica : id }
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });   
    }
    static updateReceta(req, res) {
      console.log(req.params.id, "   esto<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      const { estado,historiaClinica, fecha,posologia,farmaco,viaAdmincion,doctor,indicaciones,unidades,informacionAd,instruciones,medicamentos  } = req.body
      return Recetas
        .findByPk(req.params.id)
        .then((data) => {
          data.update({
            estado:estado || data.estado,
            historiaClinica: historiaClinica || data.historiaClinica,
            fecha: fecha || data.fecha,  
            posologia: posologia || data.posologia,  
            farmaco: farmaco || data.farmaco,  
            viaAdmincion: viaAdmincion || data.viaAdmincion,  
            doctor: doctor || data.doctor,  
            indicaciones: indicaciones || data.indicaciones,  
            unidades: unidades || data.unidades,
            informacionAd:informacionAd || data.informacionAd,
            instruciones: instruciones|| data.instruciones,

            medicamentos: medicamentos || data.medicamentos

          })
          .then(update => {
            res.status(200).send({
              success:true,
              msg: 'Receta se a actualizo',
              data: {
                estado:estado || update.estado,
                historiaClinica: historiaClinica || update.historiaClinica,
                fecha: fecha || update.fecha,  
                posologia: posologia || update.posologia,  
                farmaco: farmaco || update.farmaco,  
                viaAdmincion: viaAdmincion || update.viaAdmincion,  
                doctor: doctor || update.doctor,  
                indicaciones: indicaciones || update.indicaciones,  
                unidades: unidades || update.unidades,
                informacionAd:informacionAd || update.informacionAd,
                instruciones: instruciones|| update.instruciones,
                
                medicamentos: medicamentos || update.medicamentos
                
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }
   //serv para traer recetas con citas medicas
   static citaRecetas(req,res){
    var id = req.params.id;
    Recetas.findAll({
      where : { id_consulta: id },
      include: [
        {model: Consultas, attributes: ['id'],
        include:[{
          model: Citas_Medicas, attributes: ['id','medico']
        }]
      }]
    }).then(receta => {
      res.status(200).send(receta)
    })
  }
   //mostar recetas solo de consultas
   static recOfConsulta(req, res){    
    var data = req.params;            
    Recetas.findAll({
       where: { tipoConsulta : data.tipoConsulta, historiaClinica : data.historial }
       //attributes: ['id', ['description', 'descripcion']]
     }).then((data) => {
       res.status(200).json(data);
     });   
  }
    
}
export default Receta;