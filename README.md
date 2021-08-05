



How to run it.
1. Open your terminal and run 'docker-compose up'
2. Open your browser and navigate to localhost:4001. You'll response like this

{
    message: "You are successfully running a Notification API"
}

3. Query the 'localhost:4001/sendnotifications' endpoint with this sample payload: 

payload = {
    "type": "push",
    "message": "Your drop off station is here",
    "users": [
        {
            "language": "fr",
            "device": "ios",
            "deviceId": "7873847333"
        },
        {
            "device":"android",
            "deviceId": "7873847333"
        }
    ],
    "smsService"  missing prop will pass
}

keys description
- type: the type of notification service, push or sms
- message: The messsage to be sent to the user or group of users
- users: An array of users
    -users.language: optional language to translate message to
    -users.device: type of device
    -users.deviceId: the deviceId/phone number to send a notification/sms

