(function (exports, require, module, __dirname, __filename) {
    const name = 'Ravi kant';
    console.log(name);
    console.log(__dirname);
    console.log(__filename);
})();

// In node, every module/file is wrapped around a wrapper function, which takes 'exports', 'require', 'module', '__dirname', and '__filename'
// as parameters. And these parameters are not global scoped, rather they are module scopped.
// This is the reason we are able to use the above parameters in every javascript file.