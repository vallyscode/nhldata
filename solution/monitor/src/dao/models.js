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

async function findRecordableFeeds(liveFeeds) {
    return sequelize.authenticate()
        .then(async () => {
            console.log(`${new Date().toUTCString()} -- connected to database`);
            let result = [];
            if (liveFeeds.length > 0) {
                for (const liveFeed of liveFeeds) {
                    let feed = await Feed.findOne({
                        attributes: ["feed", "progress"],
                        where: {
                            feed: liveFeed
                        }
                    });
                    if (!feed) {
                        result.push(liveFeed);
                    }
                }
                return result;
            } else {
                return [];
            }
        })
        .catch(error => {
            console.error(`${new Date().toUTCString()} -- database connection failed: ${error}`);
        });
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


module.exports = {
    Feed,
    sequelize,
    findRecordableFeeds,
}