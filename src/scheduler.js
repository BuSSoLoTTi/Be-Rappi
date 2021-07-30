module.exports = class Scheduler {

    constructor(callback) {
        this.callback = callback
    }

    pendingTasks = new Set();
    add(promise) {
        this.pendingTasks.add(promise);

        promise.then(() => {
            this.pendingTasks.delete(promise);
            this.onTaskFinish(); // dispatch "event" when a task is resolved
            if ( this.pendingTasks.size === 0) this.onAllFinish(); // dispatch "event" when ALL pending tasks are resolved
        });
    }
    onTaskFinish() {
        console.log('Task resolved!');
    }
    onAllFinish() {
        console.log('All done!');
        this.callback()
    }
}