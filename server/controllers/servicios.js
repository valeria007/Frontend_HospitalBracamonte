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
        //para mostrar todo
        static ver(req, res) {
            return Servicios
              .findAll()
              .then(serv => res.status(200).send(serv))
              .catch(error => res.status(400).send(error));
          }
        //para mostrar solo uno
        static listOne(req, res){                
            var id = req.params.id;  
            console.log(id + " este es");
            Servicios.findAll({
                where: {id: id}
                //attributes: ['id', ['description', 'descripcion']]
              }).then((one) => {
                res.status(200).json(one);
              });     
        }
        static modify(req, res) {
          const { descripcion, sigla } = req.body
          return Servicios
            .findByPk(req.params.id)
            .then((data) => {
              data.update({
                  descripcion: descripcion || data.descripcion,
                  sigla: sigla || data.sigla                    
              })
              .then(update => {
                res.status(200).send({
                  message: 'Servcio actualizado',
                  data: {
                      descripcion: descripcion || update.descripcion,
                      sigla: sigla || update.sigla
                  }
                })
              })
              .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
        static delete(req, res) {
          return Servicios
            .findByPk(req.params.id)
            .then(data => {
              if(!data) {
                return res.status(400).send({
                message: 'Book Not Found',
                });
              }
              return data
                .destroy()
                .then(() => res.status(200).send({
                  message: 'Book successfully deleted'
                }))
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error))
        }
    }


    export default Servicio;
