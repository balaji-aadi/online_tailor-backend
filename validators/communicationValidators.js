const Joi = require('joi');

exports.validateSubscription = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.object({
      endpoint: Joi.string().uri().required(),
      keys: Joi.object({
        p256dh: Joi.string().required(),
        auth: Joi.string().required(),
      }).required(),
    }).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateSendMessage = (req, res, next) => {
  const schema = Joi.object({
    conversationId: Joi.string().hex().length(24).required(),
    message: Joi.string().max(2000).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
