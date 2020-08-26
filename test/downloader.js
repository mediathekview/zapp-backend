const assert = require('assert');
const channelInfoList = require('../models/ChannelInfoList.js');
const showDownloader = require('../downloader/show-downloader');

context('Show downloader', function () {

	describe('#getShow()', function () {

		function testChannel(channelId) {
			it(`should not crash when running for ${channelId}`, async function () {
				try {
					await showDownloader.getShow(channelId);
				}
				catch(e) {
					if (e.indexOf('not available') === -1) {
						assert.fail('Some unexpected error: ' + e);
					}
				}
			});
		}

		const channelIds = Object.keys(channelInfoList);
		channelIds.forEach(testChannel);

	});

});
