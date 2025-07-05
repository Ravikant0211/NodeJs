// process.env.UV_THREADPOOL_SIZE = 4; // Default value of this is 4.

import http from 'http';
import bcrypt from 'bcrypt';

// Default = 3150 req/sec (UV_THREADPOOL_SIZE=4)
// UV_THREADPOOL_SIZE=1 | 890 req/sec
// UV_THREADPOOL_SIZE=2 | 1650 req/sec
// UV_THREADPOOL_SIZE=3 | 2450 req/sec
// UV_THREADPOOL_SIZE=4 | 3150 req/sec

// UV_THREADPOOL_SIZE=8 | 4250 req/sec
// UV_THREADPOOL_SIZE=12 | 4350 req/sec

http.createServer((req, res) => {
    bcrypt.hash('Thread pooling', 2).then((hash) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(hash);
        res.end();
    })
}).listen(3000);

// curl localhost:3000  
// ab -n 1000 -c 100 "http://localhost:3000/" | grep "Requests"

// The UV_THREADPOOL_SIZE is an environment variable used to configure the size of the thread pool in libuv, 
// which is a multi-platform support library for asynchronous I/O. By default, the thread pool size is set to 4 threads, 
// but this can be adjusted by setting the UV_THREADPOOL_SIZE environment variable to a value between 1 and 1024

// NOTE: The thread pool size should not be greater than the number of logical cores.

// To set the UV_THREADPOOL_SIZE, you can do so before starting the Node.js process. For example, on Unix-based systems, 
// you can use the following command:

// export UV_THREADPOOL_SIZE=10
// node your-app.js