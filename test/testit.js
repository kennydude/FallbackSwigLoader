// test it
var swig = require("swig"),
	path = require("path"),
	async = require("async"),
	fallbackswigloader = require("../fallbackswigloader");

swig.setDefaults({ loader: fallbackswigloader([
	path.join(__dirname, "dir1"),
	path.join(__dirname, "dir2"),
	path.join(__dirname, "dir3")
])});

var filesToTest = [
	"a.html",
	"b.html",
	"c.html",
	"no.html"
];

async.each(filesToTest, function(file, n){

	console.log("Testing " + file);

	try{
		var o = swig.renderFile(file, {});
		console.log("S>>> ",o);
	} catch(e){
		console.log("S could not load");
	}

	swig.renderFile(file, {}, function(err, o){
		if(err){
			console.log("A could not load");
		}
		console.log("A>>> ", o);
		n();
	})
});