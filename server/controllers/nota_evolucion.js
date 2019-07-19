import model from '../models';

const { nota_evolucion_Paciente } = model;

class NotaEvolucion{
    static reg_notaEvolucion(req,res){
        const { historial,fecha, nota_evolucion } = req.body;
        const { id_internacion } = req.params;
        return nota_evolucion_Paciente 
        .create({
            historial,
            fecha, 
            nota_evolucion,
            id_internacion
        })
        .then(data => res.status(200).send({
            success: true,
            message: "Exito",
            data
        })) 
    } 
    static notaEvolucion(req, res) {
        return nota_evolucion_Paciente                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }

    //Esta ruta muestra las notas de evolucion del paciente
    static list_notaEvolucion(req, res){                
        const { id_internacion } = req.params
        nota_evolucion_Paciente.findAll({
            where: { id_internacion: id_internacion }
         }).then((data) => {
           res.status(200).json(data);
         });     
     }

    static One_notaEvolucion(req, res){                
        const { id_nota } = req.params
        nota_evolucion_Paciente.findAll({
            where: { id: id_nota }
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
}
export default NotaEvolucion