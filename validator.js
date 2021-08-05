const Joi = require('joi');
const { MAX_REQUEST, DEVICE_TYPE, NOTIFICATION_TYPE, SMS_SERVICE, PHONE_NUMBER_REGEX } = require("./constants");


const deviceValues = Object.values(DEVICE_TYPE);
const notificationTypeValues = Object.values(NOTIFICATION_TYPE);
const smsServiceValus = Object.values(SMS_SERVICE);

const schema = Joi.object({
    type: Joi.string().required().valid(...notificationTypeValues),
    message: Joi.string().required(),
    users: Joi.array().items(
      Joi.object({
        language: Joi.string().allow('').allow(null),
        device: Joi.string().valid(...deviceValues).required(),
        deviceId: Joi.string().required().regex(PHONE_NUMBER_REGEX),  //deviceId or phonenumber
      }).required()
    ).min(1).max(MAX_REQUEST.MESSAGES),
    smsService: Joi.when('type', {
      is: NOTIFICATION_TYPE.SMS,
      then: Joi.string().valid(...smsServiceValus).required(),
      otherwise: Joi.string().allow('').allow(null)
    }),
}).options({abortEarly: false});


module.exports.messageValidation = () => (req, res, next) => {
  const {error} = schema.validate(req.body);
  if (error) {
    if (error instanceof Joi.ValidationError) {
        const details = error.details || [];
        const formatted = {};
        details.forEach(({context, message}) => {
            formatted[context.key] = [message];
        });
        res.status(400).json({error: formatted});
    }
    return res.status(400).json({error})
  }
  next();
};
