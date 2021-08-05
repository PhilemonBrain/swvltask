const supertest = require("supertest");
const request = require("supertest");
const { createServer } = require("../index");

const { app } = createServer();

const invalidPayload = {
    "type": "this is not a valid type", // invalid action type
    "message": "Your drop off station is here",
    "users": [
        {
            "language": "fr",
            "device": "ios",              
            "deviceId": "787384" //invalid deviceId
        },
        {
            "device":"android-iphone", //no such device type
            "deviceId": "invalid DeviceId" //invalid
        }
    ],
    "smsService": "twilios-webb"  //invalid service type
}

const requiredPayload = {
    // "type" prop missing
    // "message" prop //missing
    "users": [
        {
            "language": "fr",
            "device": "ios",
            // "deviceId"   missing
        },
        {
            "device":"android",
            "deviceId": "7873000003" //invalid deviceId
        }
    ],
    "smsService": "twilio"
}


const validPayload = {
    "type": "sms",
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
    "smsService": "twilio"
}

test(`POST /sendnotification required-payload`, async () => {
    await supertest(app)
        .post("/api/v1/sendnotification")
        .send(requiredPayload)
        .expect(400)
        .then((response) => {
            expect(response.body.error).toBeTruthy();
            expect(response.body.error.type).toBeTruthy();
            expect(response.body.error.message).toBeTruthy();
            expect(response.body.error.deviceId).toBeTruthy();
        })
        .catch(err => console.log(err));
})


test(`POST /sendnotification invalid-payload`, async () => {
    await supertest(app)
        .post("/api/v1/sendnotification")
        .send(invalidPayload)
        .expect(400)
        .then((response) => {
            expect(response.body.error).toBeTruthy();
            expect(response.body.error.type).toBeTruthy();
            expect(response.body.error.deviceId).toBeTruthy();
            expect(response.body.error.device).toBeTruthy();
            expect(response.body.error.users).toBeTruthy();

        })
        .catch(err => console.log(err));
})

test('POST /sendnotification valid-payload', async () => {
    await supertest(app)
        .post("/api/v1/sendnotification")
        .send(validPayload)
        .expect(200)
        .then((response) => {
            expect(response.body.data.length).toEqual(validPayload.users.length);
            expect(response.body.error).toBeFalsy();
            expect(Array.isArray(response.body.data));
        })
        .catch(err => console.log(err));
})



