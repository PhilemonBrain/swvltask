// const { Job } = require("bull");


module.exports.iosPushProcess = async (job, done) => {
    try {
        //call the IOS push notification service
        console.log({message : "push sent to IOS"})
        done();
    } catch (error) {
        // done(new Error("Error while making push notificationt to IOS"));
    }
}


module.exports.androidPushProcess = async (job, done) => {
    try {
        //call the Android push notification service
        console.log({message : "push sent to Android"})
        done();
    } catch (error) {
        done(error);
    }
}
