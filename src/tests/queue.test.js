import { expect } from 'chai';
import sinon, { stub } from 'sinon';
import Queue from '../models/Queue.js'

describe('Queue',() => {
  describe('#enqueueTask', () => {
    it('Should enqueue tasks in taskQueue', () => {
      const queue = new Queue
      queue.enqueueTask(() => { console.log('Doing task 1') })
  
      expect(queue.taskQueue).to.have.lengthOf(1)
    })
  })
  describe('#runTask', () => {
    it('Should run tasks in taskQueue', async () => {
      const queue = new Queue
      const pushSpy = sinon.spy(queue.taskQueue, 'push')
      const shiftSpy = sinon.spy(queue.taskQueue, 'shift')

      queue.enqueueTask(() => { console.log('Doing task 1') })
      expect(pushSpy.calledOnce)
      queue.runTask(() => { console.log('Doing task 2') })
      expect(shiftSpy.getCall(1).calledWithExactly(() => { console.log('Doing task 2') })).toBe(true);
      // expect(shiftSpy.getCall(0).calledWithExactly(() => { console.log('Doing task 2') })).toBe(true)
      queue.runTask(() => { console.log('Doing task 3') })
      expect(shiftSpy.calledTwice)
      queue.runTask(() => { console.log('Doing task 4') })
      expect(shiftSpy.calledOnce)

      await queue.promiseQueue // need to wait for queue to finish
      expect(queue.taskQueue).to.have.lengthOf(0)
    })
  })

  // describe('#push', () => {
  //   it('Should run the task if the running tasks is less than the concurrency')
  // })
})