import Serv from '../controllers/servicios';
import Salas from '../controllers/salas';
import Camas from '../controllers/camas';

export default (app) => {

app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bookStore API!',
}));

//servicios
app.post('/api/service', Serv.serv); 
app.get('/api/verServ', Serv.ver);


//salas
app.post('/api/sala', Salas.enviarSala);
app.get('/api/sala', Salas.listSala);

//camas
app.post('/api/cama', Camas.sendCama);
app.get('/api/cama', Camas.getCamas);
};