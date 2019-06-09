import Serv from '../controllers/servicios';
import Salas from '../controllers/salas';
import Camas from '../controllers/camas';
import Paciente from '../controllers/pacientes';
import Citas_medica from '../controllers/cita_medicas';
import Consulta from '../controllers/consultas';
import Receta from '../controllers/recetas';
import papeletaInt from '../controllers/papeletaInternacion';
import Emergencias from '../controllers/emergencia';


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
app.get('/api/ServSalas/:id', Salas.oneSala); //

//camas
app.post('/api/camaSala/:salaID', Camas.sendCama);
app.get('/api/cama', Camas.getCamas);
app.get('/api/camaSala/:id', Camas.only);   // Camas De sala
app.get('/api/OnlyCama/:id', Camas.onlyCama); // para actualizar la cama
app.post('/api/OnlyCama/:id', Camas.updateCama);
app.get('/api/DElcama/:id', Camas.delCama);

///reg_pacientes
app.post('/api/pacientes', Paciente.registroPaciente);
app.get('/api/pacientes', Paciente.getPaciente);
app.get('/api/onlyPaciente/:id', Paciente.OnlyPaciente);

////citas
app.post('/api/reg_cita/:id_Paciente', Citas_medica.reg_cita);
app.get('/api/reg_citas', Citas_medica.getCitas);
app.get('/api/OnlyCita/:id', Citas_medica.oneCita);
app.get('/api/OneCita/:id', Citas_medica.OnlyCita);
//cita segun consulta medica emergencia
app.get('/api/citas/:id', Citas_medica.citaLugar);
//serv para traer dos tablas
app.get('/api/PacienteCita/:id', Citas_medica.TwoTables);
app.get('/api/estado/:id', Citas_medica.estado);//para cambiar el estado



///consultas
app.post('/api/reg_consulta/:id_cita', Consulta.reg_consulta);
app.get('/api/reg_consultas', Consulta.getConsulta);
app.get('/api/pacienteConsulta/:historial/:tipoConsulta', Consulta.getConsultaPaciente) //serv  para sacar las consultas de un paciente
app.get('/api/OnlyConsulta/:id', Consulta.onlyConsulta);
///recetas
app.post('/api/reg_Receta/:id_consulta', Receta.post_receta);
app.get('/api/reg_Receta', Receta.getReceta);
app.get('/api/OnlyReceta/:id', Receta.onlyReceta);


//papeleta de internacion
app.post('/api/papeletaIntConsulta/:idConsultaMedica', papeletaInt.enviarPapeletaINT); // consulta medica
app.post('/api/papeletaIntEmergencia/:idEmergencia', papeletaInt.enviarPapeletaINT); // emergencia
app.get('/api/papeletaInt', papeletaInt.verPapeletaINT);
app.get('/api/onlyPInternacion/:id', papeletaInt.onlyPInternacion);
app.get('/api/getPinternacionPaciente/:historial/:tipoConsulta', papeletaInt.getPinternacionPaciente);

//Emergencia
app.post('/api/emeregencia/:idCita', Emergencias.Emergencia);
app.get('/api/emeregencia', Emergencias.getEmergencia);
app.get('/api/citaEmergencia/:id', Emergencias.onlyEmergencia);

};