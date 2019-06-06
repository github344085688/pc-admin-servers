const cluster = require('cluster')
function fibonacci(n) {
    return n === 0
        ? 0
        : n === 1
            ? 1
            : fibonacci(n - 1) + fibonacci(n - 2)
}

module.exports = app => {
    router.post('/aa/lser', async (ctx, next) => {
        console.log(process);
        // if (cluster.isMaster) {
            // cluster.fork({workerId: 'c'})
            // worker.send(40)
            // cluster.on('message', (worker, message, handle) => {
            //     console.log(`[Master]# Worker ${worker.id}: ${message}`)
            //     cluster.disconnect()
            // })
            // cluster.on('exit', (worker, code, signal) => console.log(`[Master]# Worker ${worker.id} died.`))
        // } else {
         /* app.process.on('message', seq => {
                console.log(`[Worker]# starts calculating...`)
                const start = Date.now()
                const result = fibonacci(seq)
                console.log(`[Worker]# The result of task ${process.pid} is ${result}, taking ${Date.now() - start} ms.`)
              // app.process.send('My task has ended.')
            })*/
        // }

       ctx.body =process;
    });
};


// cluster对象 cluster的各种属性和函数
// cluster.setttings:配置集群参数对象
// cluster.isMaster:判断是不是master节点
// cluster.isWorker:判断是不是worker节点
// Event: 'fork': 监听创建worker进程事件
// Event: 'online': 监听worker创建成功事件
// Event: 'listening': 监听worker向master状态事件
// Event: 'disconnect': 监听worker断线事件
// Event: 'exit': 监听worker退出事件
// Event: 'setup': 监听setupMaster事件
// cluster.setupMaster([settings]): 设置集群参数
// cluster.fork([env]): 创建worker进程
// cluster.disconnect([callback]): 关闭worket进程
// cluster.worker: 获得当前的worker对象
// cluster.workers: 获得集群中所有存活的worker对象
// worker对象 worker的各种属性和函数：可以通过cluster.workers, cluster.worket获得。
// worker.id: 进程ID号
// worker.process: ChildProcess对象
// worker.suicide: 在disconnect()后，判断worker是否自杀
// worker.send(message, [sendHandle]): master给worker发送消息。注：worker给发master发送消息要用process.send(message)
// worker.kill([signal='SIGTERM']): 杀死指定的worker，别名destory()
// worker.disconnect(): 断开worker连接，让worker自杀
// Event: 'message': 监听master和worker的message事件
// Event: 'online': 监听指定的worker创建成功事件
// Event: 'listening': 监听master向worker状态事件
// Event: 'disconnect': 监听worker断线事件
// Event: 'exit': 监听worker退出事件