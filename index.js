const express = require("express");
const cors =  require("cors");
const { messageValidation } = require("./validator")
const { sendSMS, sendPushNotification } = require("./notificationService");


module.exports.createServer = () => {
	const app = express()
	app.use(express.json())
    app.use(cors())

	app.get('/', function (req, res) {
		res.json({status: true})
	});

	const v1Route = new express.Router();
	app.use('/api/v1', v1Route);

	v1Route.post(
		'/send-sms', 
		[messageValidation()],
		sendSMS()
	)

	v1Route.post(
		'/send-push', 
		[messageValidation()],
		sendPushNotification()
	)

	return { app, v1Route }
}