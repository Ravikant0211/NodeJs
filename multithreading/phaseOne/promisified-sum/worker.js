import { workerData, parentPort } from 'worker_threads';
import { performance } from 'perf_hooks';

const { numbers } = workerData;

// Simulate heavy computation with artificial delay
const delay = Math.random() * 100 + 50; // 50-100 ms

const startTime = performance.now();

setTimeout(() => {
    const sum = numbers.reduce((total, curr) => total + curr, 0);
    const duration = performance.now() - startTime;
    parentPort.postMessage({
        sum,
        duration
    })
}, delay);