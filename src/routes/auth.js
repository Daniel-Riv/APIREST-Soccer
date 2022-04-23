const { Router } = require('express');
const { signIn, signUp } = require('../controller/auth');
const router = Router();

/**
 * @swagger
 *components:
*   schemas:
*     Auth:
*      type: object
*      properties:
*           id_user:
*              type: integer
*              description: the id of user
*           name:
*              type: string
*              description: the name of user
*           lastName:
*            type: string
*            description: the lastName of user
*           email:
*              type: string
*              description: the email of user
*           password:
*              type: string
*              description: the password of  user
*      required:
*              - email
*              - password
*      example:
*              email: daniel@gmail.com
*              password: '123456789'
 */

/**
*@swagger
* /auth/signin:
*   post:
*      tags:
*         - Auth
*      requestBody:
*         required: true
*         content:
*               aplication/json:
*                  schema:
*                     type: object
*                     $ref: '#/components/schemas/Auth'
*      responses:
*         200:
*               description: the user logged
*         400:
*               description: verify email or password is wrong
*         500:
*               description: internal server error                       
 */
router.post('/signin', signIn);


router.post('/singnup', signUp);

module.exports = router;