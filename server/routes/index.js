import Serv from '../controllers/servicios';
import Salas from '../controllers/salas';
import Camas from '../controllers/camas';
import Pacientes from '../controllers/pacientes';

export default (app) => {

app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bookStore API!',
}));

//servicios
app.post('/api/servicios', Serv.serv); 
app.get('/api/servicios', Serv.ver);
app.get('/api/servOne/:id', Serv.listOne);
app.post('/api/UpdateServicios/:id', Serv.modify); 
app.get('/api/DElserv/:id', Serv.delete);

//salas
app.post('/api/sala', Salas.enviarSala);
app.get('/api/sala', Salas.listSala);
app.get('/api/salaOne/:id', Salas.one);
app.post('/api/UpdateSalas/:id', Salas.update); 
app.get('/api/DElsala/:id', Salas.del);
app.get('/api/ServSalas/:id', Salas.oneSala);
//camas
app.post('/api/camaSala/:salaID', Camas.sendCama);
app.get('/api/cama', Camas.getCamas);
app.get('/api/camaSala/:id', Camas.only);
app.get('/api/OnlyCama/:id', Camas.onlyCama);
app.post('/api/OnlyCama/:id', Camas.updateCama);
app.get('/api/DElcama/:id', Camas.delCama);

///reg_pacientes
app.post('/api/pacientes', Pacientes.registroPaciente);
};