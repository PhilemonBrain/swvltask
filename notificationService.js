const { SMS_SERVICE, NOTIFICATION_TYPE, DEVICE_TYPE } = require("./constants");
const { queuePlivioSMS, queueTwilioSMS } = require("./queues/sms");
const { myAndroidQueue, myIosPNQueue } = require("./queues/push");


// this function prepares the payload and adds it to the apropriate queue
const preparePayload = (payload) => {
    try {
        let {message, users} = payload;      
        return users.map( user => {
            message = user.language === null || "" ? message : "a translated message";
            //call a transalation API
            // message = googletranslate(messsage)
            return {...user, message }});
    } catch (error) {
        console.error(error);
    }
}


module.exports.sendSMS = (payload) => async (req, res) => {
    const payload = req.body;
    try {
        if(payload.type === NOTIFICATION_TYPE.SMS){
            if(payload.smsService == SMS_SERVICE.PLIVIO){
                const preparedPayload = preparePayload(payload);
                queuePlivioSMS(preparedPayload);
                return res.status(200).json({ status: "QUEUING FOR PLIVIO"});
            }
            else if (payload.smsService == SMS_SERVICE.TWILIO){
                const preparedPayload = preparePayload(payload);
                queueTwilioSMS(preparedPayload);
                return res.status(200).json({ status: "QUEUING FOR TWILIO"});
            }else{
                return res.status(500).json({ status: "INVALID SMS SERVICE TYPE"});
            }
        } else{
            return res.status(500).json({ status: "INVALID NOTIFICATION TYPE"});
        }
    } catch (error) {
        console.error(error);
    }

}


module.exports.sendPushNotification = (payload) => (req, res) => {
    const payload = req.body;
    try {
        if( payload.type === NOTIFICATION_TYPE.PUSH ){
            preparePayload(payload)
                .forEach(user => {
                    if (user.device === DEVICE_TYPE.IPHONE){
                        // call the queue produce
                        myIosPNQueue.add("ios_push", user);
                    }
                    else if(user.device === DEVICE_TYPE.ANDROID) {
                        myAndroidQueue.add("android_push",user);
                    } else{
                        return res.status(500).json({ status: "INVALID DEVICE TYPE"});
                    }
                });
                return res.status(200).json({ status: "QUEUING FOR  Android/IOS PUSH NOTIFICATIONS "});
        } else {
            return res.status(500).json({ status: "INVALID NOTIFICATION TYPE"});
        }
    } catch (error) {
        console.error(error);
    }
}
