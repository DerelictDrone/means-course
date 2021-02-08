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

exports.mongoserver = "lan.mongodb.lan"
exports.mongoport = "27017"
exports.mongopostuser = "post-bot"
exports.mongopostpass = "wGQqB5Uf4igHGvE"
exports.mongoargs = "/post-handler?authSource=post-handler&readPreference=primary&appname=nodejsposthandler=ssl=false"

