const { Sequelize, DataTypes } = require('sequelize');;

const HOST = process.env.DBHOST;

const sequelize = new Sequelize('gamesdb', 'myuser', 'mypassword', {
    host: HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

async function markFeed(liveFeed, progress) {
    return sequelize.authenticate()
        .then(async () => {
            console.log(`${new Date().toUTCString()} -- connected to database`);
            await Feed.create({
                feed: liveFeed,
                progress: progress,
            }, { fields: ['feed', 'progress'] });
            console.log(`${new Date().toUTCString()} -- marked feed as ${progress}`);
        })
        .catch(error => {
            console.error(`${new Date().toUTCString()} -- database connection failed: ${error}`);
        });
}

async function upsertPlayers(players) {
    return sequelize.authenticate()
        .then(async () => {
            console.log(`${new Date().toUTCString()} -- connected to database`);
            for (const player of players) {
                await Player.upsert({
                    playerid: player.playerId,
                    playername: player.playerName,
                    teamid: player.teamId,
                    teamname: player.teamName,
                    playerage: player.playerAge,
                    playernumber: player.playerNumber,
                    playerposition: player.playerPosition,
                    assists: player.assists,
                    goals: player.goals,
                    hits: player.hits,
                    penaltyminutes: player.penaltyMinutes,
                }, {
                    fields: [
                        'playerid', 'playername', 'teamid', 'teamname',
                        'playerage', 'playernumber', 'playerposition',
                        'assists', 'goals', 'hits', 'penaltyminutes'
                    ]
                });
            }
            console.log(`${new Date().toUTCString()} -- upsert players`);
        })
        .catch(error => {
            console.error(`${new Date().toUTCString()} -- database connection failed: ${error}`);
        })
}

const Feed = sequelize.define("Feed", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    feed: { type: DataTypes.STRING },
    progress: { type: DataTypes.STRING }
}, {
    tableName: 'feeds',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

const Player = sequelize.define("Player", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    playerid: { type: DataTypes.INTEGER },
    playername: { type: DataTypes.STRING },
    teamid: { type: DataTypes.INTEGER },
    teamname: { type: DataTypes.STRING },
    playerage: { type: DataTypes.INTEGER },
    playernumber: { type: DataTypes.STRING },
    playerposition: { type: DataTypes.STRING },
    assists: { type: DataTypes.INTEGER },
    goals: { type: DataTypes.INTEGER },
    hits: { type: DataTypes.INTEGER },
    penaltyminutes: { type: DataTypes.INTEGER },
}, {
    tableName: 'players',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})


module.exports = {
    Feed,
    Player,
    sequelize,
    markFeed,
    upsertPlayers,
}