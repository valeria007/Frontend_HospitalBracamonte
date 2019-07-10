import model from '../models';

const { responsables } = model

class Responsables {
    static respRegsitro(req,res) {
        const{ nombre,apellido1,apellido2,direccion,ci,telefono } = req.body
        const { id_paciente } = req.params
        return responsables
        .create({
            nombre,
            apellido1,
            apellido2,
            direccion,
            ci,
            telefono,
            id_paciente
        })
        .then(data => res.status(201).json({
            success: true,
            message: " Registrado ",
            data
        }))
    }
    static list_tesponsable(req,res){
        return responsables
        .findAll()
        .then(data => res.status(200).json(data))
    }
}

export default Responsables;