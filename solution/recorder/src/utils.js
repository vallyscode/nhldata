const axios = require("axios");
const { markFeed, upsertPlayers } = require("./dao/models");

async function fetchFeedLive(liveFeed) {
    return axios.get(`https://statsapi.web.nhl.com/${liveFeed}`)
        .then(resp => resp.data);
}

const GAME_OVER = "Final";

function isOver(feedData) {
    const gameState = feedData?.gameData?.status?.abstractGameState;
    return GAME_OVER === gameState;
}

function getTeamPlayers(team) {
    return Object.keys(team.players)
        .map(key => {
            const playerInfo = team.players[key];
            return {
                playerId: playerInfo.person.id,
                playerName: playerInfo.person.fullName,
                teamId: team.team.id,
                teamName: team.team.name,
                playerNumber: playerInfo.jerseyNumber,
                playerPosition: playerInfo.position.name,
                assists: playerInfo.stats?.skaterStats?.assists || 0,
                goals: playerInfo.stats?.skaterStats?.goals || 0,
                hits: playerInfo.stats?.skaterStats?.hits || 0,
                penaltyMinutes: playerInfo.stats?.skaterStats?.penaltyMinutes || 0,
            };
        });
}

function getPlayers(feedData) {
    const players = feedData?.gameData?.players;
    return getTeamPlayers(feedData?.liveData?.boxscore?.teams?.away)
        .concat(getTeamPlayers(feedData?.liveData?.boxscore?.teams?.home))
        .map(player => {
            player.playerAge = players[`ID${player.playerId}`].currentAge;
            return player;
        });
}

async function recordFeed() {
    const liveFeed = process.argv[2];
    const feedData = await fetchFeedLive(liveFeed);

    await markFeed(liveFeed, "recording");

    await upsertPlayers(getPlayers(feedData));

    if (isOver(feedData)) {
        await markFeed(liveFeed, "recorded");
        process.exit(0);
    }
}

module.exports = {
    fetchFeedLive,
    recordFeed,
    getPlayers,
    isOver,
};