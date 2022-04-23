const jwt = require('jsonwebtoken');

const genereteToken = (id_user, name, lastName, email) => {
    return new Promise((resolve, rejects) => {
        const load = { id_user, name, lastName, email };
        console.log(process.env.SECRET_JWT);
        jwt.sign(load, process.env.SECRET_JWT, {
            expiresIn: '6h'
        },
            (error, token) => {
                if (error) {
                    rejects(`the token was not generated: ${error}`)

                }
                resolve(token);

            })
    });


}

module.exports = {
    genereteToken
}