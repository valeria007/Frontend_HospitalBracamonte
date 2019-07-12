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

import Responsables from '../controllers/responsable_paciente';
import Antecedentes from '../controllers/antecedentes_paciente';
import Alergias from '../controllers/alergias_paciente';
import Examen_Fisico from '../controllers/examen_fisico_pacientes';


import RecetaInternacion from '../controllers/receta_internacion';


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
app.get('/api/updateEstadoCama/:idCama/:historial', Camas.CamaEstado); // esta ruta es para poder cambiar el estado del paciente y poder insertar el historial del paciente
app.post('/api/updateCama_estado/:idCama',Camas.Update_cama_estado); // esta ruta es para canviar el estado de la cama a false y borrar el historial

///reg_pacientes
app.post('/api/pacientes', Paciente.registroPaciente);
app.get('/api/pacientes', Paciente.getPaciente);
app.get('/api/onlyPaciente/:id', Paciente.OnlyPaciente);
app.get('/api/paciente_id/:id', Paciente.paciente_id);

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
app.get('/api/recetaOfConsulta/:historial/:tipoConsulta', Receta.recOfConsulta);
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

app.get('/api/estado_p_internacion/:idPinternacion', papeletaInt.estadoPInternacion); // esta ruta es para poder cambiar el estado de papeleta de internacion

//Emergencia
app.post('/api/emeregencia/:idCita', Emergencias.Emergencia);
app.get('/api/emeregencia', Emergencias.getEmergencia);
app.get('/api/citaEmergencia/:id', Emergencias.onlyEmergencia);
app.get('/api/OnlyEmergencia/:historial', Emergencias.emergenciaH); // muestra todas las emergencias del paciente
app.post('/api/updateEmergencia/:id', Emergencias.updateEmergencia);
app.get('/api/emergenciaData/:id', Emergencias.dataEmergecnai); // este serv sirve para mostrar emergencia segun id
app.get('/api/EmergenciaP/:id', Emergencias.emergenciaP); // esta ruta sirve para mostrar una emergencia del paciente segun si id de la emergencia

//Internaciones
app.post('/api/internaciones/:idPinternacion/:idCama', Intern.Internacion);
app.get('/api/internciones', Intern.listInternaciones);
app.get('/api/delete_form_internacion/:id', Intern.delete_internacion);
app.get('/api/one_Form_internacion/:id_Pinternacion', Intern.One_form_Internacion);
app.get('/api/list_internacion_paciente/:id_Pinternacion/:historial', Intern.list_internacion_paciente);
app.post('/api/update_form_internacion/:id', Intern.update_form_internacion) // ruta para actulizar form internacion
app.get('/api/One_Internacion/:id', Intern.One_Internacion);


//responssables del apciente
app.post('/api/responsable/:id_paciente', Responsables.respRegsitro);
app.get('/api/responsable', Responsables.list_tesponsable);
app.get('/api/responsable_list/:id_paciente', Responsables.responsable_list); //ruta para poder mostrar la lista de responsables del paciente
app.get('/api/update_responsable/:id', Responsables.one_Responsables); //ruta para poder sacar mostrar un responsable para que sea actualizado
app.post('/api/update_responsable/:id', Responsables.update_Responsable)


//antecedentes del paciente
app.post('/api/antecedentes/:id_paciente', Antecedentes.reg_antecedente);
app.get('/api/antecedentes', Antecedentes.list_antecedentes);
app.get('/api/one_ant/:id_paciente', Antecedentes.antecedentes) //ruta para poder mostrar todos los antecedentes de un solo paciente
app.get('/api/update_antecedente/:id',Antecedentes.antecedenteOne) // esta ruta me mostrara un antecedente segun id para que sea actualizado
app.post('/api/update_antecedente/:id', Antecedentes.updateAntecedente) //esta ruta es para poder actualizar un antecedente

//alergais de de los pacientes
app.post('/api/alergias/:id_paciente', Alergias.reg_alergias);
app.get('/api/alergias', Alergias.list_alergias);
app.get('/api/alergias_list/:id_paciente', Alergias.alergias_list); // lista de alergias del paciente
app.get('/api/One_alergias/:id', Alergias.antecedenteOne);// mostrar una alergia para poder ser actulizado
app.post('/api/update_alergia/:id', Alergias.update_alergia)

//examen fisico del paciente
app.post('/api/examen_fisico/:id_paciente', Examen_Fisico.reg_examen_fisico);
app.get('/api/list_examenFisico', Examen_Fisico.list_tesponsable);
app.get('/api/exFisico_list/:id_paciente', Examen_Fisico.exFisco_list);// ruta para poder mostrar los examenes fisicos del paciente
app.get('/api/one_exFisico/:id', Examen_Fisico.one_exFisco);// ruta para poder mosrtrar un examen fisico para que pueda ser actualizado
app.post('/api/update_exFisico/:id', Examen_Fisico.update_exFisico); //esta ruta es para poder actualizar los examenes fisicos de un paciente



//receta de Internacion
app.post('/api/receta_interncaion/:id_internacion', RecetaInternacion.reg_recetaInter);
app.get('/api/list_receta_internacion', RecetaInternacion.listReceta_internacion);
};