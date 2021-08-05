I really hope the person analyzing this task sees it for the good it is. However it come with one flaw, i just cant connect my server with
the redis image. This could be either because it's mt first time working with redis, my OS (windows) which is treaky when it comes to redis
and docker, or because i decided to use redis last minute and i haven't figured out best practices for it yet.

So i commented out the service that run my server on the docker-compose file. This means that for you to run the program you might just need to run the redis and the redis-commander(UI tool for redis) using 'docker-compose up' and then manually cd the root folder and run 'yarn start'. Sorry for the stress. 


Few higlights:
1. I used Joi validator to validate all entries comming to both endpoints.
2. I wrote the tests with jest and supertest.
3. I used 'bull' as a queuing service that handles the limit of trnsactions per/minute (constants file)


Simple Diagram
Please locate the file 'simple_api_diagram.png'


3. How to run it.
    i. Open your terminal and run 'docker-compose up' (then cd into root and run 'yarn start')
    ii. Open your browser and navigate to localhost:4000. You'll response like this

    {
        message: "You are successfully running a Notification API"
    }

    iii. Query the 'localhost:4001/sendnotifications' endpoint with this sample payload: 

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
                    "language": "fr",
                    "device":"android",
                    "deviceId": "7873847333"
                }
            ],
            "smsService"  missing prop will pass
        }
    iv. if query is succesful you can navigate to localhost:8081 to view the queued notifications and status from the various Queues.

    keys description
    - type: the type of notification service, push or sms
    - message: The messsage to be sent to the user or group of users
    - users: An array of users
        -users.language: optional language to translate message to
        -users.device: type of device
        -users.deviceId: the deviceId/phone number to send a notification/sms
    - smsService: the type of you wish to use.

4. How another microservice would contact this service to send a notification.
Another microservice will simply visit the hosted url and pass in a sample payload. If the payload is valid, it will be queued for sending.

5. Future Improvements
- Typescript. I had in mind to use typescript but the challenges with redis put me behind schedule so i left it out.
- Feedback Mechanism. A feature that will put it place what will be done after each succesfully sent notification, retries, and prossibly memory management.
- transalation. I did leave a empty function that would run this feature just before the items are queued.
