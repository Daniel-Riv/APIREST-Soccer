const path = require('path');
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API SOCCER',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'https://apirestsoccer.herokuapp.com/api/soccer/'
            }
        ]
    },
    apis: [`${path.join(__dirname, '../routes/*.js')}`]
}

module.exports = swaggerSpec;