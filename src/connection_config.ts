/*
This config file is referenced by every angular based file that asks for
an IP, in my use case I have a BIND 9(DNS) server running with

phpminor.duckdns.org set to redirect to a lan IP address in my network, but external
users should get my public IP from it. Meaning both me, the localhost(and any other
users in my LAN) can use it with the same user experience as an outside user

lan.mongodb.lan set to redirect to the machine hosting mongoDB on the LAN

Using DNS records here means I can change these without ever restarting the app
Your use case may vary, so feel free to change the IP's to suit your needs.
*/

//used in post.service.ts and auth.service.ts
export const NodeServer = "phpminor.duckdns.org"
export const NodePort = "28902"
export const reqprotocol = "http"
