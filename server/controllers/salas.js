import model from '../models';

const { Salas } = model;

//servicio para insertar salas con id de servicio
class Sala {
    static enviarSala(req, res){
        if(req.body.descripcion == ""){
            res.status(400).send("por favor introdusca una descripcion")
            
        }if(req.body.piso == ""){
            res.status(400).send("posrfavor introdusca un piso")
        }else{
            const { servico, descripcion, piso } = req.body
            return Salas
            .create({
                    servico,
                    descripcion,
                    piso
            })
            .then(data => res.status(200).send({
                success: true,
                message: 'se inserto con exito',
                data
            }))
            .catch(error => res.status(400).send(error));
        }
       
    }
    static listSala(req, res){
        return Salas
        .findAll()
        .then(sala => res.status(200).send(sala));
    }
}

export default Sala