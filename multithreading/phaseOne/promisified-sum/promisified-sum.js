import { Worker } from 'worker_threads';
import { performance } from 'perf_hooks';

const numbers = Array.from({ length: 10000 }, (_, i) => i + 1); // 1 to 1000

const chunkSize = 2000;
const chunks = [];

for (let i = 0; i < numbers.length; i += chunkSize) {
    chunks.push(numbers.slice(i, i + chunkSize));
}

async function runWorker(data, index) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./worker.js', import.meta.url), {
            workerData: {
                numbers: data,
            }
        });

        // Prevents hung threads from blocking forever
        const timeout = setTimeout(() => {
            worker.terminate();
            reject(new Error(`worker ${index} timed out`));
        }, 5000);
    
        worker.on('message', (data) => {
            const { sum, duration } = data;
            console.log(`✅ Worker ${index + 1} finished in ${duration.toFixed(2)} ms with sum = ${sum}`);
            clearTimeout(timeout);
            resolve(sum);
        })

        worker.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        })

        worker.on('exit', (code) => {
            if (code !== 0) {
                clearTimeout(timeout);
                reject(new Error(`worker ${index} exited with code ${code}`));
            }
        })
    })
}

async function main() {
    try {
        const startTime = performance.now();
        const promises$ = chunks.map((chunk, idx) => runWorker(chunk, idx));
        const results = await Promise.all(promises$);
        const totalSum = results.reduce((total, curr) => total + curr, 0);
        const totalTime = performance.now() - startTime;
        console.log(`\n🎉 Final total sum: ${totalSum}`); // 🎉 Final total sum: 50005000
        console.log(`⏱️ Total time taken: ${totalTime.toFixed(2)} ms`); // ⏱️ Total time taken: 173.18 ms
    } catch (err) {
        console.error('Failed to complete all workers:', err.message);
    }
}

main();

// OUTPUT-
// ✅ Worker 1 finished in 59.28 ms with sum = 2001000
// ✅ Worker 2 finished in 71.40 ms with sum = 6001000
// ✅ Worker 4 finished in 85.28 ms with sum = 14001000
// ✅ Worker 3 finished in 94.24 ms with sum = 10001000
// ✅ Worker 5 finished in 109.26 ms with sum = 18001000

// 🎉 Final total sum: 50005000
// ⏱️ Total time taken: 146.34 ms