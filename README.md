## Fallback Swig Loader

A template loader for [SWIG](http://paularmstrong.github.io/swig/docs) that uses a list of
folders and falls down the chain of them until a file is found.

Usage:

	var fallbackswigloader = require("../fallbackswigloader");
	swig.setDefaults({ loader: fallbackswigloader([
		path.join(__dirname, "dir1"),
		path.join(__dirname, "dir2"),
		path.join(__dirname, "dir3")
	])});

With `path` being the built-in [path](http://nodejs.org/api/path.html#path_path_join_path1_path2) moudle.

That's it really.

I might write tests someday