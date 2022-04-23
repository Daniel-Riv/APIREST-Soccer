const dbconnection = require('../database/database');
const redis = require('../helpers/redisCache');

const createTeam = async (req, res) => {
    const { team_id, name, league, country } = req.body;
    const query = `insert into team(team_id,name,league,country) values (${team_id},'${name}','${league}','${country}')`;
    await dbconnection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: `Error ${err}`
            });
        }
        return res.status(200).json({
            success: true,
            message: 'successful created'
        })
    })
}

const getReadTeam = async (req, res) => {
    redis.get('team', async (err, resul) => {
        const query = 'select * from team';
        await dbconnection.query(query, async (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            redis.set('team', JSON.stringify(results));
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
    })
}

const update = async (req, res) => {
    const { id } = req.params;
    const { name, league, country } = req.body;
    const findByTeam = `select * from team where team_id = ${id}`;
    await dbconnection.query(findByTeam, async (err, result) => {
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
        const query = `update team set name ='${name || result[0].name}',league ='${league || result[0].league}',country ='${country || result[0].country}' where team_id ='${id}'`;
        await dbconnection.query(query, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            return res.status(200).json({
                success: true,
                message: 'team update in the database'
            });
        });
        console.log(result);
    });
}

const deteleTeam = async (req, res) => {
    const { id } = req.params;
    const findByDelete = `select * from team where team_id = ${id}`;
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
        const query = `delete from team where team_id = ${id}`;
        await dbconnection.query(query, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `Error ${err}`
                });
            }
            return res.status(200).json({
                success: true,
                message: 'team delete in the database'
            });
        });
    })
}

module.exports = {
    createTeam,
    getReadTeam,
    update,
    deteleTeam
}