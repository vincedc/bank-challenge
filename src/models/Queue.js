export default class Queue {

  running = 0
  taskQueue = []
  promiseQueue = Promise.resolve(true)

  constructor(concurrency = 1) {
    this.concurrency = concurrency

  }

  enqueueTask(task) {
    this.taskQueue.push(task)

    return this
  }

  runTask(task) {
    this.running++

    this.promiseQueue = this.promiseQueue.then(() => {
      return task()
    }).then(() => {
      console.log('this.taskQueue.length:', this.taskQueue.length)
      if (this.taskQueue.length > 0) return this.runTask(this.taskQueue.shift()) 
    })

    return this
  }

  push(task) {
    this.running < this.concurrency ? this.runTask(task) : this.enqueueTask(task)

    return this
  }
}