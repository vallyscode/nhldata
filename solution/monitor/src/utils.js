const { spawn } = require('child_process');
const axios = require("axios");
const { findRecordableFeeds } = require("./dao/models");

async function fetchSchedule() {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/schedule`)
        .then(resp => resp.data);
}

function isLiveGame(game) {
    return game?.status?.abstractGameState === "Live";
}

function findLiveGameFeeds(schedule) {
    return schedule.dates
        .flatMap(date => date.games
            .filter(isLiveGame)
            .map(game => game.link));
}

async function checkGamesState() {
    // const schedule = await fetchSchedule();
    const schedule = require("../data/schedule01.json");
    const liveFeeds = findLiveGameFeeds(schedule);
    console.log(`${new Date().toUTCString()} -- live feeds: ${JSON.stringify(liveFeeds)}`);

    const recordableFeeds = await findRecordableFeeds(liveFeeds);
    console.log(`${new Date().toUTCString()} -- recordable feeds: ${JSON.stringify(recordableFeeds)}`);

    recordableFeeds.forEach(recordableFeed => {
        const rec = spawn('node', ["../recorder/src/main.js", "/api/v1/game/2020030221/feed/live"]);
        rec.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        rec.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        rec.on('close', (code) => {
            console.log(`${recordableFeed} child process exited with code ${code}`);
        });
    });
}

module.exports = {
    isLiveGame,
    findLiveGameFeeds,
    fetchSchedule,
    checkGamesState,
};