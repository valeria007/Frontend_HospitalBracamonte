import model from '../models';
//import { QueryInterface } from 'sequelize/types';

    const { Servicios } = model;

    class Servicio {
        static serv(req, res) {
            const { descripcion, sigla } = req.body
                return Servicios
                .create({
                    descripcion,
                    sigla                    
                })
                .then(serviceData => res.status(200).send ({
                    success: true,
                    message: 'servicio successfully created',
                    serviceData
                }))
        }
        static ver(req, res) {
            return Servicios
              .findAll()
              .then(serv => res.status(200).send(serv))
              .catch(error => res.status(400).send(error));
          }
    }


    export default Servicio;
