const { expect } = require("chai");
const { isLiveGame, findLiveGameFeeds } = require("../src/utils");

describe("Utils", function () {

    describe("isLiveGame", function () {

        it("should return true when game state is live", function () {
            // given
            const game = require("./data/liveGame.json");

            // when
            const result = isLiveGame(game);

            // then
            expect(result).to.equal(true);
        });

        it("should return false when game in state different from live", function () {
            // given
            const game = require("./data/previewGame.json");

            // when
            const result = isLiveGame(game);

            // then
            expect(result).to.equal(false);
        })

    });

    describe("findLiveGameFeeds", function () {

        it("should return live game feeds", function () {
            // given
            const schedule = require("./data/schedule.json");
            const expected = ["/api/v1/game/2020030221/feed/live"];

            // when
            const actual = findLiveGameFeeds(schedule);

            // then
            expect(actual.length).to.equal(1);
            expect(actual).to.eql(expected);
        });

    });

});
