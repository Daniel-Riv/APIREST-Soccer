require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//swagger doc
const swagger = require('swagger-ui-express');
const swaggerJs = require('swagger-jsdoc');
const swaggerSpec = require('./helpers/swaggerJs');


//sertting
app.set('port', process.env.PORT || 3000);
//Middlwares
app.use(express.json());
app.use(cors());
app.use('/api-doc', swagger.serve, swagger.setup(swaggerJs(swaggerSpec)));

//Routes
app.use('/api/soccer/auth', require('./routes/auth'));
app.use('/api/soccer/team', require('./routes/team'));
app.use('/api/soccer/player', require('./routes/player'));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});