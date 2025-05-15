const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("sayHi", () => {
    console.log("Hi, This is Ravi kant");
});

eventEmitter.on("sayHi", (statusCode, message) => {
    console.log(`status code is ${statusCode} and the page is ${message}`);
    console.log("I am a software engineer");
});

eventEmitter.emit('sayHi', 200, "ok");
