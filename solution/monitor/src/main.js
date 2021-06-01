const { checkGamesState } = require("./utils");

(async () => {
    const POLL_INTERVAL = 11000;
    setInterval(checkGamesState, POLL_INTERVAL);
})();
