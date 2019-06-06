/**
 * Created by f on 2019/6/5.
 */

// const multithreading = require('../../commons/multithreading');
// const Worker = require('worker_threads');
//
// const { Worker, isMainThread, parentPort, workerData} = require('worker_threads');
// if (isMainThread) {
//     module.exports = async function parseJSAsync(script) {
//         return new Promise((resolve, reject) => {
//             const worker = new Worker(__filename, {
//                 workerData: script
//             });
//             worker.on('message', resolve);
//             worker.on('error', reject);
//             worker.on('exit', (code) => {
//                 if (code !== 0)
//                     reject(new Error(`Worker stopped with exit code ${code}`));
//             });
//         });
//     };
// } else {
//     // const { parse } = require('some-js-parsing-library');
//     const script = workerData;
//     parentPort.postMessage(parse(script));
// }
/*

module.exports = app => {
    let worker = new Worker(function(){
        postMessage("I'm working before postMessage('ali').");
        this.onmessage = function(event) {
            postMessage('Hi ' + event.data);
            self.close();
        };
    });
    worker.onmessage = function(event) {
        console.log("Worker said : " + event.data);
    };
    worker.postMessage('ali');

    // console.log(multithreading);
    // let work = new Worker(multithreading)
    // work.onmessage = (event) => {
    //     console.log(event.data);
    // }
    // work.postMessage(10);
    // console.log('multithreading');
}
*/

const cluster = require('cluster')
const numCPUs = require('os').cpus().length;
function fibonacci(n) {
    return n < 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}
module.exports = app => {}
//     console.log(numCPUs);
//     if (cluster.isMaster) {
//         const seqArr = [44, 42]
//         let endTaskNum = 0
//
//         console.time('main')
//         console.log(`[Master]# Master starts running. pid: ${process.pid}`)
//
//         for (let i = 0; i < 2; i++) {
//             const worker = cluster.fork()
//             worker.send(seqArr[i])
//         }
//         cluster.on('message', (worker, message, handle) => {
//             console.log(`[Master]# Worker ${worker.id}: ${message}`)
//             endTaskNum++
//             if (endTaskNum === 4) {
//                 console.timeEnd('main')
//                 cluster.disconnect()
//             }
//         })
//         cluster.on('exit', (worker, code, signal) => console.log(`[Master]# Worker ${worker.id} died.`))
//     } else {
//         process.on('message', seq => {
//             console.log(`[Worker]# starts calculating...`)
//             const start = Date.now()
//             const result = fibonacci(seq)
//             console.log(`[Worker]# The result of task ${process.pid} is ${result}, taking ${Date.now() - start} ms.`)
//             process.send('My task has ended.')
//         })
//     }
//
// }