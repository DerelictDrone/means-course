/*
This config file is referenced by every node based file that asks for
an IP, in my use case I have a BIND 9(DNS) server running with

lan.node.lan
lan.mongodb.lan

configured to go to certain LAN IP addresses, this is so I can change them
from BIND without ever restarting the app, readability also helps.

Your use case may vary, so feel free to change the IP's to suit your needs.
*/

const nodeserver = "http://lan.node.lan"
const nodeport = "4242"
/*these are used for forming a connection string, they are formed like this:
"mongodb://" + MongoPostUser + ":" + MongoPostPass + "@" + MongoServer + MongoPort + MongoArgs
*/
const mongoserver = "http://lan.mongodb.lan"
const mongoport = "27017"
const mongopostuser = "post-bot"
const mongopostpass = "there-never-was-a-password"
const mongoargs = "/?authSource=post-handler&readPreference=primary&appname=nodejsposthandler=ssl=false"
