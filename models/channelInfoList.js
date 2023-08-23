const ChannelInfo = require("./ChannelInfo");

module.exports = {
	"das_erste": new ChannelInfo("https://mcdn.daserste.de/daserste/de/master.m3u8", "Das Erste"),
	"zdf": new ChannelInfo("https://zdf-hls-15.akamaized.net/hls/live/2016498/de/high/master.m3u8", "ZDF"),
	"arte": new ChannelInfo("https://artesimulcast.akamaized.net/hls/live/2030993/artelive_de/index.m3u8", "ARTE"),
	"dreisat": new ChannelInfo("https://zdf-hls-18.akamaized.net/hls/live/2016501/dach/high/master.m3u8", "3sat"),
	"kika": new ChannelInfo("https://kikageohls.akamaized.net/hls/live/2022693/livetvkika_de/master.m3u8", "KiKA"),
	"phoenix": new ChannelInfo("https://zdf-hls-19.akamaized.net/hls/live/2016502/de/high/master.m3u8", "phoenix"),
	"tagesschau24": new ChannelInfo("https://tagesschau.akamaized.net/hls/live/2020117/tagesschau/tagesschau_3/master.m3u8", "tagesschau24"),
	"ard_alpha": new ChannelInfo("https://mcdn.br.de/br/fs/ard_alpha/hls/de/master.m3u8", "ARD-alpha"),
	"zdf_info": new ChannelInfo("https://zdf-hls-17.akamaized.net/hls/live/2016500/de/high/master.m3u8", "ZDFinfo"),
	"zdf_neo": new ChannelInfo("https://zdf-hls-16.akamaized.net/hls/live/2016499/de/high/master.m3u8", "ZDFneo"),
	"deutsche_welle": new ChannelInfo("https://dwamdstream106.akamaized.net/hls/live/2017965/dwstream106/index.m3u8", "Deutsche Welle"),
	"deutsche_welle_plus": new ChannelInfo("https://dwamdstream105.akamaized.net/hls/live/2015531/dwstream105/index.m3u8", "Deutsche Welle+"),
	"one": new ChannelInfo("https://mcdn.one.ard.de/ardone/hls/master.m3u8", "ONE"),
	"br_nord": new ChannelInfo("https://mcdn.br.de/br/fs/bfs_nord/hls/de/master.m3u8", "BR Nord"),
	"br_sued": new ChannelInfo("https://mcdn.br.de/br/fs/bfs_sued/hls/de/master.m3u8", "BR Süd"),
	"hr": new ChannelInfo("https://hrhls.akamaized.net/hls/live/2024525/hrhls/index.m3u8", "HR"),
	"mdr_sachsen": new ChannelInfo("https://mdrtvsnhls.akamaized.net/hls/live/2016928/mdrtvsn/master.m3u8", "MDR Sachsen"),
	"mdr_sachsen_anhalt": new ChannelInfo("https://mdrtvsahls.akamaized.net/hls/live/2016879/mdrtvsa/master.m3u8", "MDR Sachsen-Anhalt"),
	"mdr_thueringen": new ChannelInfo("https://mdrtvthhls.akamaized.net/hls/live/2016880/mdrtvth/master.m3u8", "MDR Thüringen"),
	"ndr_hh": new ChannelInfo("https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_hh/master.m3u8", "NDR Hamburg"),
	"ndr_mv": new ChannelInfo("https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_mv/master.m3u8", "NDR Mecklenburg-Vorpommern"),
	"ndr_nds": new ChannelInfo("https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_nds/master.m3u8", "NRD Niedersachsen"),
	"ndr_sh": new ChannelInfo("https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_sh/master.m3u8", "NDR Schleswig-Holstein"),
	"rbb_berlin": new ChannelInfo("https://rbb-hls-berlin.akamaized.net/hls/live/2017824/rbb_berlin/index.m3u8", "rbb Fernsehen Berlin"),
	"rbb_brandenburg": new ChannelInfo("https://rbb-hls-brandenburg.akamaized.net/hls/live/2017825/rbb_brandenburg/index.m3u8", "rbb Fernsehen Brandenburg"),
	"rb": new ChannelInfo("https://rbhlslive.akamaized.net/hls/live/2020435/rbfs/master.m3u8", "Radio Bremen"),
	"sr": new ChannelInfo("https://srfs.akamaized.net/hls/live/689649/srfsgeo/master.m3u8", "SR"),
	"swr_bw": new ChannelInfo("https://swrbwd-hls.akamaized.net/hls/live/2018672/swrbwd/master.m3u8", "SWR Baden-Württemberg"),
	"swr_rp": new ChannelInfo("https://swrrpd-hls.akamaized.net/hls/live/2018676/swrrpd/master.m3u8", "SWR Rheinland-Pfalz"),
	"wdr": new ChannelInfo("https://mcdn.wdr.de/wdr/wdrfs/de/master.m3u8", "WDR"),
	"parlamentsfernsehen_1": new ChannelInfo("https://bttv-live-z.r53.cdn.tv1.eu/13014bundestag-hk1/_definst_/live/video/hk1_de.smil/playlist.m3u8", "Parlaments\u00adfern\u00adsehen Kanal 1"),
	"parlamentsfernsehen_2": new ChannelInfo("https://bttv-live-z.r53.cdn.tv1.eu/13014bundestag-hk2/_definst_/live/video/hk2_de.smil/playlist.m3u8", "Parlaments\u00adfern\u00adsehen Kanal 2"),
};
