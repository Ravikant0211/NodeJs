const {Transform} = require('stream');

const uppercaseWordProcessing = new Transform({
    transform: function(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

module.exports = uppercaseWordProcessing;