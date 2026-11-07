import assert from "assert";
import {channelInfoList} from "../models/channelInfoList.ts";
import showDownloader from "../downloader/show-downloader.js";

context("Show downloader", function () {

	// this may run slow - especially on ci
	this.timeout(10000);

	describe("#getShows() channel overview", function () {

		function testChannel(channelId) {
			it(`should not crash when running for ${channelId}`, async () => {
				try {
					let shows = await showDownloader.getShows(channelId);
					assert.ok(shows[0].title);
					assert.equal(shows[0].channel, channelId);
					assert.ok(shows[0].isRunningNow());
				} catch (e) {
					if (typeof (e) === "string" && e.includes("not available")) {
						console.error("downloader did not find any show");
					} else if (typeof (e) === "string" && e.includes("no downloader available")) {
						console.error("no downloader implemented");
					} else {
						assert.fail("Some unexpected error: " + e);
					}
				}
			});
		}

		const channelIds = Object.keys(channelInfoList);
		channelIds.forEach(testChannel);
	});

	describe("#getShows()", function () {

		it(`should throw error for invalid channel id`, async () => {
			try {
				await showDownloader.getShows("test-channel-id");
				assert.fail();
			} catch (_e) {
				//
			}
		});


		it(`shows should be cached`, async () => {
			const shows1 = await showDownloader.getShows("das_erste");
			const shows2 = await showDownloader.getShows("das_erste");
			assert.deepStrictEqual(shows1, shows2);
		});

	});

	describe("#getShows() upcoming shows", function () {

		function testChannel(channelId) {
			it(`should return current show and upcoming shows for ${channelId}`, async () => {
				try {
					const shows = await showDownloader.getShows(channelId);
					assert.ok(shows.length >= 1);
					assert.ok(shows.length <= 3);
					assert.ok(shows[0].isRunningNow());
					// all further shows have to start after the current one
					for (let i = 1; i < shows.length; i++) {
						assert.ok(Temporal.Instant.compare(shows[i - 1].startTime, shows[i].startTime) < 0);
					}
				} catch (e) {
					if (typeof (e) === "string" && e.includes("not available")) {
						console.error("downloader did not find any show");
					} else {
						assert.fail("Some unexpected error: " + e);
					}
				}
			});
		}

		const channelIds = Object.keys(channelInfoList);
		channelIds.forEach(testChannel);

	});

});
