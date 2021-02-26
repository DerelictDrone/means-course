/*
This config file is referenced by every node based file that asks for
an IP, in my use case I have a BIND 9(DNS) server running with

lan.mongodb.lan

configured to go to certain LAN IP addresses, this is so I can change them
from BIND without ever restarting the app, readability also helps.

Your use case may vary, so feel free to change the IP's to suit your needs.
*/

/*these are used for forming a connection string in app.js, they are formed like this:
"mongodb://" + MongoPostUser + ":" + MongoPostPass + "@" + MongoServer + MongoPort + MongoArgs
*/

exports.nodeserver = "phpminor.duckdns.org"
//the port is definitely used, not sure on server though
exports.nodeport = "28902"
//protocol used for image requests, among other things, format is reqprotocol + ://
exports.reqprotocol = "http"

exports.mongoserver = "lan.mongodb.lan"
exports.mongoport = "27017"
exports.mongopostuser = "post-bot"
exports.mongopostpass = "wGQqB5Uf4igHGvE"
exports.mongoargs = "/post-handler?authSource=post-handler&readPreference=primary&appname=nodejsposthandler=ssl=false"

//this is an excessively long string I just so happened to have on hand, it's actually a nato ammobearer's loadout from arma 3 which I ran through a few find & replaces in order to make it able to be received from a nodeJS server and then re-joined into a valid array for the command SetUnitLoadout in-game, I was going to do some testing in order to see if I could also upload a loadout from arma 3 to nodejs, but it turns out that the extension that I used only supported GET requests, and the one that purported to support any kind of request used a middleware to deserialize, but that middleware was on a glitch server, which the creator had made themself. Now, that would normally be fine, but it turns out that they took the deserialize project off of their glitch server. Meaning that it was, in effect, useless now. So sad, it seemed to have so much potential.
exports.tknscrt = '&?$*arifle_MX_ACO_pointer_F*!%!*acc_pointer_IR*!*optic_Aco*!<*30Rnd_65x39_caseless_mag*!30>!<>!%>!<>!<*hgun_P07_F*!%!%!%!<*16Rnd_9x21_Mag*!17>!<>!%>!<*U_B_CombatUniform_mcam*!$*ACE_fieldDressing*!5>!<*ACE_packingBandage*!5>!<*ACE_morphine*!5>!<*ACE_tourniquet*!5>!<*30Rnd_65x39_caseless_mag*!2!30^!<*V_PlateCarrier1_rgr*!$*30Rnd_65x39_caseless_mag*!9!30>!<*16Rnd_9x21_Mag*!2!17>!<*HandGrenade*!1!1>!<*SmokeShell*!1!1>!<*SmokeShellGreen*!1!1>!<*Chemlight_green*!2!1^!<*B_AssaultPack_mcamo_Ammo*!$*ACRE_PRC343_ID_1*!1>!<*30Rnd_65x39_caseless_mag*!6!30>!<*100Rnd_65x39_caseless_mag*!1!100>!<*HandGrenade*!2!1>!<*MiniGrenade*!2!1>!<*1Rnd_HE_Grenade_shell*!3!1>!<*3Rnd_HE_Grenade_shell*!1!3>!<*10Rnd_338_Mag*!2!10>!<*20Rnd_762x51_Mag*!2!20^!*H_HelmetB_grass*!*G_Tactical_Clear*!<>!<*ItemMap*!%!*ItemRadioAcreFlagged*!*ItemCompass*!*ItemWatch*!*NVGoggles*~?&'
