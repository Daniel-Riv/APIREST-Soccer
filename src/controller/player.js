const dbconnection = require('../database/database');
const redis = require('../helpers/redisCache');

const createPlayer = async (req, res) => {
    const { id, name, age, team_id, squad_number, position, nationality } = req.body;
    const validatorTeam = `select * from team where team_id =${team_id}`;
    await dbconnection.query(validatorTeam, async (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: `Error ${err}`
            });
        }
        if (result === 0) {
            return res.status(400).json({
                success: false,
                message: 'the player does not leave'
            })
        }
        const query = `insert into player(id,name,age,team_id,squad_number,position,nationality) values (${id},'${name}',${age},${team_id},'${squad_number}','${position}','${nationality}')`;
        await dbconnection.query(query, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Player created in the database',
                result
            });
        });
    });
}

const getplayer = async (req, res) => {
    redis.get('player', async (err, resul) => {
        const query = 'select * from player';
        await dbconnection.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            redis.set('player', JSON.stringify(results));
        });
        if (err) {
            return res.status(500).json({
                success: false,
                message: `Error ${err}`
            });
        }
        if (resul) {
            return res.status(200).json({
                success: true,
                results: JSON.parse(resul)
            });
        }
    });
}

const update = async (req, res) => {
    const { id } = req.params;
    const { name, age, team_id, squad_number, position, nationality } = req.body;
    const findByPlayer = `select * from player where id = ${id}`;
    await dbconnection.query(findByPlayer, async (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: `Error ${err}`
            });
        }
        if (result === 0) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: `does not appear in the database`
                });
            }
        }
        const query = `update player set name ='${name || result[0].name}',age =${age || result[0].age},team_id =${team_id || result[0].team_id},squad_number =${squad_number || result[0].squad_number},position ='${position || result[0].position}',nationality ='${nationality || result[0].nationality}' where id ='${id}'`;
        console.log(query);
        await dbconnection.query(query, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            return res.status(200).json({
                success: true,
                message: 'player update in database'
            });
        });
        console.log(result);
    });
}

const detelePlayer = async (req, res) => {
    const { id } = req.params;
    const findByDelete = `select * from player where id = ${id}`;
    await dbconnection.query(findByDelete, async (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: `Error ${err}`
            });
        }
        if (result === 0) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: `does not appear in the database`
                });
            }
        }
        const query = `delete from player where id = ${id}`;
        await dbconnection.query(query, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            return res.status(200).json({
                success: true,
                message: 'delete player in database'
            });
        });
    });
}
const findFilterTeam = async (req, res) => {
    const { team } = req.query;
    if (team) {
        const filterTeam = `select * from team inner join player on player.team_id = team.team_id where player.team_id=${team}`;
        await dbconnection.query(filterTeam, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            if (result === 0) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: `does not appear in the database`
                    });
                }
            }
            return res.status(200).json({
                success: true,
                result
            });
        });
    }
}

const findFilterPosition = async (req, res) => {
    const { position } = req.query;
    if (position) {
        const findPosition = `select * from player where position ='${position}'`
        await dbconnection.query(findPosition, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            if (result === 0) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: `does not appear in the database`
                    });
                }
            }
            return res.status(200).json({
                success: true,
                result
            });
        });
    }
}
const findFilterCountry = async (req, res) => {
    const { country } = req.query;
    if (country) {
        const findCountry = `select * from team  join player on player.team_id = team.team_id where team.country='${country}'`;
        await dbconnection.query(findCountry, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            if (result === 0) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: `does not appear in the database`
                    });
                }
            }
            return res.status(200).json({
                success: true,
                result
            });
        });
    }
}

module.exports = {
    createPlayer,
    getplayer,
    update,
    detelePlayer,
    findFilterTeam,
    findFilterPosition,
    findFilterCountry
}

