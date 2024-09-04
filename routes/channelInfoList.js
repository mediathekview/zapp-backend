import { channelInfoList } from "./../models/channelInfoList.js";

function get(req, res) {
	res.send(channelInfoList);
}

export default { get };
