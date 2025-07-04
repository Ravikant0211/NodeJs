import { performance } from 'perf_hooks';

const numbers = Array.from({ length: 10000 }, (_, i) => i + 1); // 1 to 1000

let sum = 0;

const startTime = performance.now();

for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}

const totalTime = performance.now() - startTime;
console.log(`🎉 Final total sum: ${sum}`);
console.log(`⏱️ Total time taken: ${totalTime.toFixed(2)} ms`);

// OUTPUT-
// 🎉 Final total sum: 50005000
// ⏱️ Total time taken: 0.21 ms