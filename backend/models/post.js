const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);

// wGQqB5Uf4igHGvE
/* mongodb://
post-bot
:
wGQqB5Uf4igHGvE
@
localhost
:
27017
/?authSource=post-handler&readPreference=primary&appname=nodejsposthandler=ssl=false

"mongodb://"
+ MongoPostUser
+ ":"
+ MongoPostPass
+ "@"
+ MongoServer
+ MongoPort
+ MongoArgs

"mongodb://" + MongoPostUser + ":" + MongoPostPass + "@" + MongoServer + MongoPort + MongoArgs


*/
