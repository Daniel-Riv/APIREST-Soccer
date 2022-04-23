const { Router } = require('express');
const { createTeam, getReadTeam, update, deteleTeam } = require('../controller/team');
const router = Router();

/**
 * @swagger
 *components:
*   schemas:
*     Team:
*      type: object
*      properties:
*           team_id:
*              type: integer
*              description: the id of team
*           name:
*              type: string
*              description: the name of user
*           league:
*            type: string
*            description: the league of user
*           country:
*              type: string
*              description: the country of user
*      required:
*              - team_id
*              - name
*              - league
*              - country
*      example:
*              team_id: 3
*              name: Dormunt
*              league: Bundesliga
*              country: Alemania
 */


/**
*@swagger
* /team/create:
*   post:
*      tags:
*         - Team
*      requestBody:
*         required: true
*         content:
*               application/json:
*                  schema:
*                     type: object
*                     $ref: '#/components/schemas/Team'
*      consumes:
*           - application/json
*      produces:
*           - application/json
*      responses:
*         200:
*               description: the team created
*         400:
*               description: the team not exits
*         500:
*               description: internal server error                       
 */
router.post('/create', createTeam);

/**
*@swagger
* /team/all:
*   get:
*      tags:
*         - Team
*      Summary: show all teams
*      responses:
*         200:
*               description: the user views
*         500:
*               description: internal server error                       
 */
router.get('/all', getReadTeam);

/**
*@swagger
* /team/update/{id}:
*   put:
*      tags:
*         - Team
*      requestBody:
*         required: true
*         content:
*               application/json:
*                  schema:
*                     type: object
*                     $ref: '#/components/schemas/Team'
*      parameters:
*         - in: path
*           name: id
*           schema:
*               type: integer
*               required: true
*      responses:
*         200:
*               description: the user update
*         400:
*               description: the user not exits
*         500:
*               description: internal server error                       
 */
router.put('/update/:id', update);

/**
*@swagger
* /team/delete/{id}:
*   delete:
*      tags:
*         - Team
*      parameters:
*         - in: path
*           name: id
*           schema:
*               type: integer
*               required: true
*      responses:
*         200:
*               description: the user delete
*         400:
*               description: the user not exits
*         500:
*               description: internal server error                       
 */
router.delete('/delete/:id', deteleTeam);
module.exports = router;