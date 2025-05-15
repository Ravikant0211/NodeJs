const os = require("os");

console.log(os.arch()); // arm64

console.log(`${os.totalmem() / 1024 / 1024 / 1024} GB`); // 8 GB

console.log(`${os.freemem()/1024/1024/1024} GB`); // 0.138702392578125 GB

console.log(os.hostname()); // Apples-MacBook-Air.local

console.log(os.platform()); // darwin

console.log(os.cpus());

console.log(os.type()); // Darwin

console.log(os.tmpdir());