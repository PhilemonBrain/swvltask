// const { Job } = require("bull");


module.exports.plivioSMSProcess = async (job, done) => {
    try {
        //job.data contains the actual data to be used by the sms service
        //call the Plivio SMS service with the payload
        //cosnt responseFromPlivio = await Plivio.createSms(payload)
        console.log({message : "sent with Plivio"})
        done();
    } catch (error) {
        done(error);
    }
}


module.exports.twilioSMSProcess = async (job, done) => {
    try {
        //job.data contains the actual data to be used by the sms service
        //call the Twilio SMS service with the payload
        //cosnt responseFromPlivio = await Plivio.createSms(payload)
        console.log({message : "sent with Twilio"});
        done();
    } catch (error) {
        done(error);
    }
}