var fs = require("fs"),
	async = require("async"),
	path = require("path");

module.exports = function(locations, encoding){
	encoding = encoding || 'utf8';

	return {
		resolve : function(to, from){
			return to;
		},
		loadSync : function(identifier){
			for (var i = 0; i < locations.length; i++) {
				var filename = path.join(locations[i], identifier);
				if(fs.existsSync(filename)){
					return fs.readFileSync(filename, encoding);
				}
			}
			throw new Error("File could not be found");
		},
		loadAsync : function(identifier, cb){
			async.each(locations, function(location, n){
				var filename = path.join(location, identifier);
				fs.exists(filename, function(exists){
					if(exists){
						return fs.readFile(identifier, encoding, cb);
					}
					n();
				});
			}, function(){
				cb(new Error("File could not be found"));
			});
		},
		load : function(identifier, cb){
			if(!cb){
				return this.loadSync(identifier);
			} else{
				this.loadAsync(identifier, cb);
			}
		}
	}
}