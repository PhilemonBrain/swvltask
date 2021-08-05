const Bull = require("bull")
const {plivioSMSProcess, twilioSMSProcess} = require("../processes/sms");
const { MAX_REQUEST } = require("../constants")


const myplivioSMSQueue =  new Bull( 'plivio_sms_queue', {
    limiter: {
        max: MAX_REQUEST.MESSAGES,
        duration: MAX_REQUEST.DURATION
    }
});

const myTwilioSMSQueue =  new Bull( 'twilio_sms_queue', {
    limiter: {
        max: MAX_REQUEST.MESSAGES,
        duration: MAX_REQUEST.DURATION
    }
});


module.exports.queuePlivioSMS = (payload) => {
    payload.forEach( load => myplivioSMSQueue.add("plivio", load));
}

module.exports.queueTwilioSMS = async (payload) =>{
    payload.forEach( load => myTwilioSMSQueue.add("twilio", payload));
}



myplivioSMSQueue.process("plivio", plivioSMSProcess);
myTwilioSMSQueue.process("twilio", twilioSMSProcess);