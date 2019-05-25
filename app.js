const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser =require('body-parser')

app.set('port', process.env.PORT || 7000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("public")); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routas
app.use('/', require('./routes/index'));
app.use('/paciente', require('./routes/paciente'));
app.use('/medico', require('./routes/medico'));


app.listen(app.get('port'), () => {
    console.log(`servidor en puerto ${app.get('port')}`)
 });

 