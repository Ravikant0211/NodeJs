### <ins>Why Multithreading in Node.js?</ins> 🧠

- Node.js is **single-threaded by default**, using an event loop for asynchronous operations. But for **CPU-intensive tasks** (like image processing, video encoding, etc), the single thread can get blocked.

- To solve this, Node.js provides:
    The `worker_threads` module — allows running JavaScript code in multiple threads. ✅


### <ins>What is the worker_threads module?</ins> ✅

- The `worker_threads` module enables the use of threads that execute JavaScript in parallel. To access it:
    
    `import worker from 'node:worker_threads';`

- Workers (threads) are useful for performing CPU-intensive Javascript operations. They do not help much with I/O-intensive work.

- Unlike `child_process` or `cluster`, `worker_threads` can share memory. They do so by transferring `ArrayBuffer` instances or sharing `SharedArrayBuffer` instances.


### <ins>MessageChannel and BroadcastChannel</ins> 🔁

#### 1. MessageChannel – One-to-One Communication

Use `MessageChannel` when: 

- You want to manually connect two threads (main <-> worker, or worker <-> worker).

- You want to share a communication port explicitly.


#### 2. BroadcastChannel - One-to-Many Communication

Use `BroadcastChannel` when:

- You want multiple workers to send messages to the main thread (or each other).

- Similar to pub/sub messaging.