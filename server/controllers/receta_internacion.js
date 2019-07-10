import model from '../models';

const { receta_internacion } = model;

class RecetaInternacion {
    static reg_recetaInter(req,res){
        const { receta_de,historial,fechaEmicion,nombre_doctor,medicamentos } = req.body
        const { id_internacion } = req.params;
        return receta_internacion
        .create({
            receta_de,
            historial,
            fechaEmicion,
            nombre_doctor,
            medicamentos,
            id_internacion
        })
        .then(data => res.status(201).send({
            success: true,
            message: 'Se guardo con exito',
            data
        }))
    }
    static listReceta_internacion(req,res){
        return receta_internacion
        .findAll()
        .then(data => res.status(201).send(data));
    }
}

export default RecetaInternacion;