import assert from "assert";
import { channelInfoList } from "../models/channelInfoList.js";
import showDownloader from "../downloader/show-downloader.js";

context("Show downloader", function () {

	// this may run slow - especially on ci
	this.timeout(10000);

	describe("#getShow() channel overview", function () {

		function testChannel(channelId) {
			it(`should not crash when running for ${channelId}`, async () => {
				try {
					let show = await showDownloader.getShow(channelId);
					assert.ok(show.title);
					assert.equal(show.channel, channelId);
					assert.ok(show.isRunningNow());
				}
				catch (e) {
					if (typeof (e.indexOf) !== "function" || e.indexOf("not available") === -1) {
						assert.fail("Some unexpected error: " + e);
					} else {
						console.error("downloader did not find any show");
					}
				}
			});
		}

		const channelIds = Object.keys(channelInfoList);
		channelIds.forEach(testChannel);
	});

	describe("#getShow()", function () {

		it(`should throw error for invalid channel id`, async () => {
			try {
				await showDownloader.getShow("test-channel-id");
				assert.fail();
			}
			catch (e) {

			}
		});


		it(`shows should be cached`, async () => {
			const show1 = await showDownloader.getShow("das_erste");
			const show2 = await showDownloader.getShow("das_erste");
			assert.deepStrictEqual(show1, show2);
		});

	});

});
