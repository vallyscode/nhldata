// const http = require("http");
// const { Game, sequelize } = require("./dao/games");

const { checkGamesState } = require("./utils");

(async () => {
    const POLL_INTERVAL = 11000;
    setInterval(checkGamesState, POLL_INTERVAL);
})();

// let gamesList = null;

// async function pollGameStates() {
//     let schedule = await fetchSchedule();
//     let liveGames = getLiveGames(schedule);
//     console.log(`DATES: ${JSON.stringify(liveGames)}`);
//     gamesList = liveGames;

//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         for (const liveGame of liveGames) {
//             let r = await Game.findOne({
//                 attributes: ["id", "link", "progress"],
//                 where: {
//                     link: liveGame.link
//                 }
//             });
//             console.log(`FOUND: ${JSON.stringify(r)}`)
//             if (r) {
//                 console.log("RECORDING");
//             } else {
//                 console.log("NO RECORDING");
//             }
//         }
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }


// const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
// const PORT = process.env.PORT || 3000;
// const POLL_INTERVAL = process.env.POLL || 11000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(gamesList));
// });

// server.listen(PORT, HOSTNAME, () => {
//     console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
//     setInterval(pollGameStates, POLL_INTERVAL);
// });

// (async () => {

//     let env = process.env;
//     console.log(`ENV: ${JSON.stringify(env.NODE_ENV)}`);


//     // let schedule = await fetchSchedule();
//     // console.log(`SCHEDULE: ${JSON.stringify(schedule)}`);

//     // let gameDate = Date.parse("2021-05-29T01:00:00Z"); 
//     // let x = new Date(gameDate);
//     // console.log(`Date: ${gameDate}`);
//     // console.log(`Date: ${x}`);

//     let zulu = "2021-05-29T23:30:00Z";
//     let gameDate = Date.parse(zulu);
//     let x = new Date(gameDate);
//     console.log(`GameDate: ${gameDate}`);
//     console.log(`STR: ${x} ${x.get}`);
//     let xutc = x.toUTCString();
//     console.log(`XUTC: ${xutc} ? ${zulu}`);

//     console.log(`========`);
//     let A = Date.parse(zulu);
//     let B = Date.now();
//     console.log(`A: ${A} B: ${B}`);
//     console.log(`A: ${new Date(A).toUTCString()} B: ${new Date(B).toUTCString()}`);
//     console.log(`A: ${Date.parse(new Date(A).toUTCString())} B: ${Date.parse(new Date(B).toUTCString())}`);


    // let feed = await fetchFeedLive(2020030167);
    // console.log(`FEED: ${JSON.stringify(feed)}`);

    // while (true) {
    //     let feed = await fetchFeedLive(2020030167);
    //     console.log("\n------------------------------\n");
    //     console.log(`FEED: ${JSON.stringify(feed)}`);
    //     console.log("\n------------------------------\n");

    //     await delay();
    // }

    // await new Promise((resolve, reject) => {
    //     let gameDate = Date.parse("2021-05-29T01:00:00Z");
    //     let x = new Date(gameDate);
    //     let y = new Date();

    //     console.log("2021-05-29T01:00:00Z");
    //     console.log(`Date: ${gameDate}`);
    //     console.log(`Date: ${x}`);
    //     console.log(`Date: ${y}`);

    //     while (true) {
    //         let feed = await fetchFeedLive(2020030167);
    //         console.log("\n------------------------------\n");
    //         console.log(`FEED: ${JSON.stringify(feed)}`);
    //         console.log("\n------------------------------\n");

    //         await delay();
    //     }
    // });

// })();

// async function delay(millis) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, millis);
//     });
// }

// axios.get("https://statsapi.web.nhl.com/api/v1/teams")
// .then(resp => {
//     return resp.data;
// })
// .then(data => {
//     console.log(`DATA: ${JSON.stringify(data)}`);
// })
// .catch(error => {
//     console.log(`ERR: ${error}`);
// })