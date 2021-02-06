/*
This config file is referenced by every angular based file that asks for
an IP, in my use case I have a BIND 9(DNS) server running with

lan.node.lan
lan.mongodb.lan

configured to go to certain LAN IP addresses, this is so I can change them
from BIND without ever restarting the app, readability also helps.

Your use case may vary, so feel free to change the IP's to suit your needs.
*/

export const NodeServer = "http://lan.node.lan"
export const NodePort = "4242"
export const MongoServer = "http://lan.mongodb.lan"
export const MongoPort = "27017"

