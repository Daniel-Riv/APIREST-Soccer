
const { Router } = require('express');
const { createPlayer, getplayer, update, detelePlayer, findFilterTeam, findFilterPosition, findFilterCountry } = require('../controller/player');
const router = Router();

/**
 * @swagger
 *components:
*   schemas:
*     Player:
*      type: object
*      properties:
*           id:
*              type: integer
*              description: the id of user
*           name:
*              type: string
*              description: the name of user
*           age:
*              type: integer
*              description: the age of user
*           team_id:
*              type: integer
*              description: the team_id of user
*           squad_number:
*              type: integer
*              description: the squad_number of user
*           position:
*              type: string
*              description: the position of  user
*           nationality:
*              type: string
*              description: the nationality of  user
*      required:
*              - id
*              - team_id
*      example:
*              id: 15
*              name: cristiano
*              age: 30
*              team_id: 3
*              squad_number: 60
*              position: attack
*              nationality: colombiano
 */

/**
*@swagger
* /player/create:
*   post:
*      tags:
*         - Player
*      requestBody:
*         required: true
*         content:
*               application/json:
*                  schema:
*                     type: object
*                     $ref: '#/components/schemas/Player'
*      consumes:
*           - application/json
*      produces:
*           - application/json
*      responses:
*         200:
*               description: the user created
*         400:
*               description: the player not exits
*         500:
*               description: internal server error                       
 */
router.post('/create', createPlayer);

/**
*@swagger
* /player/all:
*   get:
*      tags:
*         - Player
*      Summary: show all players
*      responses:
*         200:
*               description: the user views
*         500:
*               description: internal server error                       
 */
router.get('/all', getplayer);

/**
*@swagger
* /player/update/{id}:
*   put:
*      tags:
*         - Player
*      requestBody:
*         required: true
*         content:
*               application/json:
*                  schema:
*                     type: object
*                     $ref: '#/components/schemas/Player'
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
* /player/delete/{id}:
*   delete:
*      tags:
*         - Player
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
router.delete('/delete/:id', detelePlayer);

/**
*@swagger
* /player/filter/team:
*   get:
*      tags:
*         - Player
*      summary: Filter by team
*      description: To filter by team you must search by the team id
*      parameters:
*         - in: query
*           name: team
*           schema:
*               type: integer
*               required: true
*      responses:
*         200:
*               description: the user filter fot team
*         400:
*               description: the user not exits in data base
*         500:
*               description: internal server error                       
 */
router.get('/filter/team', findFilterTeam);

/**
*@swagger
* /player/filter/position:
*   get:
*      tags:
*         - Player
*      parameters:
*         - in: query
*           name: position
*           schema:
*               type: string
*               required: true
*      responses:
*         200:
*               description: the user filter fot position
*         400:
*               description: the user not exits in data base
*         500:
*               description: internal server error                       
 */
router.get('/filter/position', findFilterPosition);

/**
*@swagger
* /player/filter/country:
*   get:
*      tags:
*         - Player
*      parameters:
*         - in: query
*           name: country
*           schema:
*               type: string
*               required: true
*      responses:
*         200:
*               description: the user filter fot country
*         400:
*               description: the user not exits in data base
*         500:
*               description: internal server error                       
 */
router.get('/filter/country', findFilterCountry);
module.exports = router;
