const { expect } = require("chai");
const { findRecordableFeeds, Feed } = require("../src/dao/models");

describe("DAO", async function () {

    describe("findRecordableFeeds", async function () {

        beforeEach(async function () {
            await Feed.destroy({
                where: {},
                truncate: true
            });
        });

        afterEach(async function () {
        });

        it("should return recordable feeds", async function () {
            // given
            const expected = [
                "/api/v1/game/2020030176/feed/live",
                "/api/v1/game/2020030211/feed/live"
            ];
            // when
            const actual = await findRecordableFeeds(expected);
            // then
            expect(actual).to.eql(expected);
        });

        it("should return recordable feed", async function () {
            // given
            await Feed.create({
                feed: "/api/v1/game/2020030176/feed/live",
                progress: "recording"
            }, { fields: ['feed', 'progress'] });

            // when
            const actual = await findRecordableFeeds([
                "/api/v1/game/2020030211/feed/live"
            ]);

            // then
            expect(actual).to.eql(["/api/v1/game/2020030211/feed/live"]);
        });

        it("should return no recordable feeds", async function () {
            // given
            await Feed.create({
                feed: "/api/v1/game/2020030176/feed/live",
                progress: "recording"
            }, { fields: ['feed', 'progress'] });
            await Feed.create({
                feed: "/api/v1/game/2020030211/feed/live",
                progress: "recording"
            }, { fields: ['feed', 'progress'] });

            // when
            const actual = await findRecordableFeeds([
                "/api/v1/game/2020030176/feed/live",
                "/api/v1/game/2020030211/feed/live"
            ]);

            // then
            expect(actual).to.eql([]);
        });

    });

});