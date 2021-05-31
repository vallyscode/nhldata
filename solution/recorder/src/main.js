const { recordFeed } = require("./utils");

(async () => {
    const POLL_INTERVAL = 11000;
    recordFeed();
    setInterval(recordFeed, POLL_INTERVAL);
})();
