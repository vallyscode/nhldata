const axios = require("axios");
const { markFeedRecording } = require("./dao/models");

async function fetchFeedLive(liveFeed) {
    return axios.get(`https://statsapi.web.nhl.com/${liveFeed}`)
        .then(resp => resp.data);
}

const GAME_OVER = "Final";

function isOver(feedData) {
    const gameState = feedData?.gameData?.status?.abstractGameState;
    return GAME_OVER === gameState;
}

async function recordFeed() {
    const liveFeed = process.argv[2];
    const feedData = await fetchFeedLive(liveFeed);

    await markFeedRecording(liveFeed);

    if (isOver(feedData)) {
        process.exit(0);
    }
}

module.exports = {
    fetchFeedLive,
    recordFeed,
};