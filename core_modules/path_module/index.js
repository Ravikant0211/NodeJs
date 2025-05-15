const path = require('path');

// Return the directory name of a path. Similar to the Unix dirname command.
console.log(path.dirname('/Users/ravi/Documents/personalworkspace/NodeJs/core_modules/path_module/index.js'));
// /Users/ravi/Documents/personalworkspace/NodeJs/core_modules/path_module

// Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in
//  the last portion of the path or the first character of it is '.', then it returns an empty string. 
console.log(path.extname('/Users/ravi/Documents/personalworkspace/NodeJs/core_modules/path_module/index.js')); // .js

// Return the last portion of a path. Similar to the Unix basename command. Often used to extract the file name 
// from a fully qualified path.
console.log(path.basename('/Users/ravi/Documents/personalworkspace/NodeJs/core_modules/path_module/index.js')); // index.js

// Returns an object from a path string - the opposite of format()
console.log(path.parse('/Users/ravi/Documents/personalworkspace/NodeJs/core_modules/path_module/index.js'));
// {
//   root: '/',
//   dir: '/Users/ravi/Documents/personalworkspace/NodeJs/core_modules/path_module',
//   base: 'index.js',
//   ext: '.js',
//   name: 'index'
// }