const fs = require('fs');

// crate directory
fs.mkdirSync("test");

// create bio.txt, and write data into it
fs.writeFileSync('test/bio.txt', "My name is Ravi kant.");

// append some data inside bio.txt file
fs.appendFileSync('test/bio.txt', " I am a software engineer.");

// If no encoding is defined, then raw buffer is returned
const org_data = fs.readFileSync('test/bio.txt', 'utf8');
console.log(org_data) // My name is Ravi kant. I am a software engineer.

fs.renameSync('test/bio.txt', 'test/myBio.txt');

// delete file
fs.unlinkSync('test/myBio.txt');

// delete directory
fs.rmdirSync('test');