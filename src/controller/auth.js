const { genereteToken } = require('../helpers/jwt');
const dbconnection = require('../database/database');



const signIn = async (req, res) => {
    const { email, password } = req.body;
    const sentences = ` select * from auth where email = '${email}' AND password = '${password}'`;
    await dbconnection.query(sentences, async (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: `Error ${err}`
            });

        }
        if (result.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'check your email or password, something wrong '
            });
        }
        const { id_user, name, lastName, email } = result[0];
        const token = await genereteToken(id_user, name, lastName, email);
        return res.status(200).json({
            success: true,
            message: 'successful login',
            token
        });
    });


}
const signUp = async (req, res) => {
    const { id_user, name, lastName, email, password } = req.body;
    console.log(email);
    await dbconnection.query(`select * from auth where email ='${email}'`, async (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: `Error ${err}`
            });
        }
        if (result.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'The user already appears in the database'
            });

        }
        const query = `insert into auth(name,lastName,email,password) values ("${name}","${lastName}","${email}","${password}") `;

        await dbconnection.query(query, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            return res.status(200).json({
                success: true,
                message: 'user create in database'
            })
        })

    })

}



module.exports = {
    signIn,
    signUp,

}