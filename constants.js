module.exports.NOTIFICATION_TYPE = {
    SMS: "sms",
    PUSH: "push"
}
module.exports.DEVICE_TYPE = {
    ANDROID: 'android',
    IPHONE: 'ios'
}

module.exports.MAX_REQUEST = {
    MESSAGES: 50,
    DURATION: 60000
}
module.exports.SMS_SERVICE = {
    TWILIO: "twilio",
    PLIVIO: "plivio"
}
module.exports.PHONE_NUMBER_REGEX = /^\d{10}$/;