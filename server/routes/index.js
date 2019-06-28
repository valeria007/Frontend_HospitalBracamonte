import Serv from '../controllers/servicios';
import Salas from '../controllers/salas';
import Camas from '../controllers/camas';
import Paciente from '../controllers/pacientes';
import Citas_medica from '../controllers/cita_medicas';
import Consulta from '../controllers/consultas';
import Receta from '../controllers/recetas';
import papeletaInt from '../controllers/papeletaInternacion';
import Emergencias from '../controllers/emergencia';
import Intern from '../controllers/internacion';


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
app.get('/api/dataESC', Serv.dataESC)
//salas
app.post('/api/sala', Salas.enviarSala1);
app.get('/api/sala', Salas.listSala);
app.get('/api/salaOne/:id', Salas.one);
app.post('/api/UpdateSalas/:id', Salas.update); 
app.get('/api/DElsala/:id', Salas.del);
app.get('/api/ServSalas/:id', Salas.oneSala); //para sacar la sala segun el nombre de especialidad
app.get('/api/ServSalasN/:especialidad', Salas.oneSalaNombre);

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
app.get('/api/PacienteCitaFalse/:id', Citas_medica.TwoTablesFalse);
app.get('/api/citasPaciente/:id', Citas_medica.CitasPaciente); //ruta para poder sacar que citas tiene un paciente
app.post('/api/updateCita/:id', Citas_medica.updateCita); //ruta para poder actualizar una cita



///consultas
app.post('/api/reg_consulta/:id_cita', Consulta.reg_consulta);
app.get('/api/reg_consultas', Consulta.getConsulta);
app.get('/api/pacienteConsulta/:historial/:tipoConsulta', Consulta.getConsultaPaciente) //serv  para sacar las consultas de un paciente
app.get('/api/OnlyConsulta/:id', Consulta.onlyConsulta);
app.get('/api/updateConsulta/:id', Consulta.updateConsulta); //para poder sacar consulta segun cita medica para luego actualizar
app.post('/api/updateConsulta/:id', Consulta.updateCOnsPost) //serv para actualizar consulta 
///recetas
app.post('/api/reg_Receta/:id_consulta', Receta.post_recetaConsulta);
app.post('/api/reg_RecetaEmrg/:id_emergencia', Receta.post_receta);
app.get('/api/reg_Receta', Receta.getReceta);
app.get('/api/OnlyReceta/:id', Receta.onlyReceta); // receta segun consulta medica
app.get('/api/RecetaEmergencia/:id', Receta.RecetaEmergencia); // receta segun emergencia
app.get('/api/recitasOfEMG/:id', Receta.recOfEmg);
app.get('/api/recetaOfConsulta/:id', Receta.recOfConsulta);
app.post('/api/updateReceta/:id', Receta.updateReceta);
app.get('/receta/:id',Receta.citaRecetas); // para sacar receta y 


//papeleta de internacion
app.post('/api/papeletaIntConsulta/:idConsultaMedica', papeletaInt.enviarPapeletaINT); // consulta medica
app.post('/api/papeletaIntEmergencia/:idEmergencia', papeletaInt.enviarPapeletaINT); // emergencia
app.get('/api/papeletaInt', papeletaInt.verPapeletaINT);
app.get('/api/onlyPInternacion/:id', papeletaInt.onlyPInternacion);
app.get('/api/InternacionEMG/:id', papeletaInt.PEmergecia);///esto va a entrar desde emergencia
app.get('/api/getPinternacionPaciente/:historial/:tipoConsulta', papeletaInt.getPinternacionPaciente);
app.get('/api/ListPinternaciones/:historial', papeletaInt.ListPinternacion); // servicio para mostrar lista de papeleta de internacios segun historial
app.post('/api/updatePinternacion/:id', papeletaInt.upinternacion);
app.get('/api/PinterTrue/:especialidad', papeletaInt.PINterTRUE);// serv para traer papeleta de internacion de tipo true
app.get('/api/PinterFalse/:especialidad', papeletaInt.PINterFALSE);// serv para traer papeleta de internacion de tipo false
app.get('/api/one_Pinternacion/:id/:tipoCons', papeletaInt.idPinternacion); // 

//Emergencia
app.post('/api/emeregencia/:idCita', Emergencias.Emergencia);
app.get('/api/emeregencia', Emergencias.getEmergencia);
app.get('/api/citaEmergencia/:id', Emergencias.onlyEmergencia);
app.get('/api/OnlyEmergencia/:historial', Emergencias.emergenciaH); // muestra todas las emergencias del paciente
app.post('/api/updateEmergencia/:id', Emergencias.updateEmergencia);
app.get('/api/emergenciaData/:id', Emergencias.dataEmergecnai); // este serv sirve para mostrar emergencia segun id
app.get('/api/EmergenciaP/:id', Emergencias.emergenciaP); // esta ruta sirve para mostrar una emergencia del paciente segun si id de la emergencia

//Internaciones
app.post('/api/internaciones', Intern.Internacion);
app.get('/api/internciones', Intern.listInternaciones);

};