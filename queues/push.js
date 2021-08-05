const Bull = require("bull")
const {iosPushProcess, androidPushProcess} = require("../processes/push");
const { MAX_REQUEST } = require("../constants")


const myIosPNQueue = new Bull( 'ios_push_queue', {
    limiter: {
        max: MAX_REQUEST.MESSAGES,
        duration: MAX_REQUEST.DURATION
    }
});

const myAndroidQueue = new Bull( 'android_push_queue', {
    limiter: {
        max: MAX_REQUEST.MESSAGES,
        duration: MAX_REQUEST.DURATION
    }
});



// module.exports.queueIosPN = async (payload) =>{
//     await myIosPNQueue.add("ios_push", payload);
// }

// module.exports.queueAndroidPN = async (payload) =>{
//     await myAndroidQueue.add("android_push", payload);
// }

myIosPNQueue.process("ios_push", iosPushProcess);
myAndroidQueue.process("android_push", androidPushProcess);

module.exports = {
    myIosPNQueue,
    myAndroidQueue
}