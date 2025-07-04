// Problem Statement:
// 1. Divide a large task into smaller chunks
// 2. Process those chunks in parallel using multiple worker threads
// 3. Collect and combine the results in main thread.

// Real World Analogy
// - Imagine you have a list of 100000 numbers, and you want to find their sum.
// - Doing it in the main thread blocks everything.
// - But what if you split it into 4 parts and let 4 workers compute partial sums in parellel?
// - And then let the Main thread just add those 4 partial sums.

import { Worker } from 'worker_threads';
import { performance } from 'perf_hooks';

const numbers = Array.from({ length: 10000 }, (_, i) => i + 1); // 1 to 1000

const chunkSize = 2000;
const chunks = [];

for (let i = 0; i < numbers.length; i += chunkSize) {
    chunks.push(numbers.slice(i, i + chunkSize));
}

// console.log('path: ', new URL('./worker.js', import.meta.url));

const result = [];
let count = 0;
const startTime = performance.now();

for (let i = 0; i < chunks.length; i++) {
    const worker = new Worker(new URL('./worker.js', import.meta.url), { workerData: { numbers: chunks[i], index: i }});

    worker.on('message', (data) => {
        const { index, sum, duration } = data
        result.push(sum);

        console.log(`✅ Worker ${index} finished in ${duration.toFixed(2)} ms with sum = ${sum}`);

        if (++count === chunks.length) {
            const totalSum = result.reduce((total, curr) => total + curr, 0);
            const totalTime = performance.now() - startTime;
            console.log(`\n🎉 Final total sum: ${totalSum}`); // 🎉 Final total sum: 50005000
            console.log(`⏱️ Total time taken: ${totalTime.toFixed(2)} ms`); // ⏱️ Total time taken: 173.18 ms
        }
    });

    worker.on('error', (err) => console.log(err));

    worker.on('exit', (code) => {
        if (code != 0) console.log(`worker existed with code $${code}`);
    });
}


// OUTPUT-
// 🎉 Final total sum: 50005000
// ⏱️ Total time taken: 173.18 ms

// 🧠 Why is a simple loop faster than multithreading in this case?
// Because of: Overhead.

// 🔄 What happens when you use worker threads?

// 1. Main thread splits the array into chunks.
// 2. Spawns N worker threads.
// 3. Serializes and sends data (the chunks) to each thread.
// 4. Each thread:
//      - Initializes its own V8 instance and thread context.
//      - Receives the data, deserializes it.
//      - Computes the sum.
//      - Sends back the result.
// 5. Main thread collects the results and merges them.

// 📉 Why it's slower for small or medium tasks
// 1. 🧳 Data transfer (serialize/deserialize): Takes time, especially with large arrays
// 2. 🔁 Thread creation: Worker threads are heavy compared to simple loops
// 3. 🔗 IPC (inter-process communication): Messages between threads cost CPU
// 4. ⚙️ V8 boot per thread: Each worker has its own environment
// 5. ❌ No real parallelism on single-core: Threads may be time-sliced rather than parallel

// 📌 So When Should You Use Multithreading?
// 1. 🧮 CPU-bound tasks that block the event loop:   Keeps the main thread responsive
// 2. 🖼️ Image / video / media processing:	  Takes real CPU time per file
// 3. 🔐 Cryptographic operations:   Can be offloaded in parallel
// 4. 📚 Multiple independent tasks:	True parallelism possible
// 5. 📈 Long-running or async-heavy computation:	Offloading avoids main thread starvation