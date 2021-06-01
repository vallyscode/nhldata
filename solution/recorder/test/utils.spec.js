const { expect } = require("chai");
const { isOver, getPlayers } = require("../src/utils")

describe("Utils", function () {
    describe("isOver", function () {
        it("should return false when game is live", function () {
            // given
            const liveFeed = require("./data/livefeed01.json");

            // when
            const result = isOver(liveFeed);

            // then
            expect(result).to.equal(false);
        });

        it("should return true when game is over", function () {
            // given
            const overFeed = require("./data/overfeed01.json");

            // when
            const result = isOver(overFeed);

            // then
            expect(result).to.equal(true);
        });
    });

    describe("getPlayers", function () {
        it("should return all players in feed", function() {
            // given
            const liveFeed = require("./data/livefeed01.json");
            
            // when
            const result = getPlayers(liveFeed);

            // then
            expect(result.length).to.eql(73);
        });
    });
});