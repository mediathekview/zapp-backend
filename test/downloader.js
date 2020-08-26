const assert = require('assert');
const channelInfoList = require('../models/ChannelInfoList.js');
const showDownloader = require('../downloader/show-downloader');

context('Show downloader', function () {

	describe('#getShow()', function () {

		function testChannel(channelId) {
			it(`should not crash when running for ${channelId}`, async function () {
				const show = await showDownloader.getShow(channelId);
				console.log(show.title);
			});
		}

		const channelIds = Object.keys(channelInfoList);
		channelIds.forEach(testChannel);

	});

});
