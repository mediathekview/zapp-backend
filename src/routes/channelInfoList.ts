import {channelInfoList} from "../models/channelInfoList.ts";
import type {Request, Response} from "express";

function get(req: Request, res: Response) {
	res.send(channelInfoList);
}

export default {get};
