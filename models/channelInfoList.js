const ChannelInfo = require('./ChannelInfo');

module.exports = {
	"das_erste": new ChannelInfo("https://mcdn.daserste.de/daserste/de/master.m3u8", "Das Erste"),
	"zdf": new ChannelInfo("https://zdf-hls-15.akamaized.net/hls/live/2016498/de/high/master.m3u8", "ZDF"),
	"arte": new ChannelInfo("https://artelive-lh.akamaihd.net/i/artelive_de@393591/master.m3u8", "ARTE"),
	"dreisat": new ChannelInfo("https://zdf-hls-18.akamaized.net/hls/live/2016501/dach/high/master.m3u8", "3sat"),
	"kika": new ChannelInfo("https://kikageohls-i.akamaihd.net/hls/live/1006268/livetvkika_de/master.m3u8", "KiKA"),
	"phoenix": new ChannelInfo("https://zdf-hls-19.akamaized.net/hls/live/2016502/de/high/master.m3u8", "phoenix"),
	"tagesschau24": new ChannelInfo("http://tagesschau-lh.akamaihd.net/i/tagesschau_1@119231/master.m3u8", "tagesschau24"),
	"ard_alpha": new ChannelInfo("http://livestreams.br.de/i/bralpha_germany@119899/master.m3u8", "ARD-alpha"),
	"zdf_info": new ChannelInfo("https://zdf-hls-17.akamaized.net/hls/live/2016500/de/high/master.m3u8", "ZDFinfo"),
	"zdf_neo": new ChannelInfo("https://zdf-hls-16.akamaized.net/hls/live/2016499/de/high/master.m3u8", "ZDFneo"),
	"deutsche_welle": new ChannelInfo("http://dwstream72-lh.akamaihd.net/i/dwstream72_live@123556/master.m3u8", "Deutsche Welle"),
	"deutsche_welle_plus": new ChannelInfo("https://dwstream52-lh.akamaihd.net/i/dwstream52_live@500528/index_1_av-p.m3u8", "Deutsche Welle+"),
	"one": new ChannelInfo("http://onelivestream-lh.akamaihd.net/i/one_livestream@568814/master.m3u8", "ONE"),
	"br_nord": new ChannelInfo("http://livestreams.br.de/i/bfsnord_germany@119898/master.m3u8", "BR Nord"),
	"br_sued": new ChannelInfo("http://livestreams.br.de/i/bfssued_germany@119890/master.m3u8", "BR Süd"),
	"hr": new ChannelInfo("http://livestream-1.hr.de/i/hr_fernsehen@75910/master.m3u8", "HR"),
	"mdr_sachsen": new ChannelInfo("http://mdrsnhls-lh.akamaihd.net/i/livetvmdrsachsen_de@513998/master.m3u8", "MDR Sachsen"),
	"mdr_sachsen_anhalt": new ChannelInfo("http://mdrsahls-lh.akamaihd.net/i/livetvmdrsachsenanhalt_de@513999/master.m3u8", "MDR Sachsen-Anhalt"),
	"mdr_thueringen": new ChannelInfo("http://mdrthuhls-lh.akamaihd.net/i/livetvmdrthueringen_de@514027/master.m3u8", "MDR Thüringen"),
	"ndr_hh": new ChannelInfo("https://ndrfs-lh.akamaihd.net/i/ndrfs_hh@430231/master.m3u8", "NDR Hamburg"),
	"ndr_mv": new ChannelInfo("https://ndrfs-lh.akamaihd.net/i/ndrfs_mv@430232/master.m3u8", "NDR Mecklenburg-Vorpommern"),
	"ndr_nds": new ChannelInfo("https://ndrfs-lh.akamaihd.net/i/ndrfs_nds@430233/master.m3u8", "NRD Niedersachsen"),
	"ndr_sh": new ChannelInfo("https://ndrfs-lh.akamaihd.net/i/ndrfs_sh@430234/master.m3u8", "NDR Schleswig-Holstein"),
	"rbb_berlin": new ChannelInfo("https://rbblive-lh.akamaihd.net/i/rbb_berlin@144674/master.m3u8", "rbb Fernsehen Berlin"),
	"rbb_brandenburg": new ChannelInfo("https://rbblive-lh.akamaihd.net/i/rbb_brandenburg@349369/master.m3u8", "rbb Fernsehen Brandenburg"),
	"rb": new ChannelInfo("https://rbfs-lh.akamaihd.net/i/rb_fs@438960/master.m3u8", "Radio Bremen"),
	"sr": new ChannelInfo("http://live2_sr-lh.akamaihd.net/i/sr_universal02@107595/master.m3u8", "SR"),
	"swr_bw": new ChannelInfo("https://swrbwhls-i.akamaihd.net/hls/live/667638/swrbwd/master.m3u8", "SWR Baden-Württemberg"),
	"swr_rp": new ChannelInfo("https://swrrphls-i.akamaihd.net/hls/live/667639/swrrpd/master.m3u8", "SWR Rheinland-Pfalz"),
	"wdr": new ChannelInfo("http://wdrfsgeo-lh.akamaihd.net/i/wdrfs_geogeblockt@530016/master.m3u8", "WDR"),
	"parlamentsfernsehen_1": new ChannelInfo("https://cldf-hlsgw.r53.cdn.tv1.eu/1000153copo/hk1.m3u8", "Parlaments\u00adfern\u00adsehen Kanal 1"),
	"parlamentsfernsehen_2": new ChannelInfo("https://cldf-hlsgw.r53.cdn.tv1.eu/1000153copo/hk2.m3u8", "Parlaments\u00adfern\u00adsehen Kanal 2"),
};