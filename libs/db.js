var MongoClient = require('mongodb').MongoClient;
var deferred = require('deferred');

var url = 'mongodb://localhost:27017/webIdea';
var initializedDef = deferred();
var initializedPromise = initializedDef.promise;

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	initializedDef.resolve(db);
});

exports.getAll = function (callback) {
	find({}, callback)
};

exports.getByName = function (name, callback) {
	find({'name':name}, callback)
};

var find = function(request, callback) {
	initializedPromise.then(function(db) {
		// Get the documents collection
		var collection = db.collection('pages');
		// Find some documents
		collection.find(request).toArray(function(err, docs) {
			callback(docs);
		});
	});
};
