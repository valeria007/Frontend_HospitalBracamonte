import http from 'http'
        import express from 'express'

        import logger from 'morgan';
        import bodyParser from 'body-parser';
        import routes from './server/routes';
        var cors = require('cors')

        const hostname = '127.0.0.1';
        const port = 3000;
        const app = express()
        const server = http.createServer(app);

        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(cors());
        routes(app);

        app.get('*', (req, res) => res.status(200).send({
          message: 'Welcome to the .',
        }));

        server.listen(port, hostname, () => {
          console.log(`Server running at http://${hostname}:${port}/`);
        });