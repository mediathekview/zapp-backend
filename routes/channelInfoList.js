const channelInfoList = require("./../models/channelInfoList");

exports.get = function(req, res) {
	res.send(channelInfoList);
};
